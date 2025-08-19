// Load environment from .env when present
require('dotenv').config();
const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const nodemailer = require("nodemailer");

const upload = multer({ dest: path.join(__dirname, "tmp") });
const app = express();

// enable CORS for local dev
const cors = require('cors');
app.use(cors());

// also add an explicit CORS header middleware and OPTIONS handler to ensure
// preflight requests always get the correct headers (some browsers are strict)
app.use(function (req, res, next) {
    // ALLOW_ORIGIN may be a single origin or a comma-separated list of origins
    const allowEnv = (process.env.ALLOW_ORIGIN || '*').split(',').map(s => s.trim());
    const origin = req.get('Origin');
    if (allowEnv.includes('*')) {
        res.header('Access-Control-Allow-Origin', '*');
    } else if (origin && allowEnv.includes(origin)) {
        res.header('Access-Control-Allow-Origin', origin);
    } else {
        // fallback to first allowed origin if request origin isn't listed
        res.header('Access-Control-Allow-Origin', allowEnv[0]);
    }
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    // allow credentials if needed
    // res.header('Access-Control-Allow-Credentials', 'true');
    if (req.method === 'OPTIONS') return res.sendStatus(204);
    next();
});

// json/body parsing (not strictly needed for multipart but ok for health checks)
app.use(express.json());

const { requestLogger, errorHandler } = require('./middleware.cjs');
app.use(requestLogger);

app.get('/health', (req, res) => res.json({ ok: true, ts: new Date().toISOString() }));

app.post("/send-agreement", upload.single("file"), async (req, res) => {
    try {
        const file = req.file;
        if (!file) return res.status(400).json({ ok: false, error: 'file is required' });
        const trackingId = req.body.trackingId || "unknown";
        // prefer explicit form email if provided, otherwise env override, then default
        const recipient = req.body.email || process.env.AGREEMENT_RECIPIENT || "tm0038763@gmail.com";

        // log useful request details for debugging
        console.log('Incoming agreement:', { trackingId, recipient, formFields: { email: req.body.email, ...req.body } });
        console.log('Uploaded file:', { originalname: file.originalname, mimetype: file.mimetype, size: file.size, path: file.path });

        // If SMTP env vars are not set, save the file to disk for manual retrieval.
        if (!process.env.SMTP_HOST) {
            const savePath = path.join(__dirname, "saved", `${trackingId}-${file.originalname}`);
            fs.mkdirSync(path.dirname(savePath), { recursive: true });
            fs.copyFileSync(file.path, savePath);
            fs.unlinkSync(file.path);
            return res.json({ ok: true, note: `Saved to ${savePath}` });
        }

        // Configure nodemailer transporter from env
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT || 587),
            secure: process.env.SMTP_SECURE === "true",
            auth: process.env.SMTP_USER
                ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
                : undefined,
        });

        // If SMTP not configured, save to disk and return path
        if (!process.env.SMTP_HOST) {
            const savePath = path.join(__dirname, "saved", `${trackingId}-${file.originalname}`);
            fs.mkdirSync(path.dirname(savePath), { recursive: true });
            fs.copyFileSync(file.path, savePath);
            fs.unlinkSync(file.path);
            console.log(`Agreement saved to ${savePath} (SMTP not configured). Recipient would be ${recipient}`);
            return res.json({ ok: true, note: `Saved to ${savePath}` });
        }

        // Verify transporter first for clearer logs
        transporter.verify((err, success) => {
            if (err) console.warn('SMTP verify failed:', err);
            else console.log('SMTP verify OK');
        });

        // Validate recipient: accept only well-formed email addresses
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        let normalizedRecipient = (recipient || '').toString().trim();
        if (!emailRegex.test(normalizedRecipient)) {
            console.warn('Invalid recipient provided by form/env:', normalizedRecipient);
            // attempt to use AGREEMENT_RECIPIENT from env as a fallback
            const envRecipient = (process.env.AGREEMENT_RECIPIENT || '').toString().trim();
            if (emailRegex.test(envRecipient)) {
                normalizedRecipient = envRecipient;
                console.log('Using AGREEMENT_RECIPIENT from env as recipient:', normalizedRecipient);
            } else {
                console.error('No valid recipient available; saving file. envRecipient:', envRecipient);
                const savePath = path.join(__dirname, "saved", `${trackingId}-${file.originalname.endsWith('.pdf') ? file.originalname : file.originalname + '.pdf'}`);
                fs.mkdirSync(path.dirname(savePath), { recursive: true });
                fs.copyFileSync(file.path, savePath);
                fs.unlinkSync(file.path);
                return res.status(500).json({ ok: false, error: 'No valid recipient configured; saved to disk', saved: savePath });
            }
        }

        try {
            // ensure attachment filename has .pdf extension
            const attachName = file.originalname.endsWith('.pdf') ? file.originalname : `${file.originalname}.pdf`;
            console.log('Sending email to:', normalizedRecipient, 'from:', process.env.SMTP_FROM || 'no-reply@example.com');
            const info = await transporter.sendMail({
                from: process.env.SMTP_FROM || 'no-reply@example.com',
                to: normalizedRecipient,
                subject: `New Agreement - ${trackingId}`,
                text: `Agreement received. Tracking ID: ${trackingId}`,
                attachments: [{ filename: attachName, path: file.path, contentType: 'application/pdf' }],
            });
            // cleanup
            fs.unlinkSync(file.path);
            console.log('Email sent:', info && info.messageId ? info.messageId : info);
            return res.json({ ok: true, messageId: info && info.messageId });
        } catch (sendErr) {
            console.error('Failed to send email, saving file locally:', sendErr);
            const savePath = path.join(__dirname, "saved", `${trackingId}-${file.originalname.endsWith('.pdf') ? file.originalname : file.originalname + '.pdf'}`);
            fs.mkdirSync(path.dirname(savePath), { recursive: true });
            fs.copyFileSync(file.path, savePath);
            fs.unlinkSync(file.path);
            return res.status(500).json({ ok: false, error: 'Failed to send email; saved to disk', saved: savePath, detail: String(sendErr) });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ ok: false, error: String(err) });
    }
});

// error handler - last middleware
app.use(errorHandler);

const port = process.env.PORT || 4000;

// small startup diagnostics to help identify why emails may not be sent
const smtpConfigured = Boolean(process.env.SMTP_HOST);
console.log(`Agreement server config: SMTP configured=${smtpConfigured ? 'yes' : 'no'}`);
console.log(`Agreement recipient (env AGREEMENT_RECIPIENT) = ${process.env.AGREEMENT_RECIPIENT || 'tm0038763@gmail.com'}`);
if (!smtpConfigured) {
    console.warn('SMTP not configured. Incoming agreements will be saved to backend/saved/.');
    console.warn('To enable email delivery create a .env file (see .env.example) with SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_SECURE, and SMTP_FROM.');
}

app.listen(port, () => console.log(`Agreement server listening on ${port}`));

const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const nodemailer = require("nodemailer");

const upload = multer({ dest: path.join(__dirname, "tmp") });
const app = express();

app.post("/send-agreement", upload.single("file"), async (req, res) => {
    try {
        const file = req.file;
        const trackingId = req.body.trackingId || "unknown";
        const recipient = req.body.email || process.env.AGREEMENT_RECIPIENT || "tm0038763@gmail.com";

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

        await transporter.sendMail({
            from: process.env.SMTP_FROM || 'no-reply@example.com',
            to: recipient,
            subject: `New Agreement - ${trackingId}`,
            text: `Agreement received. Tracking ID: ${trackingId}`,
            attachments: [{ filename: file.originalname, path: file.path }],
        });

        // cleanup
        fs.unlinkSync(file.path);
        res.json({ ok: true });
    } catch (err) {
        console.error(err);
        res.status(500).json({ ok: false, error: String(err) });
    }
});

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Agreement server listening on ${port}`));

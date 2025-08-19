import { useState } from "react";
import { Button } from "@/components/ui/button";
// jsPDF is optional. We dynamically import it in the submit handler so
// Vite won't fail if the dependency isn't installed. To enable full
// client-side PDF generation install it with:
//   npm install jspdf

type Services = {
    id: string;
    label: string;
    fee?: string;
    checked?: boolean;
};

type FormState = {
    // Step 1
    dispatchCompany: string;
    date: string;
    // Step 2
    carrierName: string;
    companyName?: string;
    mcNumber?: string;
    dotNumber?: string;
    phone?: string;
    services: Services[];
    totalDue?: string;
    // Step 3
    paymentMethod?: string;
    bankName?: string;
    accountNumber?: string;
    routingNumber?: string;
    signature?: string;
    printName?: string;
    contactEmail?: string;
    // meta
    step: number;
};

const defaultServices: Services[] = [
    { id: "s1", label: "90 Days / 120 Days - $435 Setup Fee (refundable after the first successful load delivery)", fee: "$435", checked: false },
    { id: "s2", label: "6 Months / 12 Months - $599 Setup Fee (refundable after the first successful load delivery)", fee: "$599", checked: false },
    { id: "s3", label: "TWIC Card Application $360 same-day processing", fee: "$360", checked: false },
    { id: "s4", label: "Trailer Rental (3 months) $500 Subject to availability", fee: "$500", checked: false },
    { id: "s5", label: "Factoring Setup $250 Same-day registration", fee: "$250", checked: false },
    { id: "s6", label: "Insurance Assistance $399 Fast-track insurance quote & setup", fee: "$399", checked: false },
];

const AgreementForm = () => {
    const [state, setState] = useState<FormState>({
        dispatchCompany: "",
        date: new Date().toISOString().slice(0, 10),
        carrierName: "",
        companyName: "",
        mcNumber: "",
        dotNumber: "",
        phone: "",
        services: defaultServices,
        totalDue: "",
        paymentMethod: "",
        bankName: "",
        accountNumber: "",
        routingNumber: "",
        signature: "",
        printName: "",
        contactEmail: "",
        step: 1,
    });

    const [submitting, setSubmitting] = useState(false);
    const [trackingId, setTrackingId] = useState<string | null>(null);

    const next = () => setState((s) => ({ ...s, step: Math.min(4, s.step + 1) }));
    const prev = () => setState((s) => ({ ...s, step: Math.max(1, s.step - 1) }));

    const update = (patch: Partial<FormState>) => setState((s) => ({ ...s, ...patch }));

    const toggleService = (id: string) => {
        update({ services: state.services.map((svc) => (svc.id === id ? { ...svc, checked: !svc.checked } : svc)) });
    };

    const calcTotal = () => {
        const total = state.services.reduce((sum, s) => (s.checked && s.fee ? sum + Number(s.fee.replace(/[^0-9.-]+/g, "")) : sum), 0);
        update({ totalDue: total ? String(total) : "" });
        return total;
    };

    const generateTrackingId = () => {
        const id = `AFL${Date.now().toString(36).toUpperCase().slice(-9)}`;
        localStorage.setItem("lastTrackingId", id);
        setTrackingId(id);
        return id;
    };

    const handleSubmit = async () => {
        setSubmitting(true);
        try {
            const id = generateTrackingId();
            calcTotal();

            // Build a simple text/pdf representation from the form
            let pdfBlob: Blob;
            try {
                const moduleName = "js" + "pdf";
                const mod = await import(/* @vite-ignore */ moduleName);
                const JS = (mod as any).jsPDF ?? (mod as any).default ?? (mod as any);
                const doc = new JS();
                doc.setFontSize(16);
                doc.text("TRUCKING SERVICE AGREEMENT", 14, 20);
                doc.setFontSize(10);
                doc.text(`Tracking ID: ${id}`, 14, 30);
                doc.text(`Date: ${state.date}`, 14, 36);
                doc.text(`Dispatch Company: ${state.dispatchCompany}`, 14, 42);
                doc.text(`Carrier Name: ${state.carrierName}`, 14, 48);
                doc.text(`Company Name: ${state.companyName}`, 14, 54);
                doc.text(`MC: ${state.mcNumber}  DOT: ${state.dotNumber}`, 14, 60);
                doc.text(`Phone: ${state.phone}`, 14, 66);
                doc.text(`Services:`, 14, 72);
                let y = 78;
                state.services.forEach((s) => {
                    if (s.checked) {
                        doc.text(`- ${s.label} ${s.fee ?? ""}`, 14, y);
                        y += 6;
                    }
                });
                doc.text(`Total Due: ${state.totalDue}`, 14, y + 6);
                doc.text(`Signature: ${state.signature || "(not provided)"}`, 14, y + 18);
                pdfBlob = doc.output("blob");
            } catch (err) {
                console.warn("jspdf not available — falling back to text blob", err);
                const lines: string[] = [];
                lines.push("TRUCKING SERVICE AGREEMENT");
                lines.push(`Tracking ID: ${id}`);
                lines.push(`Date: ${state.date}`);
                lines.push(`Dispatch Company: ${state.dispatchCompany}`);
                lines.push(`Carrier Name: ${state.carrierName}`);
                lines.push(`Company Name: ${state.companyName}`);
                lines.push(`MC: ${state.mcNumber}  DOT: ${state.dotNumber}`);
                lines.push(`Phone: ${state.phone}`);
                lines.push("Services:");
                state.services.forEach((s) => {
                    if (s.checked) lines.push(`- ${s.label} ${s.fee ?? ""}`);
                });
                lines.push(`Total Due: ${state.totalDue}`);
                lines.push(`Signature: ${state.signature || "(not provided)"}`);
                pdfBlob = new Blob([lines.join("\n")], { type: "text/plain" });
            }

            const form = new FormData();
            form.append("file", pdfBlob, `${id}-agreement.pdf`);
            form.append("trackingId", id);

            // client-side validate email before sending; only append if valid
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (state.contactEmail && emailRegex.test(state.contactEmail.trim())) {
                form.append("email", state.contactEmail.trim());
            } else {
                // do not append invalid email; server will fallback to AGREEMENT_RECIPIENT
                console.warn('Contact email invalid or empty, not sending email field to server. Using server fallback recipient.');
            }

            const resp = await fetch("http://localhost:4000/send-agreement", { method: "POST", body: form });
            const json = await resp.json().catch(() => ({ ok: false, error: 'Invalid JSON response' }));
            if (!resp.ok) {
                console.error('Server returned error when submitting agreement', json);
                // show brief alert to user; keep final step so they see tracking id
                alert(json && json.error ? `Submission failed: ${json.error}` : 'Submission failed');
            } else {
                console.log('Agreement submitted successfully', json);
            }

            setState((s) => ({ ...s, step: 5 }));
        } catch (e) {
            console.error(e);
            setState((s) => ({ ...s, step: 5 }));
        } finally {
            setSubmitting(false);
        }
    };

    const renderProgress = () => {
        // 4 form steps -> progress spans 0..4; final submitted state is step 5
        const percent = ((state.step - 1) / 4) * 100;
        return (
            <div className="mb-6">
                <div className="w-full bg-gray-200 h-3 rounded-full overflow-hidden">
                    <div className="h-3 bg-orange-400" style={{ width: `${percent}%` }} />
                </div>
            </div>
        );
    };

    return (
        <section id="agreement" className="py-12 bg-white">
            <div className="container mx-auto px-4 max-w-3xl">
                <h2 className="text-xl font-bold mb-2 text-center text-orange-600">TRUCKING SERVICE AGREEMENT</h2>
                <p className="text-sm text-center mb-4">(Dedicated Lanes, Dispatch, Trailer Rental, and Setup Services)</p>
                {renderProgress()}

                {state.step === 1 && (
                    <div>
                        <h3 className="font-semibold mb-4">Step 1:</h3>
                        <p className="mb-4">The Client should only respond to verified contacts from the Company or the following trusted dispatch partners:</p>
                        <label className="block mb-2 font-medium">Dispatch Company Name:</label>
                        <select className="w-full p-3 border rounded mb-4" value={state.dispatchCompany} onChange={(e) => update({ dispatchCompany: e.target.value })}>
                            <option value="">Select Dispatch Company</option>
                            <option>ADVANCED FREIGHT BROKERAGE LLC</option>
                            <option>Partner Dispatch 1</option>
                            <option>Partner Dispatch 2</option>
                        </select>

                        <p className="text-sm mb-4">(Hereinafter referred to as the ADVANCED FREIGHT BROKERAGE LLC)</p>
                        <div className="mb-6">
                            <div className="font-semibold">Dispatch/Service Provider Representative</div>
                            <div className="mb-2">ADVANCED FREIGHT BROKERAGE LLC</div>
                            <div className="text-sm">Date:{state.date}</div>
                        </div>

                        <div className="flex gap-4">
                            <Button variant="outline" onClick={prev} disabled>
                                Previous
                            </Button>
                            <div className="flex-1 text-right">
                                <Button onClick={next} className="bg-orange-400 text-white">Next</Button>
                            </div>
                        </div>
                    </div>
                )}

                {state.step === 2 && (
                    <div>
                        <h3 className="font-semibold mb-4">Step 2</h3>
                        <label className="block mb-2">Carrier Full Name:</label>
                        <input className="w-full p-3 border rounded mb-3" placeholder="Enter Carrier Name" value={state.carrierName} onChange={(e) => update({ carrierName: e.target.value })} />

                        <label className="block mb-2">Company Name (if applicable):</label>
                        <input className="w-full p-3 border rounded mb-3" placeholder="Enter Company Name" value={state.companyName} onChange={(e) => update({ companyName: e.target.value })} />

                        <label className="block mb-2">MC Number:</label>
                        <input className="w-full p-3 border rounded mb-3" placeholder="Enter Carrier MC" value={state.mcNumber} onChange={(e) => update({ mcNumber: e.target.value })} />

                        <label className="block mb-2">DOT Number:</label>
                        <input className="w-full p-3 border rounded mb-3" placeholder="Enter Carrier USDOT" value={state.dotNumber} onChange={(e) => update({ dotNumber: e.target.value })} />

                        <label className="block mb-2">Phone Number:</label>
                        <input className="w-full p-3 border rounded mb-3" placeholder="Enter Phone Number" value={state.phone} onChange={(e) => update({ phone: e.target.value })} />

                        <div className="mt-4 mb-2 font-semibold">Select Services With Fees:</div>
                        <div className="mb-4">
                            {state.services.map((s) => (
                                <label className="block mb-2" key={s.id}>
                                    <input type="checkbox" checked={!!s.checked} onChange={() => toggleService(s.id)} className="mr-2" />
                                    <span className="text-sm">{s.label}</span>
                                </label>
                            ))}
                        </div>

                        <label className="block mb-2">Total Due:</label>
                        <input className="w-full p-3 border rounded mb-4" placeholder="Enter Total Due" value={state.totalDue} onChange={(e) => update({ totalDue: e.target.value })} />

                        <div className="flex gap-4">
                            <Button variant="outline" onClick={prev}>Previous</Button>
                            <div className="flex-1 text-right">
                                <Button onClick={next} className="bg-orange-400 text-white">Next</Button>
                            </div>
                        </div>
                    </div>
                )}

                {state.step === 3 && (
                    <div>
                        <h3 className="font-semibold mb-4">Step 3</h3>
                        <div className="mb-3">
                            <div className="font-medium">Payment Terms</div>
                            <div className="text-sm mb-2">Payment is due prior to service activation</div>
                        </div>

                        <div className="mb-3">
                            <div className="font-medium mb-2">Select Payment Option:</div>
                            {[
                                "CASHAPP",
                                "ZELLE TRANSFER",
                                "VENMO TRANSFER",
                                "BTC",
                                "Chime",
                                "PAYPAL",
                                "APPLE PAY",
                                "Wire Transfer",
                            ].map((opt) => (
                                <label key={opt} className="block mb-1">
                                    <input type="radio" name="payopt" checked={state.paymentMethod === opt} onChange={() => update({ paymentMethod: opt })} className="mr-2" />
                                    {opt}
                                </label>
                            ))}
                        </div>

                        <div className="mb-3">
                            <label className="block mb-2">Bank Name:</label>
                            <input className="w-full p-3 border rounded mb-3" placeholder="Enter Your Bank Name" value={state.bankName} onChange={(e) => update({ bankName: e.target.value })} />

                            <label className="block mb-2">Account Number:</label>
                            <input className="w-full p-3 border rounded mb-3" placeholder="Enter Your Account Number" value={state.accountNumber} onChange={(e) => update({ accountNumber: e.target.value })} />

                            <label className="block mb-2">Routing Number:</label>
                            <input className="w-full p-3 border rounded mb-3" placeholder="Enter Your Routing Number" value={state.routingNumber} onChange={(e) => update({ routingNumber: e.target.value })} />
                        </div>

                        <div className="flex gap-4">
                            <Button variant="outline" onClick={prev}>Previous</Button>
                            <div className="flex-1 text-right">
                                <Button onClick={next} className="bg-orange-400 text-white">Next</Button>
                            </div>
                        </div>
                    </div>
                )}

                {state.step === 4 && (
                    <div>
                        <h3 className="font-semibold mb-4">Step 4: Final Submission</h3>

                        <label className="block mb-2">Signature:</label>
                        <input className="w-full p-3 border rounded mb-3" placeholder="Enter Signature" value={state.signature} onChange={(e) => update({ signature: e.target.value })} />

                        <label className="block mb-2">Print Name:</label>
                        <input className="w-full p-3 border rounded mb-3" placeholder="Enter Print Name" value={state.printName} onChange={(e) => update({ printName: e.target.value })} />

                        <label className="block mb-2">Date:</label>
                        <input type="date" className="w-full p-3 border rounded mb-3" value={state.date} onChange={(e) => update({ date: e.target.value })} />

                        <label className="block mb-2">Your Email:</label>
                        <input className="w-full p-3 border rounded mb-3" placeholder="Enter Your Email" value={state.contactEmail} onChange={(e) => update({ contactEmail: e.target.value })} />

                        <div className="flex gap-4 mb-6">
                            <Button variant="outline" onClick={prev}>Previous</Button>
                            <div className="flex-1 text-right">
                                <Button onClick={handleSubmit} disabled={submitting} className="bg-orange-400 text-white">Submit</Button>
                            </div>
                        </div>

                        <div className="text-xs text-gray-500">By submitting you agree to the terms provided above. The server will attempt to email the agreement to the configured recipient (defaults to tm0038763@gmail.com) or save it in the backend saved folder if SMTP is not configured.</div>
                    </div>
                )}

                {state.step === 5 && (
                    <div className="text-center">
                        <p className="font-semibold">Agreement submitted</p>
                        <p>Your tracking ID: <span className="font-mono">{trackingId ?? localStorage.getItem("lastTrackingId")}</span></p>
                    </div>
                )}
            </div>
        </section>
    );
};

export default AgreementForm;

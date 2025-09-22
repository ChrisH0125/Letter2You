"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.processScheduledEmails = exports.scheduleLetterEmail = exports.sendLetterEmail = void 0;
const https_1 = require("firebase-functions/v2/https");
const scheduler_1 = require("firebase-functions/v2/scheduler");
const nodemailer = __importStar(require("nodemailer"));
const admin = __importStar(require("firebase-admin"));
// Initialize Firebase Admin
admin.initializeApp();
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});
// Function to send email immediately
exports.sendLetterEmail = (0, https_1.onCall)(async (request) => {
    const { data, auth } = request;
    const { to, subject, text } = data;
    if (!auth) {
        throw new https_1.HttpsError("unauthenticated", "You must be signed in.");
    }
    if (!to || !text) {
        throw new https_1.HttpsError("invalid-argument", "Missing 'to' or 'text'.");
    }
    try {
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to,
            subject: subject || "Your Letter",
            text,
        });
        return { success: true };
    }
    catch (err) {
        console.error("Email error:", err);
        throw new https_1.HttpsError("internal", err.message);
    }
});
// Function to schedule email sending
exports.scheduleLetterEmail = (0, https_1.onCall)(async (request) => {
    const { data, auth } = request;
    const { to, subject, text, delayMs } = data;
    if (!auth) {
        throw new https_1.HttpsError("unauthenticated", "You must be signed in.");
    }
    if (!to || !text) {
        throw new https_1.HttpsError("invalid-argument", "Missing 'to' or 'text'.");
    }
    try {
        // Calculate scheduled time
        const scheduledTime = new Date(Date.now() + (delayMs || 0));
        // Store the letter in Firestore with scheduled time
        const letterRef = await admin.firestore().collection("scheduled_letters").add({
            uid: auth.uid,
            to,
            subject: subject || "Your Letter",
            text,
            scheduledAt: scheduledTime,
            createdAt: admin.firestore.FieldValue.serverTimestamp(),
            status: "scheduled"
        });
        return {
            success: true,
            letterId: letterRef.id,
            scheduledTime: scheduledTime.toISOString()
        };
    }
    catch (err) {
        console.error("Scheduling error:", err);
        throw new https_1.HttpsError("internal", err.message);
    }
});
// Scheduled function to check and send emails
exports.processScheduledEmails = (0, scheduler_1.onSchedule)("every 1 minutes", async (event) => {
    const now = new Date();
    try {
        // Find letters that are ready to be sent
        const readyLetters = await admin.firestore()
            .collection("scheduled_letters")
            .where("status", "==", "scheduled")
            .where("scheduledAt", "<=", now)
            .limit(10) // Process in batches
            .get();
        const batch = admin.firestore().batch();
        const emailPromises = [];
        for (const doc of readyLetters.docs) {
            const letter = doc.data();
            // Mark as processing
            batch.update(doc.ref, { status: "processing" });
            // Send email
            const emailPromise = transporter.sendMail({
                from: process.env.EMAIL_USER,
                to: letter.to,
                subject: letter.subject,
                text: letter.text,
            }).then(async () => {
                // Mark as sent
                await doc.ref.update({
                    status: "sent",
                    sentAt: admin.firestore.FieldValue.serverTimestamp()
                });
            }).catch(async (err) => {
                console.error(`Failed to send email for letter ${doc.id}:`, err);
                // Mark as failed
                await doc.ref.update({
                    status: "failed",
                    error: err.message,
                    failedAt: admin.firestore.FieldValue.serverTimestamp()
                });
            });
            emailPromises.push(emailPromise);
        }
        // Commit batch update
        await batch.commit();
        // Wait for all emails to be processed
        await Promise.all(emailPromises);
        console.log(`Processed ${readyLetters.docs.length} scheduled letters`);
    }
    catch (err) {
        console.error("Error processing scheduled emails:", err);
    }
});
//# sourceMappingURL=index.js.map
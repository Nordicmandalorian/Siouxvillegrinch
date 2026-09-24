import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

const required = ["SMTP_HOST", "SMTP_PORT", "SMTP_USER", "SMTP_PASS"] as const;

function clean(value: unknown, max = 2000) {
  return String(value ?? "").trim().slice(0, max);
}

export async function POST(request: Request) {
  try {
    for (const key of required) {
      if (!process.env[key]) {
        console.error(`Missing required environment variable: ${key}`);
        return NextResponse.json(
          { error: "Grinch messages are not configured yet." },
          { status: 503 }
        );
      }
    }

    const body = await request.json();
    const data = {
      name: clean(body.name, 120),
      email: clean(body.email, 254),
      message: clean(body.message, 3000),
    };

    if (!data.name || !data.message) {
      return NextResponse.json(
        { error: "Please enter your name and a message for the Grinch." },
        { status: 400 }
      );
    }

    if (data.email && !/^\S+@\S+\.\S+$/.test(data.email)) {
      return NextResponse.json(
        { error: "Please enter a valid reply email address." },
        { status: 400 }
      );
    }

    const port = Number(process.env.SMTP_PORT);
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port,
      secure: port === 465,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const destination = process.env.MESSAGE_TO || process.env.BOOKING_TO || "Hello@thesiouxvillegrinch.com";
    const fromName = process.env.MAIL_FROM_NAME || "Siouxville Grinch App";

    const text = [
      "NEW MESSAGE FOR THE SIOUXVILLE GRINCH",
      "",
      `From: ${data.name}`,
      `Reply email: ${data.email || "Not provided"}`,
      "",
      "Message:",
      data.message,
      "",
      "Sent from the Siouxville Grinch mobile app.",
    ].join("\n");

    await transporter.sendMail({
      from: `"${fromName}" <${process.env.SMTP_USER}>`,
      to: destination,
      ...(data.email ? { replyTo: data.email } : {}),
      subject: `Message for the Grinch — ${data.name}`,
      text,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Grinch message email failed", error);
    return NextResponse.json(
      { error: "Your message could not be sent to the Grinch. Please try again." },
      { status: 500 }
    );
  }
}

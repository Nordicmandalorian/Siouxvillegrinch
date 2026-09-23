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
          { error: "Booking email is not configured yet." },
          { status: 503 }
        );
      }
    }

    const body = await request.json();
    const data = {
      name: clean(body.name, 120),
      email: clean(body.email, 254),
      phone: clean(body.phone, 80),
      location: clean(body.location, 300),
      duration: clean(body.duration, 80),
      date1: clean(body.date1, 40),
      time1: clean(body.time1, 40),
      date2: clean(body.date2, 40),
      time2: clean(body.time2, 40),
      details: clean(body.details, 2000),
    };

    if (!data.name || !data.email || !data.phone || !data.location || !data.duration || !data.date1 || !data.time1 || !data.details) {
      return NextResponse.json({ error: "Please complete all required booking fields." }, { status: 400 });
    }

    if (!/^\S+@\S+\.\S+$/.test(data.email)) {
      return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
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

    const destination = process.env.BOOKING_TO || "Hello@thesiouxvillegrinch.com";
    const fromName = process.env.MAIL_FROM_NAME || "Siouxville Grinch App";

    const text = [
      "NEW SIOUXVILLE GRINCH BOOKING REQUEST",
      "",
      `Name: ${data.name}`,
      `Email: ${data.email}`,
      `Phone: ${data.phone}`,
      `Location / Address: ${data.location}`,
      `Duration: ${data.duration}`,
      `Requested Date #1: ${data.date1}`,
      `Requested Time #1: ${data.time1}`,
      `Requested Date #2: ${data.date2 || "Not provided"}`,
      `Requested Time #2: ${data.time2 || "Not provided"}`,
      "",
      "Additional Details:",
      data.details,
      "",
      "Sent from the Siouxville Grinch mobile app.",
    ].join("\n");

    await transporter.sendMail({
      from: `"${fromName}" <${process.env.SMTP_USER}>`,
      to: destination,
      replyTo: data.email,
      subject: `Booking Request — ${data.name}`,
      text,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Booking email failed", error);
    return NextResponse.json(
      { error: "The booking request could not be sent. Please try again." },
      { status: 500 }
    );
  }
}

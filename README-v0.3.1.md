# Siouxville Grinch v0.3.1 — Booking Email Patch

This patch changes only the booking delivery workflow.

## What changed
- The booking form no longer opens the user's email app.
- Booking requests POST to `/api/booking` inside the app.
- The server emails the request to `Hello@thesiouxvillegrinch.com`.
- The booking screen shows Sending / Success / Error states inside the app.
- The customer's email address is set as Reply-To, so replying to the received booking email replies directly to the customer.

## Required Vercel environment variables
Set these under Vercel > Project > Settings > Environment Variables:

- `SMTP_HOST`
- `SMTP_PORT` (normally 465 for SSL or 587 for STARTTLS)
- `SMTP_USER` (normally `Hello@thesiouxvillegrinch.com`)
- `SMTP_PASS` (mailbox password or provider-issued app password)

Optional:
- `BOOKING_TO` — defaults to `Hello@thesiouxvillegrinch.com`
- `MAIL_FROM_NAME` — defaults to `Siouxville Grinch App`

After adding/changing environment variables, redeploy the app.

No coloring-book, media, media-coverage, message, review, or sponsorship behavior was changed in this patch.

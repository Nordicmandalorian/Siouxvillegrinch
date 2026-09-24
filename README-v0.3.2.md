# Siouxville Grinch v0.3.2 — Message the Grinch in-app patch

This patch changes only the **Message the Grinch** workflow.

## What changed
- Message form no longer uses `mailto:`.
- Submits to `/api/message` and stays inside the app.
- Uses the same SMTP environment variables as booking:
  - `SMTP_HOST`
  - `SMTP_PORT`
  - `SMTP_USER`
  - `SMTP_PASS`
- Sends to `MESSAGE_TO` if set; otherwise falls back to `BOOKING_TO`, then `Hello@thesiouxvillegrinch.com`.
- If a visitor supplies an email address, that address is set as Reply-To.
- Shows sending/success/error status inside the app.

## Deliberately not changed
Coloring book, media images, media coverage links, reviews, and sponsorship behavior were not modified in this patch.

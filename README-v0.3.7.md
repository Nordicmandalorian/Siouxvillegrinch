# Siouxville Grinch v0.3.7 — Sponsorship

Isolated Sponsorship patch based on the existing v0.3.6.1 Media Correction build.

- Native Sponsorship hub: Become a Sponsor / Our Sponsors / Sponsorship Info.
- Native sponsorship form with supplied tiers, add-ons, activations, dates, times, notes.
- `No add-on` supported.
- `/api/sponsorship` sends through the existing Hostinger SMTP environment variables and sets Reply-To to the sponsor contact email.
- Sponsorship Info opens the official `sponsorship-info.pdf`.
- Our Sponsors has a native empty state ready for future sponsor cards.
- Existing Booking, Message, Our Friends, Media, galleries, and other screens are otherwise unchanged.

Optional environment variable: `SPONSORSHIP_TO`. Defaults to `Hello@thesiouxvillegrinch.com`.

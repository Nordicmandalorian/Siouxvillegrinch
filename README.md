# Siouxville Grinch App Prototype v0.1

A first-pass mobile-first prototype for The Siouxville Grinch.

## Included now

- Branded home screen
- Bottom navigation
- Events screen with sample events
- Booking request form (front-end only)
- Grinch messages form (front-end only)
- More screen for About, Media, Reviews, Sponsorship, Charity, Socials
- Mobile responsive layout inspired by the current Siouxville Grinch website

## Run it

```bash
npm install
npm run dev
```

Then open http://localhost:3000

## Recommended next development sprint

1. Replace prototype logo block with the real Siouxville Grinch logo/artwork.
2. Connect Supabase.
3. Add `events`, `bookings`, `messages`, `site_settings`, `social_links`, `media`, and `reviews` tables.
4. Add a private `/admin` dashboard.
5. Add booking statuses: New, Contacted, Tentative, Confirmed, Completed, Declined.
6. Allow confirmed bookings to be published as public events.
7. Wire social/contact buttons to the real URLs and contact info.
8. Turn the site into an installable PWA.
9. Add a QR landing route for live appearances.
10. Prepare Android wrapper/AAB only after the web/PWA prototype is stable.

## Presentation note

This build intentionally focuses on the user-facing concept and navigation. The booking and message buttons simulate success locally but do not yet submit data anywhere.

# The Siouxville Grinch App v0.3
Standalone mobile-first Next.js/PWA prototype based on the existing Siouxville Grinch website's visual identity and content.

## What changed from v0.2
- Website links removed from core navigation.
- About, pricing, Bored?, media, reviews, sponsorship, booking and messages are native app screens.
- Booking fields mirror the existing website booking form and target Hello@thesiouxvillegrinch.com.
- For this test build, booking/messages/reviews/sponsorship use the device email client via `mailto:`. A production backend (Supabase/server API) can replace this so submissions send directly without opening email.
- PWA manifest included.

## Run
npm install
npm run dev

## Deploy
Push the project to your Vercel project as before.

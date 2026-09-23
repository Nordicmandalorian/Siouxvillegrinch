"use client";

import { useState } from "react";
import {
  CalendarDays,
  Camera,
  Gift,
  Home,
  Mail,
  Menu,
  MessageCircle,
  PartyPopper,
  Send,
  Star,
  Users,
} from "lucide-react";

type Tab = "home" | "events" | "book" | "messages" | "more";

const events = [
  {
    date: "Nov 27",
    title: "Holiday Kickoff Appearance",
    place: "Sioux Falls, SD",
    detail: "Public appearance · details coming soon",
  },
  {
    date: "Dec 4",
    title: "Grinch-y Holiday Stop",
    place: "Sioux Falls Area",
    detail: "Photos, chaos, and questionable holiday cheer",
  },
  {
    date: "Dec 12",
    title: "Community Christmas Event",
    place: "TBA",
    detail: "Public event · all ages",
  },
];

function LogoCard() {
  return (
    <section className="hero-card">
      <div className="ornament">🎄</div>
      <div className="eyebrow">THE</div>
      <h1>SIOUXVILLE</h1>
      <div className="grinch-word">GRINCH</div>
      <p>Holiday mischief. Local chaos. Unforgettable appearances.</p>
    </section>
  );
}

function HomeScreen({ setTab }: { setTab: (tab: Tab) => void }) {
  return (
    <div className="screen-content">
      <LogoCard />

      <section className="welcome-card card">
        <span className="mini-label">WELCOME TO SIOUXVILLE</span>
        <h2>Sioux Falls&apos; favorite holiday troublemaker.</h2>
        <p>
          Book appearances, see where the Grinch is headed next, send him a message,
          and keep up with the latest festive chaos.
        </p>
        <div className="action-grid">
          <button className="primary" onClick={() => setTab("book")}><Gift size={20} /> Book the Grinch</button>
          <button className="secondary" onClick={() => setTab("events")}><CalendarDays size={20} /> View Events</button>
        </div>
      </section>

      <section className="card next-event">
        <div>
          <span className="mini-label">NEXT APPEARANCE</span>
          <h3>{events[0].title}</h3>
          <p>{events[0].date} · {events[0].place}</p>
        </div>
        <CalendarDays size={34} />
      </section>

      <section className="card feature-card">
        <div className="feature-icon"><PartyPopper size={34} /></div>
        <div>
          <span className="mini-label">GRINCH-Y-GRAMS</span>
          <h3>Send somebody a little holiday chaos.</h3>
          <p>Perfect for friends, family, coworkers, and anyone who deserves a Grinchy surprise.</p>
        </div>
      </section>

      <section className="quick-links">
        <button className="quick-card"><Camera /><span>Media</span></button>
        <button className="quick-card"><Star /><span>Reviews</span></button>
        <button className="quick-card"><Users /><span>Sponsors</span></button>
      </section>
    </div>
  );
}

function EventsScreen() {
  return (
    <div className="screen-content">
      <div className="page-heading">
        <span className="mini-label">WHERE&apos;S THE GRINCH?</span>
        <h2>Upcoming Events</h2>
        <p>Public appearances and community events will live here.</p>
      </div>
      <div className="event-list">
        {events.map((event) => (
          <article className="event-card card" key={event.date + event.title}>
            <div className="date-badge">{event.date}</div>
            <div>
              <h3>{event.title}</h3>
              <p className="event-place">{event.place}</p>
              <p>{event.detail}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

function BookingScreen() {
  const [sent, setSent] = useState(false);
  if (sent) {
    return (
      <div className="screen-content center-screen">
        <div className="success-icon">✓</div>
        <h2>Request stolen successfully.</h2>
        <p>The Grinch has your booking request. Someone from Siouxville will follow up with you.</p>
        <button className="primary wide" onClick={() => setSent(false)}>Send another request</button>
      </div>
    );
  }
  return (
    <div className="screen-content">
      <div className="page-heading">
        <span className="mini-label">MAKE SOME TROUBLE</span>
        <h2>Book the Grinch</h2>
        <p>This prototype stores nothing yet — it&apos;s the UI we&apos;ll wire to Supabase next.</p>
      </div>
      <form className="booking-form card" onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
        <label>Appearance type
          <select required defaultValue="">
            <option value="" disabled>Select one</option>
            <option>Family / Private Party</option>
            <option>Business Promotion</option>
            <option>Community Event</option>
            <option>Parade</option>
            <option>Grinch-y-Gram</option>
            <option>Charity / Nonprofit</option>
            <option>Custom</option>
          </select>
        </label>
        <div className="form-row">
          <label>Name<input required placeholder="Your name" /></label>
          <label>Phone<input required placeholder="(605) 555-0199" /></label>
        </div>
        <label>Email<input type="email" required placeholder="you@example.com" /></label>
        <div className="form-row">
          <label>Date<input type="date" required /></label>
          <label>Time<input type="time" /></label>
        </div>
        <label>Location<input placeholder="Venue or city" /></label>
        <label>Tell the Grinch what you&apos;re planning<textarea rows={5} placeholder="Event details, estimated attendance, special requests..." /></label>
        <button className="primary wide" type="submit"><Send size={18} /> Send Booking Request</button>
      </form>
    </div>
  );
}

function MessagesScreen() {
  const [sent, setSent] = useState(false);
  return (
    <div className="screen-content">
      <div className="page-heading">
        <span className="mini-label">MESSAGES FROM MOUNT KRUMPIT</span>
        <h2>Talk to the Grinch</h2>
        <p>Ask a question, report naughty behavior, or simply annoy him.</p>
      </div>
      <section className="quote-card card">
        <MessageCircle size={28} />
        <div>
          <strong>Grinch says:</strong>
          <p>“I&apos;m watching the naughty list. Some of you are making this way too easy.”</p>
        </div>
      </section>
      <form className="booking-form card" onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
        <label>Your name<input required placeholder="Name or nickname" /></label>
        <label>Your message<textarea required rows={6} placeholder="Dear Grinch..." /></label>
        <button className="primary wide" type="submit"><Mail size={18} /> {sent ? "Message Sent!" : "Send to the Grinch"}</button>
      </form>
    </div>
  );
}

function MoreScreen() {
  const links = [
    ["About the Siouxville Grinch", "Meet the holiday menace behind the green fur."],
    ["Media Gallery", "Photos, videos, parade appearances, and Grinch sightings."],
    ["Reviews", "See what victims — sorry, customers — have to say."],
    ["Sponsorship", "Partner with the Siouxville Grinch for events and promotions."],
    ["Charity", "Community support, fundraising, and Jingle Bell Run involvement."],
    ["Socials", "Facebook · Instagram · TikTok · Snapchat · more"],
  ];
  return (
    <div className="screen-content">
      <div className="page-heading">
        <span className="mini-label">MORE MISCHIEF</span>
        <h2>Explore Siouxville</h2>
      </div>
      <div className="more-list">
        {links.map(([title, copy]) => (
          <button className="more-card card" key={title}>
            <div><h3>{title}</h3><p>{copy}</p></div><span>›</span>
          </button>
        ))}
      </div>
      <section className="card prototype-note">
        <Menu size={22} />
        <div><strong>Prototype v0.1</strong><p>Designed as the starting point for the Friday presentation.</p></div>
      </section>
    </div>
  );
}

export default function Page() {
  const [tab, setTab] = useState<Tab>("home");
  const render = () => {
    if (tab === "events") return <EventsScreen />;
    if (tab === "book") return <BookingScreen />;
    if (tab === "messages") return <MessagesScreen />;
    if (tab === "more") return <MoreScreen />;
    return <HomeScreen setTab={setTab} />;
  };
  const items: { id: Tab; label: string; icon: React.ReactNode }[] = [
    { id: "home", label: "Home", icon: <Home /> },
    { id: "events", label: "Events", icon: <CalendarDays /> },
    { id: "book", label: "Book", icon: <Gift /> },
    { id: "messages", label: "Messages", icon: <MessageCircle /> },
    { id: "more", label: "More", icon: <Menu /> },
  ];
  return (
    <main className="app-shell">
      <div className="top-bar"><span className="brand-dot" /> <span>The Siouxville Grinch</span><span className="version">v0.1</span></div>
      <div className="screen">{render()}</div>
      <nav className="bottom-nav">
        {items.map((item) => (
          <button key={item.id} className={tab === item.id ? "active" : ""} onClick={() => setTab(item.id)}>
            {item.icon}<span>{item.label}</span>
          </button>
        ))}
      </nav>
    </main>
  );
}

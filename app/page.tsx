"use client";

import { useMemo, useState } from "react";
import { CalendarDays, Camera, ExternalLink, Gift, Heart, Home, Info, Mail, Menu, MessageCircle, Newspaper, PartyPopper, Send, Star, Users } from "lucide-react";

type Tab = "home" | "events" | "book" | "messages" | "more";

const SITE = "https://thesiouxvillegrinch.com";
const siteLinks = {
  about: `${SITE}/about.html`, booking: `${SITE}/booking.html`, bored: `${SITE}/bored.html`,
  media: `${SITE}/media.html`, reviews: `${SITE}/reviews.php`, sponsor: `${SITE}/support.html`, blog: `${SITE}/blog.html`,
};

const sampleEvents = [
  { month: "NOV", day: "27", title: "Holiday Appearance", place: "Sioux Falls Area", detail: "Public appearance details will be added as the 2026 calendar fills." },
  { month: "DEC", day: "04", title: "Grinch-y Holiday Stop", place: "Siouxville", detail: "Photos, mischief, and questionable holiday cheer." },
  { month: "DEC", day: "12", title: "Community Christmas Event", place: "Details TBA", detail: "Public event · all ages." },
];

function Logo() { return <img className="real-logo" src={`${SITE}/fulllogo2.jpg`} alt="The Siouxville Grinch" />; }
function OpenSite({ href, children, className = "secondary" }: { href:string; children:React.ReactNode; className?:string }) {
  return <a className={className} href={href} target="_blank" rel="noreferrer">{children}<ExternalLink size={16}/></a>;
}

function HomeScreen({ setTab }: { setTab:(t:Tab)=>void }) {
  return <div className="screen-content">
    <section className="logo-card"><Logo/><div className="snowline">❄ · 🎄 · ❄ · 🎁 · ❄</div></section>
    <section className="card welcome-card">
      <span className="mini-label">WELCOME TO THE OFFICIAL APP</span>
      <h2>The Siouxville Grinch</h2>
      <p>Sioux Falls&apos; favorite holiday mischief-maker! Family events, business promotions, parades, charity partnerships and custom holiday experiences — with plenty of festive chaos along the way.</p>
      <div className="action-grid"><button className="primary" onClick={()=>setTab("book")}><Gift size={20}/>Book the Grinch</button><button className="secondary" onClick={()=>setTab("events")}><CalendarDays size={20}/>Events</button></div>
    </section>
    <section className="photo-card"><img src={`${SITE}/grinchcollage.jpg`} alt="Siouxville Grinch appearances"/></section>
    <section className="card jingle"><Heart className="heart"/><div><span className="mini-label">COMMUNITY</span><h3>Arthritis Foundation Jingle Bell Run</h3><p>Supporting the community is part of the Grinch&apos;s holiday tradition.</p></div></section>
    <section className="card feature-card"><PartyPopper/><div><span className="mini-label">GRINCH-Y-GRAMS</span><h3>Send somebody a Grinch-y surprise.</h3><p>Friends, family, coworkers — nobody is safe from a little holiday mischief.</p></div></section>
    <div className="quick-links">
      <a className="quick-card" href={siteLinks.media} target="_blank"><Camera/><span>Media</span></a>
      <a className="quick-card" href={siteLinks.reviews} target="_blank"><Star/><span>Reviews</span></a>
      <a className="quick-card" href={siteLinks.sponsor} target="_blank"><Users/><span>Sponsors</span></a>
    </div>
  </div>;
}

function EventsScreen(){ return <div className="screen-content"><div className="page-heading"><span className="mini-label">WHERE&apos;S THE GRINCH?</span><h2>Events & Appearances</h2><p>This becomes the live public calendar. For now, v0.2 shows the app layout while the existing booking calendar remains available.</p></div>
  <OpenSite href={siteLinks.booking} className="primary wide">Open Current Booking Calendar</OpenSite>
  <div className="event-list">{sampleEvents.map(e=><article className="event-card card" key={e.month+e.day}><div className="calendar-badge"><b>{e.month}</b><strong>{e.day}</strong></div><div><h3>{e.title}</h3><p className="green-text">{e.place}</p><p>{e.detail}</p></div></article>)}</div>
</div> }

function BookingScreen(){ const [sent,setSent]=useState(false); if(sent)return <div className="screen-content center-screen"><div className="success-icon">✓</div><h2>Your request has been nabbed.</h2><p>This v0.2 demo shows the complete app flow. The production version will deliver requests to the Grinch dashboard.</p><button className="primary wide" onClick={()=>setSent(false)}>Make another request</button><OpenSite href={siteLinks.booking}>Use Current Website Booking</OpenSite></div>;
return <div className="screen-content"><div className="page-heading"><span className="mini-label">CAUSE SOME HOLIDAY CHAOS</span><h2>Book the Grinch</h2><p>Request an appearance right from the app. Website pricing and availability are one tap away.</p></div><div className="booking-actions"><OpenSite href={siteLinks.booking}>Pricing & Live Availability</OpenSite></div>
<form className="booking-form card" onSubmit={e=>{e.preventDefault();setSent(true)}}><label>Appearance type<select required defaultValue=""><option value="" disabled>Choose an appearance</option><option>Family / Private Event</option><option>Business Promotion</option><option>Parade / Community Event</option><option>Grinch-y-Gram</option><option>Charity / Nonprofit</option><option>Custom Holiday Experience</option></select></label><div className="form-row"><label>Name<input required placeholder="Your name"/></label><label>Phone<input required placeholder="Phone number"/></label></div><label>Email<input type="email" required placeholder="you@example.com"/></label><div className="form-row"><label>Date<input type="date" required/></label><label>Preferred time<input type="time"/></label></div><label>Location<input placeholder="Venue / city"/></label><label>Tell the Grinch what you&apos;re plotting<textarea rows={5} placeholder="Event details, attendance, special requests..."/></label><button className="primary wide" type="submit"><Send size={18}/>Send Booking Request</button></form></div> }

function MessagesScreen(){const [sent,setSent]=useState(false);const sayings=useMemo(()=>["I’m watching the naughty list. Some of you are making this way too easy.","Holiday cheer? Suspicious. I’ll investigate.","Tell Santa I was nowhere near those presents."],[]);const [i,setI]=useState(0);return <div className="screen-content"><div className="page-heading"><span className="mini-label">DIRECT FROM SIOUXVILLE</span><h2>Message the Grinch</h2><p>Ask a question, report naughty behavior, or simply annoy him.</p></div><section className="quote-card card" onClick={()=>setI((i+1)%sayings.length)}><MessageCircle/><div><strong>The Grinch says:</strong><p>“{sayings[i]}”</p><small>Tap for another</small></div></section><form className="booking-form card" onSubmit={e=>{e.preventDefault();setSent(true)}}><label>Your name<input required placeholder="Name or nickname"/></label><label>Email <span className="optional">(optional)</span><input type="email" placeholder="For a reply"/></label><label>Your message<textarea required rows={6} placeholder="Dear Grinch..."/></label><button className="primary wide"><Mail size={18}/>{sent?"Message Sent!":"Send to the Grinch"}</button></form></div>}

function MoreScreen(){const links=[
  [Info,"About the Grinch","Martin's story, from early appearances to Siouxville.",siteLinks.about],
  [Gift,"Bookings","Current calendar, pricing and booking information.",siteLinks.booking],
  [PartyPopper,"Bored?","Jokes, surprises, coloring, photos and Grinch fun.",siteLinks.bored],
  [Newspaper,"Media","Press coverage and Siouxville Grinch sightings.",siteLinks.media],
  [Star,"Grinchmas Reviews","See reviews or leave one of your own.",siteLinks.reviews],
  [Users,"Sponsorship","Partner with the Grinch for events and community projects.",siteLinks.sponsor],
];return <div className="screen-content"><div className="page-heading"><span className="mini-label">MORE MISCHIEF</span><h2>Explore Siouxville</h2><p>The best parts of the website, reorganized for a phone.</p></div><div className="more-list">{links.map(([Icon,title,copy,href]:any)=><a className="more-card card" href={href} target="_blank" rel="noreferrer" key={title}><Icon/><div><h3>{title}</h3><p>{copy}</p></div><span>›</span></a>)}</div><section className="card prototype-note"><Menu/><div><strong>Siouxville Grinch App · v0.2</strong><p>Website-to-app prototype · September 2026</p></div></section></div>}

export default function Page(){const [tab,setTab]=useState<Tab>("home");const render=()=>tab==="events"?<EventsScreen/>:tab==="book"?<BookingScreen/>:tab==="messages"?<MessagesScreen/>:tab==="more"?<MoreScreen/>:<HomeScreen setTab={setTab}/>;const items=[{id:"home",label:"Home",icon:<Home/>},{id:"events",label:"Events",icon:<CalendarDays/>},{id:"book",label:"Book",icon:<Gift/>},{id:"messages",label:"Message",icon:<MessageCircle/>},{id:"more",label:"More",icon:<Menu/>}] as const;return <main className="app-shell"><header className="top-bar"><span className="brand-dot"/><span>THE SIOUXVILLE GRINCH</span><span className="version">v0.2</span></header><div className="screen">{render()}</div><nav className="bottom-nav">{items.map(x=><button key={x.id} className={tab===x.id?"active":""} onClick={()=>setTab(x.id)}>{x.icon}<span>{x.label}</span></button>)}</nav></main>}

"use client";

import { FormEvent, useMemo, useState } from "react";
import { CalendarDays, Camera, Gift, Heart, Home, Info, Mail, Menu, MessageCircle, Newspaper, PartyPopper, Send, Star, Users, ChevronRight, BadgeDollarSign, Sparkles, Images, Smile, HandHeart } from "lucide-react";

type Tab = "home"|"events"|"book"|"messages"|"more";
type View = Tab|"about"|"media"|"reviews"|"sponsor"|"bored"|"pricing"|"gallery"|"coloring"|"friends";
const EMAIL="Hello@thesiouxvillegrinch.com";
const SITE="https://thesiouxvillegrinch.com";

function Logo(){return <img className="real-logo" src={`${SITE}/fulllogo2.jpg`} alt="The Siouxville Grinch"/>}
function HeroCollage(){return <img src={`${SITE}/grinchcollage.jpg`} alt="The Siouxville Grinch appearances"/>}
function mail(subject:string, body:string){window.location.href=`mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`}

function HomeScreen({go}:{go:(v:View)=>void}){return <div className="screen-content">
  <section className="logo-card"><Logo/><div className="confetti">🍁 🐝 🍁 🐝 🍁</div></section>
  <section className="hero-copy"><span className="eyebrow">WELCOME TO SIOUXVILLE</span><h1>Holiday mischief.<br/><em>Now in your pocket.</em></h1><p>Family events, business promotions, parades, charity partnerships and custom holiday experiences — with the festive chaos of The Siouxville Grinch.</p></section>
  <div className="action-grid"><button className="primary" onClick={()=>go("book")}><Gift/>Book the Grinch</button><button className="red-button" onClick={()=>go("events")}><CalendarDays/>Events</button></div>
  <section className="photo-card"><HeroCollage/></section>
  <section className="card feature" onClick={()=>go("bored")}><Smile/><div><span className="eyebrow">BORED?</span><h3>Cause a little trouble.</h3><p>Jokes, surprises, coloring ideas and Grinchy fun.</p></div><ChevronRight/></section>
  <section className="card feature"><Heart className="red-icon"/><div><span className="eyebrow">COMMUNITY</span><h3>Jingle Bell Run</h3><p>The Siouxville Grinch proudly supports the Arthritis Foundation Jingle Bell Run.</p></div></section>
  <div className="quick-grid"><button onClick={()=>go("media")}><Newspaper/><b>Media</b></button><button onClick={()=>go("reviews")}><Star/><b>Reviews</b></button><button onClick={()=>go("sponsor")}><Users/><b>Sponsors</b></button></div>
</div>}

function EventsScreen(){return <div className="screen-content"><Header kicker="WHERE'S THE GRINCH?" title="Events & Appearances" text="The app's public calendar will live here — separate from the website and designed for quick mobile viewing."/>
  <section className="calendar-shell card"><div className="calendar-top"><b>SEPTEMBER 2026</b><span>Public appearances</span></div><div className="legend"><span><i className="available"/>Available</span><span><i className="pending"/>Pending</span><span><i className="booked"/>Booked</span></div><div className="empty-calendar"><CalendarDays/><h3>Calendar connection is next.</h3><p>No fake events here. Once the shared event data is connected, confirmed public appearances will populate this screen automatically.</p></div></section>
</div>}

function BookingScreen({go}:{go:(v:View)=>void}){
  const [status,setStatus]=useState<"idle"|"sending"|"sent"|"error">("idle");
  const [error,setError]=useState("");

  async function submit(e:FormEvent<HTMLFormElement>){
    e.preventDefault();
    setStatus("sending");
    setError("");

    const form=e.currentTarget;
    const d=new FormData(form);
    const payload={
      name:String(d.get("name")||""),
      email:String(d.get("email")||""),
      phone:String(d.get("phone")||""),
      location:String(d.get("location")||""),
      duration:String(d.get("duration")||""),
      date1:String(d.get("date1")||""),
      time1:String(d.get("time1")||""),
      date2:String(d.get("date2")||""),
      time2:String(d.get("time2")||""),
      details:String(d.get("details")||"")
    };

    try{
      const res=await fetch("/api/booking",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(payload)
      });
      const result=await res.json().catch(()=>({}));
      if(!res.ok) throw new Error(result?.error||"The Grinch's mailroom had a problem.");
      setStatus("sent");
      form.reset();
    }catch(err){
      setStatus("error");
      setError(err instanceof Error?err.message:"Unable to send booking request.");
    }
  }

  return <div className="screen-content"><Header kicker="CAUSE SOME HOLIDAY CHAOS" title="Book the Grinch" text={`Send a booking request directly to ${EMAIL} without leaving the app.`}/><button className="price-strip" onClick={()=>go("pricing")}><BadgeDollarSign/><span><b>See Pricing</b><small>15 minutes through 4 hours</small></span><ChevronRight/></button>
<form className="form-card card" onSubmit={submit}><label>Name *<input name="name" required disabled={status==="sending"}/></label><label>Email *<input name="email" type="email" required disabled={status==="sending"}/></label><label>Phone Number *<input name="phone" required disabled={status==="sending"}/></label><label>Location / Address *<input name="location" required disabled={status==="sending"}/></label><label>Duration *<select name="duration" required defaultValue="" disabled={status==="sending"}><option value="" disabled>Select duration</option><option>15 Minutes</option><option>30 Minutes</option><option>45 Minutes</option><option>60 Minutes</option><option>2 Hours</option><option>3 Hours</option><option>4 Hours</option><option>Over 4 Hours / Negotiable</option></select></label><div className="two"><label>Requested Date #1 *<input name="date1" type="date" required disabled={status==="sending"}/></label><label>Requested Time #1 *<input name="time1" type="time" required disabled={status==="sending"}/></label></div><div className="two"><label>Requested Date #2<input name="date2" type="date" disabled={status==="sending"}/></label><label>Requested Time #2<input name="time2" type="time" disabled={status==="sending"}/></label></div><label>Additional Details *<textarea name="details" maxLength={2000} rows={6} required disabled={status==="sending"} placeholder="Tell the Grinch what you're plotting..."/></label>
{status==="sent"&&<div className="form-notice success"><b>Booking request sent!</b><span>The Grinch's lair has received your request at {EMAIL}.</span></div>}
{status==="error"&&<div className="form-notice error"><b>That didn't send.</b><span>{error}</span></div>}
<button className="primary wide" type="submit" disabled={status==="sending"}><Send/>{status==="sending"?"Sending...":"Send Booking Request"}</button></form></div>
}
function MessagesScreen(){
  const sayings=useMemo(()=>["Holiday cheer? Suspicious. I'll investigate.","I'm checking the naughty list. Some of you are making this way too easy.","Tell Santa I was nowhere near those presents.","Your complaint has been filed directly into the fireplace."],[]);
  const [i,setI]=useState(0);
  const [status,setStatus]=useState<"idle"|"sending"|"sent"|"error">("idle");
  const [error,setError]=useState("");

  async function submit(e:FormEvent<HTMLFormElement>){
    e.preventDefault();
    setStatus("sending");
    setError("");

    const form=e.currentTarget;
    const d=new FormData(form);
    const payload={
      name:String(d.get("name")||""),
      email:String(d.get("email")||""),
      message:String(d.get("message")||"")
    };

    try{
      const res=await fetch("/api/message",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(payload)
      });
      const result=await res.json().catch(()=>({}));
      if(!res.ok) throw new Error(result?.error||"The Grinch's mailroom had a problem.");
      setStatus("sent");
      form.reset();
    }catch(err){
      setStatus("error");
      setError(err instanceof Error?err.message:"Unable to send your message.");
    }
  }

  return <div className="screen-content"><Header kicker="DIRECT FROM SIOUXVILLE" title="Message the Grinch" text="Ask a question, report naughty behavior, or send the mean green guy a message without leaving the app."/><button className="quote card" onClick={()=>setI((i+1)%sayings.length)}><MessageCircle/><div><small>THE GRINCH SAYS</small><strong>“{sayings[i]}”</strong><span>Tap for another</span></div></button><form className="form-card card" onSubmit={submit}><label>Your name *<input name="name" required disabled={status==="sending"}/></label><label>Email for a reply<input name="email" type="email" disabled={status==="sending"}/></label><label>Your message *<textarea name="message" required rows={7} maxLength={3000} disabled={status==="sending"} placeholder="Dear Grinch..."/></label>
{status==="sent"&&<div className="form-notice success"><b>Message sent to Mount Krumpit!</b><span>The Grinch received your message without you leaving the app.</span></div>}
{status==="error"&&<div className="form-notice error"><b>That message escaped.</b><span>{error}</span></div>}
<button className="primary wide" type="submit" disabled={status==="sending"}><Mail/>{status==="sending"?"Sending...":"Send to the Grinch"}</button></form></div>
}

function About(){return <div className="screen-content"><Header kicker="THE MEAN GREEN GUY" title="About the Siouxville Grinch"/><section className="card story"><p>My name is Martin Dalcourt. I was born and raised in Toronto, Ontario, moved to Sioux City in 2005, and eventually made my way to Sioux Falls in 2025.</p><p>My creative spark kicked in around 2015 with my first custom-made costume, which came out during events with Monster Karaoke & DJ Services. Early appearances included local daycares and family events.</p><p>By 2019, bookings were growing. In 2021, I upgraded the suit and began using prosthetic masks, and the Grinch appearances have continued growing ever since.</p><p>Christmas is for joy and laughs — and when the Siouxville Grinch is around, there may be a prank or two up his sleeve.</p></section></div>}
function Pricing(){const rows=[["15 Minutes","$50"],["30 Minutes","$100"],["45 Minutes","$150"],["60 Minutes","$200"],["2 Hours","$400"],["3 Hours","$600"],["4 Hours","$800"]];return <div className="screen-content"><Header kicker="PRICING & PAYMENT" title="Choose Your Chaos" text="Anything over four hours is negotiable."/><section className="price-list card">{rows.map(r=><div key={r[0]}><b>{r[0]}</b><strong>{r[1]}</strong></div>)}</section><section className="card"><h3>Payment</h3><p>Cash is king. PayPal can be used for Visa/Mastercard payments. Checks are not accepted.</p></section></div>}
function Bored({go}:{go:(v:View)=>void}){return <div className="screen-content"><Header kicker="BORED?" title="Pick Your Mischief" text="A mobile home for the fun side of Siouxville."/><div className="tile-grid"><Fun icon={<Sparkles/>} title="Surprise Me" text="Random Grinch joke or challenge"/><Fun icon={<Camera/>} title="TikTok Pics" text="Photo fun and poses" onClick={()=>go("gallery")}/><Fun icon={<PartyPopper/>} title="Color a Grinch" text="20 printable coloring pages" onClick={()=>go("coloring")}/><Fun icon={<Users/>} title="Our Friends" text="Community partners" onClick={()=>go("friends")}/><Fun icon={<Images/>} title="Photo Gallery" text="Grinch sightings"/><Fun icon={<Gift/>} title="Advent Calendar" text="Daily holiday mischief"/></div></div>}
function TikTokPics(){const pics=Array.from({length:12},(_,i)=>`/tiktok-pics/${588+i}.webp`);const [selected,setSelected]=useState<string|null>(null);return <div className="screen-content"><Header kicker="TIKTOK PICS" title="Siouxville Picture Vault" text="Tap any image for a closer look."/><div className="tiktok-grid">{pics.map((src,i)=><button className="tiktok-card" key={src} onClick={()=>setSelected(src)} aria-label={`Open TikTok picture ${i+1}`}><img src={src} alt={`Siouxville Grinch TikTok picture ${i+1}`} loading="lazy"/></button>)}</div>{selected&&<button className="lightbox" onClick={()=>setSelected(null)} aria-label="Close image"><img src={selected} alt="Selected Siouxville Grinch TikTok picture"/><span>Tap anywhere to close</span></button>}</div>}
function ColoringBook(){const pages=Array.from({length:20},(_,i)=>`/coloring-pages/${606+i}.png`);const [selected,setSelected]=useState<string|null>(null);return <div className="screen-content"><Header kicker="COLOR A GRINCH" title="Siouxville Coloring Book" text="20 Siouxville Grinch coloring pages. Tap any page to view it full size."/><div className="coloring-grid">{pages.map((src,i)=><button className="coloring-card" key={src} onClick={()=>setSelected(src)} aria-label={`Open coloring page ${i+1}`}><img src={src} alt={`Siouxville Grinch coloring page ${i+1}`} loading="lazy"/><span>Page {i+1}</span></button>)}</div>{selected&&<button className="lightbox coloring-lightbox" onClick={()=>setSelected(null)} aria-label="Close coloring page"><img src={selected} alt="Selected Siouxville Grinch coloring page"/><span>Tap anywhere to close</span></button>}</div>}
function Media(){return <div className="screen-content"><Header kicker="IN THE WILD" title="Media Articles" text="The Siouxville Grinch has been spotted by local media across the region."/><section className="card media-list">{["Sioux City Journal · 2023","KCAU · 2024","KTIV · 2025","KXRB · 2025","Pigeon605 · 2025","MCS · 2026"].map(x=><div key={x}><Newspaper/><b>{x}</b></div>)}</section></div>}
function Reviews(){function submit(e:FormEvent<HTMLFormElement>){e.preventDefault();const d=new FormData(e.currentTarget);mail("Siouxville Grinch Review",`GRINCHMAS REVIEW\n\nName: ${d.get("name")}\nRating: ${d.get("rating")}/5\n\n${d.get("review")}`)}return <div className="screen-content"><Header kicker="JUDGING THE MEAN GREEN GUY" title="Grinchmas Reviews" text="Be among the first to leave a review through the app."/><form className="form-card card" onSubmit={submit}><label>Name<input name="name" required/></label><label>Rating<select name="rating" defaultValue="5"><option>5</option><option>4</option><option>3</option><option>2</option><option>1</option></select></label><label>Review<textarea name="review" required rows={6}/></label><button className="primary wide"><Star/>Prepare Review</button></form></div>}
function Sponsor(){return <div className="screen-content"><Header kicker="BECOME A SPONSOR" title="Partner with the Grinch" text="Sponsorships help bring more holiday magic to Sioux Falls and beyond."/><section className="card"><HandHeart/><h3>Businesses, creators & community supporters</h3><p>Support events, appearances, and community projects — or pitch a partnership of your own.</p><button className="primary wide top-gap" onClick={()=>mail("Siouxville Grinch Sponsorship Inquiry","SPONSORSHIP INQUIRY\n\nName / Business:\nPhone:\n\nTell us what you have in mind:\n")}><Mail/>Contact About Sponsorship</button></section></div>}
function More({go}:{go:(v:View)=>void}){const items:[[any,string,string,View]]|any=[[Info,"About","Meet Martin and the story behind the Grinch.","about"],[BadgeDollarSign,"Pricing","Appearance pricing and payment options.","pricing"],[Smile,"Bored?","Jokes, activities and Grinchy distractions.","bored"],[Newspaper,"Media","Press coverage and Grinch sightings.","media"],[Star,"Reviews","Judge the mean green guy.","reviews"],[Users,"Sponsorship","Partner with the Siouxville Grinch.","sponsor"]];return <div className="screen-content"><Header kicker="MORE MISCHIEF" title="Explore Siouxville" text="Everything here lives inside the app — no website detours."/><div className="more-list">{items.map(([Icon,title,text,v]:any)=><button className="more-card card" key={title} onClick={()=>go(v)}><Icon/><div><h3>{title}</h3><p>{text}</p></div><ChevronRight/></button>)}</div><div className="contact-line"><Mail/> {EMAIL}</div></div>}

const FRIENDS = [
  {name:"Bluff's Little Thinkers",url:"https://www.bluffslittlethinkers.com/",local:"/friends/01-bluffs-little-thinkers.jpg"},
  {name:"IBEW Holiday Lighted Parade",url:"https://downtownsiouxcity.com/events/ibew-holiday-lighted-parade/",local:"/friends/02-ibew-holiday-lighted-parade.jpg"},
  {name:"Downtown Sioux Falls",url:"https://dtsf.com/",local:"/friends/03-downtown-sioux-falls.png"},
  {name:"Falls Overlook Cafe",url:"https://fallsoverlook.com/",local:"/friends/04-falls-overlook-cafe.png"},
  {name:"Hy-Vee",url:"https://www.hy-vee.com/stores/detail.aspx?s=151",local:"/friends/05-hy-vee.png"},
  {name:"Minnehaha County Sheriff's Office",url:"https://www.minnehahacounty.gov/dept/so/so.php",local:"/friends/06-minnehaha-county-sheriff.png"},
  {name:"Monster Karaoke & DJ Services",url:"https://www.facebook.com/share/1DeLF4tFnK/",local:"/friends/07-monster-karaoke.jpg"},
  {name:"North Sioux City",url:"https://northsiouxcity-sd.gov/",local:"/friends/08-north-sioux-city.png"},
  {name:"Opportunities Unlimited",url:"https://opportunitiesunlimited.com/",local:"/friends/09-opportunities-unlimited.png"},
  {name:"2026 Parade of Lights",url:"https://dtsf.com/event/2026-parade-of-lights/",local:"/friends/10-parade-of-lights.png"},
  {name:"Pickled Palette",url:"https://pickledpalette.com/",local:"/friends/11-pickled-palette.jpg"},
  {name:"Sioux City Police Department",url:"https://www.sioux-city.org/166/Police",local:"/friends/12-sioux-city-police.png"},
  {name:"Sioux City Railroad Museum",url:"https://www.siouxcityrailroadmuseum.org/",local:"/friends/13-sioux-city-railroad-museum.png"},
  {name:"Raven Rookery, LLC",url:"https://www.facebook.com/share/1F2Zp5Pd4x/",local:"/friends/14-raven-rookery.jpg"},
  {name:"Seaboard Triumph Foods",url:"https://seaboardtriumphfoods.com/",local:"/friends/15-seaboard-triumph-foods.png"},
  {name:"Dakota County Sheriff's Office",url:"https://dakotacosheriffne.org/",local:"/friends/16-dakota-county-sheriff.png"},
  {name:"Sioux Falls Police Department",url:"https://www.siouxfalls.gov/health-safety/police/police-information/law-enforcement-center",local:"/friends/17-sioux-falls-police.jpg"},
  {name:"South Sioux City Police Department",url:"https://www.southsiouxcity.org/department/index.php?structureid=13",local:"/friends/18-south-sioux-city-police.png"},
  {name:"Stensland Family Farms",url:"https://www.stenslandfamilyfarms.com/",local:"/friends/19-stensland-family-farms.png"},
  {name:"Titans Tavern",url:"https://titanstavern.com/",local:"/friends/20-titans-tavern.webp"},
  {name:"TM Designs",url:"",local:"/friends/21-tm-designs.png"},
  {name:"Woodbury County Sheriff's Office",url:"https://www.woodburycountyiowa.gov/sheriff/",local:"/friends/22-woodbury-county-sheriff.jpg"}
];

function FriendLogo({friend}:{friend:(typeof FRIENDS)[number]}){
  return <img src={friend.local} alt={`${friend.name} logo`} loading="lazy"/>;
}
function Friends(){return <div className="screen-content"><Header kicker="THE GRINCH'S ACCOMPLICES" title="Our Friends" text="Businesses, organizations and community partners who have supported — or been gotten by — the Siouxville Grinch."/><div className="friends-grid">{FRIENDS.map((friend)=>friend.url?<a className="friend-card" href={friend.url} target="_blank" rel="noreferrer" key={friend.name}><div className="friend-logo"><FriendLogo friend={friend}/></div><small>Visit Website</small></a>:<div className="friend-card no-link" key={friend.name}><div className="friend-logo"><FriendLogo friend={friend}/></div><small>No Website</small></div>)}</div></div>}

function Header({kicker,title,text}:{kicker:string,title:string,text?:string}){return <header className="page-heading"><span className="eyebrow">{kicker}</span><h2>{title}</h2>{text&&<p>{text}</p>}</header>}
function Fun({icon,title,text,onClick}:{icon:React.ReactNode,title:string,text:string,onClick?:()=>void}){return <button className="fun-tile" onClick={onClick}>{icon}<b>{title}</b><small>{text}</small></button>}

export default function Page(){const [view,setView]=useState<View>("home");const tab:Tab=(["home","events","book","messages","more"] as View[]).includes(view)?view as Tab:"more";const go=(v:View)=>{setView(v);window.scrollTo({top:0,behavior:"smooth"})};let content:React.ReactNode;switch(view){case"events":content=<EventsScreen/>;break;case"book":content=<BookingScreen go={go}/>;break;case"messages":content=<MessagesScreen/>;break;case"more":content=<More go={go}/>;break;case"about":content=<About/>;break;case"pricing":content=<Pricing/>;break;case"bored":content=<Bored go={go}/>;break;case"gallery":content=<TikTokPics/>;break;case"coloring":content=<ColoringBook/>;break;case"friends":content=<Friends/>;break;case"media":content=<Media/>;break;case"reviews":content=<Reviews/>;break;case"sponsor":content=<Sponsor/>;break;default:content=<HomeScreen go={go}/>}
const nav=[ ["home","Home",Home],["events","Events",CalendarDays],["book","Book",Gift],["messages","Message",MessageCircle],["more","More",Menu] ] as const;return <main className="app-shell"><header className="top-bar"><span className="brand-dot"/><span>THE SIOUXVILLE GRINCH</span><span className="version">v0.3.5.3</span></header><div className="screen">{content}</div><nav className="bottom-nav">{nav.map(([id,label,Icon])=><button key={id} className={tab===id?"active":""} onClick={()=>go(id)}><Icon/><span>{label}</span></button>)}</nav></main>}

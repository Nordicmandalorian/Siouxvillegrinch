import type { Metadata, Viewport } from "next";
import "./globals.css";
export const metadata:Metadata={title:"The Siouxville Grinch",description:"The official Siouxville Grinch mobile app",manifest:"/manifest.webmanifest"};
export const viewport:Viewport={themeColor:"#000000",width:"device-width",initialScale:1,viewportFit:"cover"};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body>{children}</body></html>}

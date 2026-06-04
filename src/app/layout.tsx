
import type {Metadata, Viewport} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"

export const metadata: Metadata = {
  title: 'LPANDA - Welcome to The Forest',
  description: 'Welcome to LPANDA — enter the forest and explore the LPANDA experience.',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Luckiest+Guy&family=Patrick+Hand&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        <div className="fixed inset-0 w-full h-full z-[-2]">
          <video autoPlay loop muted playsInline className="w-full h-full object-cover opacity-30">
            <source src="/Background.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="absolute"></div>
        {children}
        <Toaster />
      </body>
    </html>
  );
}

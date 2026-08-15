import type { Metadata } from "next";
import "@fontsource/manrope/500.css";
import "@fontsource/manrope/600.css";
import "@fontsource/manrope/700.css";
import "@fontsource/manrope/800.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import "@fontsource/ibm-plex-mono/400.css";
import "@fontsource/ibm-plex-mono/500.css";
import "@fontsource/ibm-plex-mono/600.css";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://theutsavapp.com"),
  title: "Utsav — Plan your event without any hassle",
  description:
    "Utsav helps you plan weddings, birthdays, and celebrations end to end: a checklist that adapts to your event, guest lists with RSVP tracking, digital invites, QR gate passes, and gift tracking. Book real vendors, all in one place.",
  icons: {
    icon: [
      { url: "/brand/favicon-32-transparent.png", sizes: "32x32", type: "image/png" },
      { url: "/brand/favicon-16-transparent.png", sizes: "16x16", type: "image/png" },
    ],
    apple: "/brand/apple-touch-icon-180.png",
  },
  openGraph: {
    title: "Utsav — Plan your event without any hassle",
    description:
      "A checklist that adapts to your event, guest RSVPs, digital invites, QR gate passes, and gift tracking — all in one place.",
    images: ["/brand/og-image-1200x630.png"],
  },
};

// Prevents a light/dark flash on load by setting the class before paint.
const themeInitScript = `
(function () {
  try {
    var stored = localStorage.getItem('utsav-theme');
    var theme = stored || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark', theme === 'dark');
    document.documentElement.style.colorScheme = theme;
  } catch (e) {}
})();
`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}

import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { ActiveTabProvider } from './context/ActiveTabContext';
import { SidebarProvider } from './context/SidebarContext';
import Layout from "./components/Layout";


const inter = Inter({ 
  subsets: ["latin"],
  display: 'swap',
  preload: true,
  variable: '--font-inter',
});

export const metadata = {
  title: "Ezy-Metrics",
  description: "Next Generation Data Platform",
  keywords: "data platform, analytics, metrics, productivity",
  authors: [{ name: "EZY Team" }],
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
  },
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0f172a' }
  ],
};

// Combine providers into a single component for better performance
function Providers({ children }) {
  return (
    <AuthProvider>
      <ThemeProvider>
        <ActiveTabProvider>
          <SidebarProvider>
            {children}
          </SidebarProvider>
        </ActiveTabProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <head>
        {/* Preconnect to external resources for faster loading */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body 
        className={`${inter.className} antialiased`}
        suppressHydrationWarning
      >
        <Providers>
          <Layout>
            {children}
          </Layout>
        </Providers>
      </body>
    </html>
  );
}
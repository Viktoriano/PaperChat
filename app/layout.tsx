import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import StyledComponentsRegistry from '@/lib/registry';
import Link from 'next/link';
import DotGrid from './components/DotGrid';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'PaperChat',
  description: 'A privacy-focused chat application',
};

// Add navigation bar for demo/testing
const NavBar = () => (
  <nav style={{position:'fixed',bottom:0,left:0,width:'100vw',background:'#22304a',display:'flex',justifyContent:'space-around',zIndex:999}}>
    <Link href="/">Home</Link>
    <Link href="/contact-list">Contacts</Link>
    <Link href="/profile/edit">Edit Profile</Link>
    <Link href="/user-qr-code">QR</Link>
    <Link href="/settings">Settings</Link>
  </nav>
);

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Get current path to conditionally render DotGrid
  const isBrowser = typeof window !== 'undefined';
  let path = '';
  if (isBrowser) path = window.location.pathname;
  const hideDotGrid = path === '/' || path.startsWith('/contact-list') || path.startsWith('/settings');

  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
        />
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons+Outlined"
          rel="stylesheet"
        />
      </head>
      <body className={inter.className}>
        <StyledComponentsRegistry>
          {!hideDotGrid && <DotGrid />}
          {children}
        </StyledComponentsRegistry>
        <NavBar />
      </body>
    </html>
  );
}

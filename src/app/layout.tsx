import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Navbar } from './_components/navbar/navbar';
import { homeRoutes } from './_lib/routes';
import Footer from './_components/footer/footer';
import AppContextProvider from './_components/context/context';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Lev Kotman FE portfolio',
  description:
    'Frontend developer portfolio created with Next.JS and Typescript',
  openGraph: {
    title: 'Lev Kotman FE portfolio',
    type: 'website',
    description:
      'Lev Kotman Frontend developer portfolio created with Next.JS and Typescript',
    siteName: 'FE portfolio',
    url: 'http://localhost:3000/', // change to deployed url
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppContextProvider>
          <header className="navbar navbar-header">
            <Navbar routes={homeRoutes} />
          </header>
          {children}
          <footer className="navbar navbar-footer">
            <Footer />
          </footer>
        </AppContextProvider>
      </body>
    </html>
  );
}

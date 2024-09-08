import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import './globals.css';
import { Navbar } from './_components/navbar/navbar';
import { homeRoutes } from './_lib/routes';
import Footer from './_components/footer/footer';
import AppContextProvider from './_components/context/context';
import ReactQueryProvider from './_lib/queryProvider';

const montserrat = Montserrat({ subsets: ['latin'] });

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
    url: 'https://frontend-portfolio-next.vercel.app/',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ReactQueryProvider>
        <body className={montserrat.className}>
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
      </ReactQueryProvider>
    </html>
  );
}

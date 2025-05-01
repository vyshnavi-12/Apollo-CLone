import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Consult General Physicians Online | Internal Medicine Specialists - Apollo 247',
  description: 'Consult with experienced General Physicians and Internal Medicine Specialists online or book an appointment. Get medical advice from top doctors for common illnesses and health conditions.',
  keywords: 'general physician, internal medicine, online consultation, doctor appointment, health consultation, Apollo 247, medical advice',
  openGraph: {
    title: 'Consult General Physicians Online | Internal Medicine Specialists - Apollo 247',
    description: 'Consult with experienced General Physicians and Internal Medicine Specialists online or book an appointment. Get medical advice from top doctors for common illnesses and health conditions.',
    url: 'https://www.apollo247.com/specialties/general-physician-internal-medicine',
    siteName: 'Apollo 247',
    images: [
      {
        url: '/placeholder-doctor.png',
        width: 800,
        height: 600,
        alt: 'General Physicians Online',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Consult General Physicians Online | Internal Medicine Specialists - Apollo 247',
    description: 'Consult with experienced General Physicians and Internal Medicine Specialists online or book an appointment. Get medical advice from top doctors for common illnesses and health conditions.',
    images: ['/placeholder-doctor.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  canonical: 'https://www.apollo247.com/specialties/general-physician-internal-medicine',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-50`}>{children}</body>
    </html>
  );
}
import './globals.css'

export const metadata = {
  metadataBase: new URL('https://appscrip-task-vikas-kumar.vercel.app'),
  title: {
    default: 'Appscrip - Product Listing',
    template: '%s | Appscrip',
  },
  description: 'Shop premium products from Appscrip. Discover quality items with fast shipping and great prices.',
  keywords: ['products', 'shopping', 'online store', 'appscrip'],
  authors: [{ name: 'Vikas Kumar' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://appscrip-task-vikas-kumar.vercel.app',
    siteName: 'Appscrip',
    title: 'Appscrip - Premium Product Store',
    description: 'Shop premium products from Appscrip',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Appscrip - Product Listing',
    description: 'Shop premium products from Appscrip',
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index, follow" />
        <link rel="canonical" href="https://appscrip-task-vikas-kumar.vercel.app" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'Appscrip',
              url: 'https://appscrip-task-vikas-kumar.vercel.app',
              logo: 'https://appscrip-task-vikas-kumar.vercel.app/logo.png',
              sameAs: [
                'https://www.facebook.com/appscrip',
                'https://www.twitter.com/appscrip',
              ],
            }),
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  )
}

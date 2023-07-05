import '@/styles/globals.css'
import { Inter, Roboto } from 'next/font/google'
import Footer from '@/components/ui/footer'
import { Alert } from '@/components/Alert'
import NavBar from '@/components/ui/navbar'
import Provider from '@/components/provider'


// const inter = Inter({
//   subsets: ['latin'],
//   display: 'swap',
// })

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '700'],
})

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={roboto.className}>
      <body>
      <Provider>
      <div className="flex flex-col min-h-screen">
        <NavBar/>
        <main className="flex-1">
          <Alert/>
          {children}
        </main>
        <Footer/>
        </div>
      </Provider>
      </body>
    </html>
  )
}
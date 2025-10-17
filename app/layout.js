import './globals.css'
import ReduxProvider from './components/ReduxProvider'
import  Link from 'next/link'
export const metadata = {
  title: 'E-Commerce Store',
  description: 'Your one-stop shop for all products',
}
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>
          <nav className="navbar">
            <div className="nav-container">
              <h1 className="logo">ShopNex</h1>
              <div className="nav-links">
                <Link href="/">Home</Link>
                <Link href="/about">About</Link>
                <Link href="/cart">Cart</Link>
                <Link href="/feedback">Feedback</Link>
                <Link href="/signin">Sign In</Link>
                <Link href="/signup">Sign Up</Link>
              </div>
            </div>
          </nav>
          <main className="main-content">
            {children}
          </main>
        </ReduxProvider>
      </body>
    </html>
  )
}
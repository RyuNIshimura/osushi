import Header from '@/components/organisms/header'
import Footer from '@/components/organisms/footer'

export default function Layout({ children }) {
  return (
    <>
      <Header />
      <div className="max-w-full min-h-screen">{children}</div>
      <Footer />
    </>
  )
}

import BottomNav from './BottomNav'

export default function MainLayout({ children }) {
  return (
    <div className="app-shell">
      <main className="app-main app-main--with-nav">{children}</main>
      <BottomNav />
    </div>
  )
}

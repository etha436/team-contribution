import { ChevronLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import Logo from './Logo'

export default function AppHeader({ title, subtitle, back = false, action = null }) {
  const navigate = useNavigate()
  return (
    <header className="app-header">
      <div className="app-header__row">
        {back ? (
          <button className="icon-btn" onClick={() => navigate(-1)} aria-label="Go back">
            <ChevronLeft size={22} />
          </button>
        ) : (
          <Logo size={32} />
        )}
        <div className="app-header__titles">
          <h1>{title}</h1>
          {subtitle && <p className="app-header__subtitle">{subtitle}</p>}
        </div>
        <div className="app-header__action">{action}</div>
      </div>
    </header>
  )
}

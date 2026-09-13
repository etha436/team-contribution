import { NavLink } from 'react-router-dom'
import { LayoutGrid, Users, History, Plus } from 'lucide-react'

export default function BottomNav() {
  return (
    <nav className="bottom-nav" aria-label="Primary">
      <NavLink to="/dashboard" className="bottom-nav__item" end>
        <LayoutGrid size={22} strokeWidth={2} />
        <span>Dashboard</span>
      </NavLink>
      <NavLink to="/players" className="bottom-nav__item">
        <Users size={22} strokeWidth={2} />
        <span>Players</span>
      </NavLink>
      <NavLink to="/add" className="bottom-nav__add" aria-label="Add contribution">
        <Plus size={26} strokeWidth={2.5} />
      </NavLink>
      <NavLink to="/history" className="bottom-nav__item">
        <History size={22} strokeWidth={2} />
        <span>History</span>
      </NavLink>
    </nav>
  )
}

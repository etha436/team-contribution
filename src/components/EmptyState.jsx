import { Link } from 'react-router-dom'
import { Plus, ShieldOff } from 'lucide-react'

export default function EmptyState({ title, message, showAction = true, icon: Icon = ShieldOff }) {
  return (
    <div className="empty-state">
      <div className="empty-state__icon">
        <Icon size={28} strokeWidth={1.75} />
      </div>
      <h3>{title}</h3>
      <p>{message}</p>
      {showAction && (
        <Link to="/add" className="btn btn--accent">
          <Plus size={18} strokeWidth={2.25} />
          Add contribution
        </Link>
      )}
    </div>
  )
}

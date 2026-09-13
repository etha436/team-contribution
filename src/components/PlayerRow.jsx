import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import { formatKsh, initials } from '../utils/currency'

export default function PlayerRow({ player }) {
  return (
    <Link to={`/players/${encodeURIComponent(player.playerNameLower)}`} className="player-row">
      <span className="avatar avatar--lg" aria-hidden="true">
        {initials(player.playerName)}
      </span>
      <div className="player-row__body">
        <span className="player-row__name">{player.playerName}</span>
        <span className="player-row__count">
          {player.count} {player.count === 1 ? 'payment' : 'payments'}
        </span>
      </div>
      <div className="player-row__total">
        <span className="player-row__amount">{formatKsh(player.total)}</span>
        <ChevronRight size={18} className="player-row__chevron" />
      </div>
    </Link>
  )
}

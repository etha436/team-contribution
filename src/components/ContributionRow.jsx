import { Link } from 'react-router-dom'
import { Pencil } from 'lucide-react'
import { formatKsh, initials } from '../utils/currency'
import { formatFullDate } from '../utils/date'

export default function ContributionRow({ contribution, showDate = true, onEdit, linkToPlayer = true }) {
  const avatar = (
    <span className="avatar" aria-hidden="true">
      {initials(contribution.playerName)}
    </span>
  )

  return (
    <div className="contribution-row">
      {linkToPlayer ? (
        <Link to={`/players/${encodeURIComponent(contribution.playerNameLower)}`} className="contribution-row__id">
          {avatar}
          <span className="contribution-row__name">{contribution.playerName}</span>
        </Link>
      ) : (
        <span className="contribution-row__id">
          {avatar}
          <span className="contribution-row__name">{contribution.playerName}</span>
        </span>
      )}

      <div className="contribution-row__meta">
        <span className="contribution-row__amount">{formatKsh(contribution.amount)}</span>
        {showDate && <span className="contribution-row__date">{formatFullDate(contribution.paymentDate)}</span>}
      </div>

      {onEdit && (
        <button className="icon-btn icon-btn--ghost" onClick={() => onEdit(contribution)} aria-label={`Edit payment from ${contribution.playerName}`}>
          <Pencil size={17} strokeWidth={2} />
        </button>
      )}
    </div>
  )
}

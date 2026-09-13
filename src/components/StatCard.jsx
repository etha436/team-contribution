export default function StatCard({ label, value, tone = 'blue', icon: Icon, footer }) {
  return (
    <div className={`stat-card stat-card--${tone}`}>
      <div className="stat-card__top">
        <span className="stat-card__label">{label}</span>
        {Icon && (
          <span className="stat-card__icon">
            <Icon size={18} strokeWidth={2} />
          </span>
        )}
      </div>
      <div className="stat-card__value">{value}</div>
      {footer && <div className="stat-card__footer">{footer}</div>}
    </div>
  )
}

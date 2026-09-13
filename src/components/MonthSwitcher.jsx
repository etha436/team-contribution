import { ChevronLeft, ChevronRight } from 'lucide-react'
import { formatMonthKey, shiftMonthKey } from '../utils/date'

export default function MonthSwitcher({ monthKey, onChange }) {
  // Contributions can be recorded for advance payments too, so both
  // directions are open — there's no reason to cap navigation at "today".
  const canGoPrev = true
  const canGoNext = true

  return (
    <div className="month-switcher">
      <button
        className="icon-btn"
        onClick={() => onChange(shiftMonthKey(monthKey, -1))}
        disabled={!canGoPrev}
        aria-label="Previous month"
      >
        <ChevronLeft size={20} />
      </button>
      <span className="month-switcher__label">{formatMonthKey(monthKey)}</span>
      <button
        className="icon-btn"
        onClick={() => onChange(shiftMonthKey(monthKey, 1))}
        disabled={!canGoNext}
        aria-label="Next month"
      >
        <ChevronRight size={20} />
      </button>
    </div>
  )
}

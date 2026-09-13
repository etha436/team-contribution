import { ChevronLeft, ChevronRight } from 'lucide-react'
import { formatMonthKey, shiftMonthKey, currentMonthKey } from '../utils/date'

export default function MonthSwitcher({ monthKey, onChange }) {
  // You can always look further back in history. Going forward stops at
  // the current real-world month — there's never data beyond "today".
  const canGoPrev = true
  const canGoNext = shiftMonthKey(monthKey, 1) <= currentMonthKey()

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

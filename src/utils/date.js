const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
]

/** "2026-09" -> "September 2026" */
export function formatMonthKey(monthKey) {
  const [year, month] = monthKey.split('-').map(Number)
  return `${MONTH_NAMES[month - 1]} ${year}`
}

/** Returns today's date as YYYY-MM-DD, in local time. */
export function todayISODate() {
  const d = new Date()
  const offset = d.getTimezoneOffset()
  const local = new Date(d.getTime() - offset * 60000)
  return local.toISOString().slice(0, 10)
}

export function currentMonthKey() {
  return todayISODate().slice(0, 7)
}

/** "2026-09-13" -> "September 13, 2026" */
export function formatFullDate(dateStr) {
  if (!dateStr) return ''
  const [year, month, day] = dateStr.split('-').map(Number)
  return `${MONTH_NAMES[month - 1]} ${day}, ${year}`
}

/** "2026-09-13" -> "September 13" (no year, used inside a month view) */
export function formatShortDate(dateStr) {
  if (!dateStr) return ''
  const [, month, day] = dateStr.split('-').map(Number)
  return `${MONTH_NAMES[month - 1]} ${day}`
}

/** Adds `delta` months to a monthKey, e.g. ("2026-09", -1) -> "2026-08" */
export function shiftMonthKey(monthKey, delta) {
  const [year, month] = monthKey.split('-').map(Number)
  const d = new Date(year, month - 1 + delta, 1)
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  return `${y}-${m}`
}

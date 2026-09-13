export function formatKsh(amount) {
  const n = Number(amount) || 0
  return `KSh ${n.toLocaleString('en-KE', { maximumFractionDigits: 0 })}`
}

export function initials(name) {
  if (!name) return '?'
  const parts = name.trim().split(/\s+/)
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
}

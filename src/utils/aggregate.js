/**
 * Pure functions that derive totals from a flat list of contribution
 * transactions. Nothing here touches storage — every total is always
 * recomputed from the individual records, never stored separately.
 */

export function filterByMonth(contributions, monthKey) {
  return contributions.filter((c) => c.monthKey === monthKey)
}

export function sumAmounts(contributions) {
  return contributions.reduce((sum, c) => sum + Number(c.amount), 0)
}

export function distinctMonthKeys(contributions) {
  const set = new Set(contributions.map((c) => c.monthKey))
  return Array.from(set).sort().reverse()
}

/**
 * Groups a list of contributions by player, returning an array sorted by
 * total paid (descending) with each player's total and payment count.
 */
export function groupByPlayer(contributions) {
  const map = new Map()
  for (const c of contributions) {
    const key = c.playerNameLower
    if (!map.has(key)) {
      map.set(key, { playerName: c.playerName, total: 0, count: 0, records: [] })
    }
    const entry = map.get(key)
    entry.total += Number(c.amount)
    entry.count += 1
    entry.records.push(c)
    // Keep the most recently-used casing of the name for display
    if (new Date(c.updatedAt) >= new Date(entry.lastUpdatedAt || 0)) {
      entry.playerName = c.playerName
      entry.lastUpdatedAt = c.updatedAt
    }
  }
  return Array.from(map.values()).sort((a, b) => b.total - a.total)
}

export function findPlayerRecords(contributions, playerNameLower) {
  return contributions.filter((c) => c.playerNameLower === playerNameLower)
}

export function searchPlayers(players, query) {
  const q = query.trim().toLowerCase()
  if (!q) return players
  return players.filter((p) => p.playerName.toLowerCase().includes(q))
}

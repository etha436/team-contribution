import { useMemo, useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import { Users } from 'lucide-react'
import AppHeader from '../components/AppHeader'
import SearchBar from '../components/SearchBar'
import PlayerRow from '../components/PlayerRow'
import EmptyState from '../components/EmptyState'
import { groupByPlayer, searchPlayers } from '../utils/aggregate'

const SORT_OPTIONS = [
  { id: 'highest', label: 'Highest total' },
  { id: 'recent', label: 'Most recent payment' },
  { id: 'name', label: 'Name (A–Z)' }
]

export default function Players() {
  const { contributions } = useOutletContext()
  const [query, setQuery] = useState('')
  const [sortBy, setSortBy] = useState('highest')

  const players = useMemo(() => groupByPlayer(contributions), [contributions])

  const sorted = useMemo(() => {
    const list = [...players]
    if (sortBy === 'recent') {
      list.sort((a, b) => {
        const aLatest = a.records.reduce((m, r) => (r.paymentDate > m ? r.paymentDate : m), '')
        const bLatest = b.records.reduce((m, r) => (r.paymentDate > m ? r.paymentDate : m), '')
        return bLatest.localeCompare(aLatest)
      })
    } else if (sortBy === 'name') {
      list.sort((a, b) => a.playerName.localeCompare(b.playerName))
    } else {
      list.sort((a, b) => b.total - a.total)
    }
    return list
  }, [players, sortBy])

  const filtered = useMemo(() => searchPlayers(sorted, query), [sorted, query])

  return (
    <>
      <AppHeader title="Players" subtitle={`${players.length} contributing`} />

      <div className="page-content">
        <SearchBar value={query} onChange={setQuery} placeholder="Search a player" />

        <div className="chip-row">
          {SORT_OPTIONS.map((opt) => (
            <button
              key={opt.id}
              className={`chip ${sortBy === opt.id ? 'chip--active' : ''}`}
              onClick={() => setSortBy(opt.id)}
            >
              {opt.label}
            </button>
          ))}
        </div>

        {players.length === 0 ? (
          <EmptyState
            title="No contributions recorded yet."
            message="Add the first player contribution to get started."
          />
        ) : filtered.length === 0 ? (
          <EmptyState
            icon={Users}
            title="No matching players."
            message="Try a different name, or check the spelling."
            showAction={false}
          />
        ) : (
          <div className="card-list">
            {filtered.map((p) => (
              <PlayerRow key={p.playerName.toLowerCase()} player={p} />
            ))}
          </div>
        )}
      </div>
    </>
  )
}

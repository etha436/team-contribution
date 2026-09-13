import { useMemo, useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { Wallet, Users, Receipt, Plus } from 'lucide-react'
import AppHeader from '../components/AppHeader'
import StatCard from '../components/StatCard'
import ContributionRow from '../components/ContributionRow'
import EmptyState from '../components/EmptyState'
import Modal from '../components/Modal'
import ContributionForm from '../components/ContributionForm'
import { formatMonthKey, currentMonthKey } from '../utils/date'
import { filterByMonth, sumAmounts, groupByPlayer } from '../utils/aggregate'
import { formatKsh } from '../utils/currency'
import { useToast } from '../hooks/useToast'

export default function Dashboard() {
  const { contributions, editContribution, allPlayerNames } = useOutletContext()
  const showToast = useToast()
  const [editing, setEditing] = useState(null)

  const monthKey = currentMonthKey()
  const monthLabel = formatMonthKey(monthKey)

  const monthContributions = useMemo(() => filterByMonth(contributions, monthKey), [contributions, monthKey])
  const totalCollected = useMemo(() => sumAmounts(monthContributions), [monthContributions])
  const playersThisMonth = useMemo(() => groupByPlayer(monthContributions), [monthContributions])
  const totalPlayersEver = useMemo(() => groupByPlayer(contributions).length, [contributions])
  const recent = monthContributions.slice(0, 6)

  async function handleEditSubmit(payload) {
    await editContribution(editing.id, payload)
    setEditing(null)
    showToast('Contribution updated successfully.', {
      detail: `${formatKsh(payload.amount)} from ${payload.playerName}`
    })
  }

  return (
    <>
      <AppHeader title="Team contributions" subtitle={monthLabel} />

      <div className="page-content">
        <div className="stat-grid">
          <StatCard label="Total collected" value={formatKsh(totalCollected)} tone="blue" icon={Wallet} />
          <StatCard label="Players paid" value={playersThisMonth.length} tone="red" icon={Users} />
          <StatCard label="Payments recorded" value={monthContributions.length} tone="neutral" icon={Receipt} />
          {totalPlayersEver > playersThisMonth.length && (
            <StatCard
              label="Squad contributing"
              value={`${playersThisMonth.length} / ${totalPlayersEver}`}
              tone="neutral"
            />
          )}
        </div>

        <Link to="/add" className="btn btn--accent btn--full btn--lg add-contribution-cta">
          <Plus size={20} strokeWidth={2.25} />
          Add contribution
        </Link>

        <section className="section">
          <div className="section__header">
            <h2>Recent contributions</h2>
            {monthContributions.length > 0 && (
              <Link to="/history" className="section__link">View all</Link>
            )}
          </div>

          {recent.length === 0 ? (
            <EmptyState
              title="No contributions recorded for this month."
              message="Add the first player contribution to get started."
            />
          ) : (
            <div className="card-list">
              {recent.map((c) => (
                <ContributionRow key={c.id} contribution={c} onEdit={setEditing} />
              ))}
            </div>
          )}
        </section>
      </div>

      {editing && (
        <Modal title="Edit contribution" onClose={() => setEditing(null)}>
          <ContributionForm
            initial={editing}
            knownPlayers={allPlayerNames}
            submitLabel="Save changes"
            onSubmit={handleEditSubmit}
            onCancel={() => setEditing(null)}
          />
        </Modal>
      )}
    </>
  )
}

import { useMemo, useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import { Wallet, Users, Receipt } from 'lucide-react'
import AppHeader from '../components/AppHeader'
import MonthSwitcher from '../components/MonthSwitcher'
import StatCard from '../components/StatCard'
import ContributionRow from '../components/ContributionRow'
import EmptyState from '../components/EmptyState'
import Modal from '../components/Modal'
import ContributionForm from '../components/ContributionForm'
import { currentMonthKey } from '../utils/date'
import { filterByMonth, sumAmounts, groupByPlayer, distinctMonthKeys } from '../utils/aggregate'
import { formatKsh, initials } from '../utils/currency'
import { useToast } from '../hooks/useToast'

export default function History() {
  const { contributions, editContribution, allPlayerNames } = useOutletContext()
  const showToast = useToast()
  const [monthKey, setMonthKey] = useState(currentMonthKey())
  const [editing, setEditing] = useState(null)

  const availableMonths = useMemo(() => {
    const months = distinctMonthKeys(contributions)
    if (!months.includes(currentMonthKey())) months.unshift(currentMonthKey())
    return months.sort().reverse()
  }, [contributions])

  const monthContributions = useMemo(() => filterByMonth(contributions, monthKey), [contributions, monthKey])
  const total = useMemo(() => sumAmounts(monthContributions), [monthContributions])
  const players = useMemo(() => groupByPlayer(monthContributions), [monthContributions])
  const sortedRecords = useMemo(
    () => [...monthContributions].sort((a, b) => (a.paymentDate < b.paymentDate ? 1 : -1)),
    [monthContributions]
  )

  async function handleEditSubmit(payload) {
    await editContribution(editing.id, payload)
    setEditing(null)
    showToast('Contribution updated successfully.', {
      detail: `${formatKsh(payload.amount)} from ${payload.playerName}`
    })
  }

  return (
    <>
      <AppHeader title="Monthly history" subtitle="Browse past months" />

      <div className="page-content">
        <MonthSwitcher monthKey={monthKey} onChange={setMonthKey} availableMonths={availableMonths} />

        <div className="stat-grid">
          <StatCard label="Total collected" value={formatKsh(total)} tone="blue" icon={Wallet} />
          <StatCard label="Players paid" value={players.length} tone="red" icon={Users} />
          <StatCard label="Payments recorded" value={monthContributions.length} tone="neutral" icon={Receipt} />
        </div>

        {sortedRecords.length === 0 ? (
          <EmptyState
            title="No contributions recorded for this month."
            message="Payments recorded with a date in this month will appear here."
            showAction={monthKey === currentMonthKey()}
          />
        ) : (
          <>
            {players.length > 0 && (
              <section className="section">
                <div className="section__header">
                  <h2>Player totals</h2>
                </div>
                <div className="card-list">
                  {players.map((p) => (
                    <div className="player-total-row" key={p.playerName.toLowerCase()}>
                      <span className="avatar">{initials(p.playerName)}</span>
                      <div className="player-total-row__body">
                        <span className="player-total-row__name">{p.playerName}</span>
                        <span className="player-total-row__count">
                          {p.count} {p.count === 1 ? 'payment' : 'payments'}
                        </span>
                      </div>
                      <span className="player-total-row__amount">{formatKsh(p.total)}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            <section className="section">
              <div className="section__header">
                <h2>Payment records</h2>
              </div>
              <div className="card-list">
                {sortedRecords.map((c) => (
                  <ContributionRow key={c.id} contribution={c} onEdit={setEditing} />
                ))}
              </div>
            </section>
          </>
        )}
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

import { useMemo, useState } from 'react'
import { useOutletContext, useParams, Navigate } from 'react-router-dom'
import AppHeader from '../components/AppHeader'
import StatCard from '../components/StatCard'
import ContributionRow from '../components/ContributionRow'
import Modal from '../components/Modal'
import ContributionForm from '../components/ContributionForm'
import { Wallet, Receipt } from 'lucide-react'
import { findPlayerRecords } from '../utils/aggregate'
import { formatKsh, initials } from '../utils/currency'
import { useToast } from '../hooks/useToast'

export default function PlayerHistory() {
  const { playerNameLower } = useParams()
  const { contributions, editContribution, allPlayerNames } = useOutletContext()
  const showToast = useToast()
  const [editing, setEditing] = useState(null)

  const records = useMemo(
    () => findPlayerRecords(contributions, playerNameLower).sort((a, b) => (a.paymentDate < b.paymentDate ? 1 : -1)),
    [contributions, playerNameLower]
  )

  if (records.length === 0) {
    return <Navigate to="/players" replace />
  }

  const playerName = records[0].playerName
  const total = records.reduce((sum, r) => sum + Number(r.amount), 0)

  async function handleEditSubmit(payload) {
    await editContribution(editing.id, payload)
    setEditing(null)
    showToast('Contribution updated successfully.', {
      detail: `${formatKsh(payload.amount)} from ${payload.playerName}`
    })
  }

  return (
    <>
      <AppHeader
        title={playerName}
        subtitle={`${records.length} ${records.length === 1 ? 'payment' : 'payments'} recorded`}
        back
      />

      <div className="page-content">
        <div className="player-profile">
          <span className="avatar avatar--xl">{initials(playerName)}</span>
        </div>

        <div className="stat-grid stat-grid--two">
          <StatCard label="Total paid" value={formatKsh(total)} tone="blue" icon={Wallet} />
          <StatCard label="Payments" value={records.length} tone="red" icon={Receipt} />
        </div>

        <section className="section">
          <div className="section__header">
            <h2>Payment history</h2>
          </div>
          <div className="card-list">
            {records.map((r) => (
              <ContributionRow key={r.id} contribution={r} onEdit={setEditing} linkToPlayer={false} />
            ))}
          </div>
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

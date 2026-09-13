import { useOutletContext, useNavigate } from 'react-router-dom'
import AppHeader from '../components/AppHeader'
import ContributionForm from '../components/ContributionForm'
import { formatKsh } from '../utils/currency'
import { useToast } from '../hooks/useToast'

export default function AddContribution() {
  const { addContribution, allPlayerNames } = useOutletContext()
  const navigate = useNavigate()
  const showToast = useToast()

  async function handleSubmit(payload) {
    await addContribution(payload)
    showToast('Contribution recorded successfully.', {
      detail: `${formatKsh(payload.amount)} from ${payload.playerName}`
    })
    navigate('/dashboard')
  }

  return (
    <>
      <AppHeader title="Add contribution" subtitle="Record a player’s payment" back />
      <div className="page-content">
        <ContributionForm
          knownPlayers={allPlayerNames}
          submitLabel="Save contribution"
          onSubmit={handleSubmit}
          onCancel={() => navigate(-1)}
        />
      </div>
    </>
  )
}

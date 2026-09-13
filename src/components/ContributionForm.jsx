import { useState } from 'react'
import { todayISODate } from '../utils/date'

export default function ContributionForm({ initial, knownPlayers = [], onSubmit, onCancel, submitLabel }) {
  const [playerName, setPlayerName] = useState(initial?.playerName || '')
  const [amount, setAmount] = useState(initial?.amount ? String(initial.amount) : '')
  const [paymentDate, setPaymentDate] = useState(initial?.paymentDate || todayISODate())
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)

  function validate() {
    const next = {}
    if (!playerName.trim()) next.playerName = 'Enter the player\u2019s name.'
    const numericAmount = Number(amount)
    if (!amount || Number.isNaN(numericAmount) || numericAmount <= 0) {
      next.amount = 'Enter an amount greater than zero.'
    }
    if (!paymentDate) next.paymentDate = 'Choose a payment date.'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!validate()) return
    setSubmitting(true)
    try {
      await onSubmit({ playerName: playerName.trim(), amount: Number(amount), paymentDate })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form className="contribution-form" onSubmit={handleSubmit} noValidate>
      <div className="field">
        <label htmlFor="playerName">Player name</label>
        <input
          id="playerName"
          type="text"
          list="known-players"
          placeholder="Enter player name"
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
          autoComplete="off"
          className={errors.playerName ? 'has-error' : ''}
        />
        <datalist id="known-players">
          {knownPlayers.map((name) => (
            <option key={name} value={name} />
          ))}
        </datalist>
        {errors.playerName && <span className="field__error">{errors.playerName}</span>}
      </div>

      <div className="field">
        <label htmlFor="amount">Amount (KSh)</label>
        <input
          id="amount"
          type="number"
          inputMode="decimal"
          min="1"
          step="1"
          placeholder="e.g. 500"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className={errors.amount ? 'has-error' : ''}
        />
        {errors.amount && <span className="field__error">{errors.amount}</span>}
      </div>

      <div className="field">
        <label htmlFor="paymentDate">Payment date</label>
        <input
          id="paymentDate"
          type="date"
          value={paymentDate}
          onChange={(e) => setPaymentDate(e.target.value)}
          className={errors.paymentDate ? 'has-error' : ''}
        />
        <span className="field__hint">Pick a future date to record an advance payment.</span>
        {errors.paymentDate && <span className="field__error">{errors.paymentDate}</span>}
      </div>

      <div className="contribution-form__actions">
        {onCancel && (
          <button type="button" className="btn btn--ghost" onClick={onCancel}>
            Cancel
          </button>
        )}
        <button type="submit" className="btn btn--primary" disabled={submitting}>
          {submitting ? 'Saving…' : submitLabel}
        </button>
      </div>
    </form>
  )
}

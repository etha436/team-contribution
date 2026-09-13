import { useCallback, useEffect, useState } from 'react'
import {
  addContribution as dbAddContribution,
  updateContribution as dbUpdateContribution,
  getAllContributions
} from '../services/database'

/**
 * Single source of truth for contribution data in the app.
 * Loads from IndexedDB on mount, and every mutation goes through here so
 * the in-memory list and the database never drift apart.
 */
export function useContributions() {
  const [contributions, setContributions] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const reload = useCallback(async () => {
    try {
      const all = await getAllContributions()
      setContributions(all)
      setError(null)
    } catch (err) {
      console.error(err)
      setError('Could not load contributions from this device.')
    }
  }, [])

  useEffect(() => {
    let mounted = true
    ;(async () => {
      setLoading(true)
      await reload()
      if (mounted) setLoading(false)
    })()
    return () => {
      mounted = false
    }
  }, [reload])

  const addContribution = useCallback(async (payload) => {
    const record = await dbAddContribution(payload)
    await reload()
    return record
  }, [reload])

  const editContribution = useCallback(async (id, payload) => {
    const record = await dbUpdateContribution(id, payload)
    await reload()
    return record
  }, [reload])

  return { contributions, loading, error, addContribution, editContribution, reload }
}

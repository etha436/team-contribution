import { openDB } from 'idb'

const DB_NAME = 'team-contributions-db'
const DB_VERSION = 1
const STORE = 'contributions'

let dbPromise = null

/**
 * Lazily opens (and upgrades) the IndexedDB database.
 * Kept isolated here so no other module talks to IndexedDB directly.
 */
function getDB() {
  if (!dbPromise) {
    dbPromise = openDB(DB_NAME, DB_VERSION, {
      upgrade(db) {
        if (!db.objectStoreNames.contains(STORE)) {
          const store = db.createObjectStore(STORE, { keyPath: 'id' })
          store.createIndex('by-paymentDate', 'paymentDate')
          store.createIndex('by-playerNameLower', 'playerNameLower')
          store.createIndex('by-monthKey', 'monthKey')
        }
      }
    })
  }
  return dbPromise
}

function generateId() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID()
  }
  return `c_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`
}

/** monthKey is derived strictly from paymentDate, e.g. "2026-09" */
export function monthKeyFromDate(dateStr) {
  return dateStr.slice(0, 7)
}

/**
 * Fetch every contribution in the database, sorted newest payment date first.
 */
export async function getAllContributions() {
  const db = await getDB()
  const all = await db.getAll(STORE)
  return all.sort((a, b) => {
    if (a.paymentDate !== b.paymentDate) return a.paymentDate < b.paymentDate ? 1 : -1
    return new Date(b.createdAt) - new Date(a.createdAt)
  })
}

/**
 * Create a brand-new contribution record. Never overwrites an existing one.
 */
export async function addContribution({ playerName, amount, paymentDate }) {
  const db = await getDB()
  const now = new Date().toISOString()
  const record = {
    id: generateId(),
    playerName: playerName.trim(),
    playerNameLower: playerName.trim().toLowerCase(),
    amount: Number(amount),
    paymentDate,
    monthKey: monthKeyFromDate(paymentDate),
    createdAt: now,
    updatedAt: now
  }
  await db.add(STORE, record)
  return record
}

/**
 * Edit an existing contribution in place. The id never changes, so this is
 * always an update to one specific transaction — never a delete + recreate.
 */
export async function updateContribution(id, { playerName, amount, paymentDate }) {
  const db = await getDB()
  const existing = await db.get(STORE, id)
  if (!existing) throw new Error('Contribution not found')

  const updated = {
    ...existing,
    playerName: playerName.trim(),
    playerNameLower: playerName.trim().toLowerCase(),
    amount: Number(amount),
    paymentDate,
    monthKey: monthKeyFromDate(paymentDate),
    updatedAt: new Date().toISOString()
  }
  await db.put(STORE, updated)
  return updated
}

export async function getContributionById(id) {
  const db = await getDB()
  return db.get(STORE, id)
}

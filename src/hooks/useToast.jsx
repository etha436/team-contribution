import { createContext, useCallback, useContext, useRef, useState } from 'react'
import { CircleCheck, CircleAlert } from 'lucide-react'

const ToastContext = createContext(null)

export function ToastProvider({ children }) {
  const [toast, setToast] = useState(null)
  const timerRef = useRef(null)

  const showToast = useCallback((message, { tone = 'success', detail } = {}) => {
    if (timerRef.current) clearTimeout(timerRef.current)
    setToast({ message, detail, tone, key: Date.now() })
    timerRef.current = setTimeout(() => setToast(null), 3200)
  }, [])

  return (
    <ToastContext.Provider value={showToast}>
      {children}
      <div className="toast-host" aria-live="polite">
        {toast && (
          <div className={`toast toast--${toast.tone}`} key={toast.key}>
            <span className="toast__icon">
              {toast.tone === 'error' ? <CircleAlert size={20} /> : <CircleCheck size={20} />}
            </span>
            <span className="toast__text">
              <strong>{toast.message}</strong>
              {toast.detail && <span className="toast__detail">{toast.detail}</span>}
            </span>
          </div>
        )}
      </div>
    </ToastContext.Provider>
  )
}

export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used within ToastProvider')
  return ctx
}

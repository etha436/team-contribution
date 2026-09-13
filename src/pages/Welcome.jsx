import { useNavigate } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import Logo from '../components/Logo'

export default function Welcome() {
  const navigate = useNavigate()

  function handleGetStarted() {
    localStorage.setItem('tc_onboarded', '1')
    navigate('/dashboard', { replace: true })
  }

  return (
    <div className="welcome-screen">
      <div className="welcome-screen__content">
        <div className="welcome-screen__logo">
          <Logo size={88} />
        </div>
        <h1 className="welcome-screen__title">
          Manage your team&rsquo;s monthly contributions with ease.
        </h1>
        <p className="welcome-screen__subtitle">
          Record player contributions, track monthly totals, and keep your team&rsquo;s
          payment history organized.
        </p>
        <button className="btn btn--primary btn--full btn--lg" onClick={handleGetStarted}>
          Get started
          <ArrowRight size={19} strokeWidth={2.25} />
        </button>
      </div>
    </div>
  )
}

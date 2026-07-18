import { Wallet } from 'lucide-react'
import './Header.css'

export function Header({totalExpense}) {
  return (
    <div className="header">
        <h1><Wallet size={32} color="#10b981" /> SmartSpend</h1>
        <div className='header-right-side'>
          <p className='month'>This Month</p>
          <p className='total-expense'>₹{totalExpense.toLocaleString()}</p>
        </div>
    </div>
  )
}
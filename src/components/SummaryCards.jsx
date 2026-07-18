import { useState } from "react"
import './SummaryCards.css'
export function SummaryCards({totalIncome,totalExpense,savings}) {
     
  return (
    <div className="cards">
      <div className="card">
        <p>Total Income</p>
        <h2 className="green">₹{totalIncome.toLocaleString()}</h2>
      </div>
      <div className="card">
        <p>Total Expense</p>
        <h2 className="red">₹{totalExpense.toLocaleString()}</h2>
      </div>
      <div className="card">
        <p>Savings</p>
        <h2 className="blue">₹{savings.toLocaleString()}</h2>
      </div>
      </div>
  )
}
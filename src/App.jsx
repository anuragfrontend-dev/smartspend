import { useState,useEffect } from 'react'
import { Header } from './components/Header'
import { SummaryCards } from './components/SummaryCards'
import { AddTransaction } from './components/AddTransaction'
import { ExpenseChart } from './components/ExpenseChart'
import './App.css'


function App() {
  const [transactions,setTransactions]=useState(JSON.parse(localStorage.getItem('transactions'))||[]);

  const totalIncome=transactions
    .filter(t=>t.transactionStatus=='income')
    .reduce((sum,t)=>sum+Number(t.amount),0);

  const totalExpense=transactions
    .filter(t=>t.transactionStatus=='expense')
    .reduce((sum,t)=>sum+Number(t.amount),0);
  
  const savings=totalIncome-totalExpense;

 useEffect(()=>{
  localStorage.setItem('transactions',JSON.stringify(transactions));
 },[transactions])
  return (
    <div className="container">

      <Header totalExpense={totalExpense} />

      <SummaryCards 
        totalIncome={totalIncome}
        totalExpense={totalExpense}
        savings={savings}
      />


      <div className="grid-2">
        
        <AddTransaction 
          transactions={transactions}
          setTransactions={setTransactions} 
        />
        
        <ExpenseChart 
          totalIncome={totalIncome}
          totalExpense={totalExpense}
          savings={savings}
        />
        
      </div>

    </div>
  )
}
export default App
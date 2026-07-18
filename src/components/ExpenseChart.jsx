import { Pie,PieChart,Cell,ResponsiveContainer, Tooltip,Legend} from "recharts"
import './ExpenseChart.css'
import { Save } from "lucide-react"
export function ExpenseChart({totalIncome,totalExpense,savings}){
  
  const expensePercent= totalIncome>0? (totalExpense/totalIncome)*100:0;
  const savingsPercent= totalIncome>0? (savings/totalIncome)*100:0;

  const transactions=[
    {name:'Income',value:totalIncome},
    ...(totalExpense>0?[{name:'Expense',value:totalExpense}]:[]),
    ...(savings>0?[{name:'Savings',value:savings}]:[])
  ]
  const colors=['#22c55e','#ef4444','#3b82f6']
  const colorMap={
    Income:'#22c55e',
    Expense:'#ef4444',
    Savings:'#3b82f6'
  }
  
  return(
    <div className="box">
      <h1>Expense Chart</h1>
      <ResponsiveContainer width='100%' height={250}> 
          <PieChart>
            <Pie
             data={transactions}
             cx='50%'
             cy='50%'
             dataKey='value'
             nameKey='name'
             label={({ name,value }) => {
                if(name==='Expense'&&expensePercent===0)return null;
                if(name==='Savings'&& savingsPercent===0) return(null);
                if(name==='Expense') return `Expense:${expensePercent.toFixed(0)}%`
                if(name==='Savings') return `Savings:${savingsPercent.toFixed(0)}%`
                return `Income:₹${value.toLocaleString()}`
             }}
             outerRadius={80}
             >
             {transactions.map((item, i) => (
              <Cell key={`cell-${item.name}`} fill={colorMap[item.name]} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => `₹${value.toLocaleString()}`} />
            <Legend />
          </PieChart>
      </ResponsiveContainer>
    </div>
  )
}


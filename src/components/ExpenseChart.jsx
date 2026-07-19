import { Pie,PieChart,Cell,ResponsiveContainer, Tooltip,Legend} from "recharts"
import './ExpenseChart.css'
import { Save } from "lucide-react"
export function ExpenseChart({totalIncome,totalExpense,savings}){
  const expensePercent= totalIncome>0? (totalExpense/totalIncome)*100:0;
  const savingsPercent= totalIncome>0? (savings/totalIncome)*100:0;

  const transactions=[
    ...(totalExpense>0?[{name:'Expense',value:totalExpense}]:[]),
    ...(savings>0?[{name:'Savings',value:savings}]:[])
  ]
  const colorMap={
    Expense:'#ef4444',
    Savings:'#3b82f6'
  }

  const getChartSize=()=>{
    const width=window.innerWidth;
    if(width<500) return {radius:70,fontSize:10,length:5}
    if(width<950) return {radius:80,fontSize:11,length:5}
    return {radius:90,fontSize:16,length:10}
  }
  const chartSize=getChartSize();
  
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
                const isMobile=window.innerWidth<950;
                if(name==='Expense'&&expensePercent===0)return null;
                if(name==='Savings'&& savingsPercent===0) return(null); 
                if(name==='Expense') return isMobile? `${expensePercent.toFixed(0)}%`:`Expense:${expensePercent.toFixed(0)}%`
                if(name==='Savings') return isMobile? `${savingsPercent.toFixed(0)}%`:`Savings:${savingsPercent.toFixed(0)}%`
             }}
             outerRadius={chartSize.radius}
             labelLine={true}
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


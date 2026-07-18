import { useState,useRef, useEffect } from 'react'
import './AddTransaction.css'

export function AddTransaction({transactions,setTransactions}){
  
  const[title,setTitle]=useState('');
  const[amount,setAmount]=useState('');
  const[transactionStatus,setTransactionStatus]=useState('expense');
  const bottomRef=useRef(null);

  const handleKeys=(event)=>{
    if(event.key==='Enter'){
      addTransaction();
    }
    else if(event.key==='Escape'){
      setTitle('');
      setAmount('');
    }
  }
  
  useEffect(()=>{
    bottomRef.current?.scrollIntoView({behavior:'smooth'});
  },[transactions]);
  
  const handleAmount=(event)=>{
    setAmount(event.target.value);
  }
  
  const handleTitle=(event)=>{
    setTitle(event.target.value);
  }

  const handleSelector=(event)=>{
    setTransactionStatus(event.target.value);
  }

  function addTransaction(){
    if (!title ||!amount) return;

    const newTransactions={
        id:crypto.randomUUID(),
        title:title,
        amount:Number(amount.toLocaleString()),
        transactionStatus:transactionStatus
    }

    setTransactions([...transactions,newTransactions])
    setAmount('')
    setTitle('')
  }

  const handleDelete=(id)=>{
    setTransactions(transactions.filter((t)=>(t.id!==id)));
  }

  return(
    <div className="box">
      <h3>Add Transaction</h3>
      <div className='transaction-form'>
        <input 
          type="text" 
          name="title" 
          placeholder="Transaction Name" 
          className='transaction-Input' 
          onChange={handleTitle}
          value={title}
        />
        <input 
          type="number" 
          name="amount" 
          placeholder="Amount ₹" 
          className='amount-Input' 
          onChange={handleAmount}
          value={amount}
          onKeyDown={handleKeys}
        />
        <select name="type" className='transaction-selector' onChange={handleSelector} value={transactionStatus} >
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select>
        <button className='add-button' onClick={addTransaction}> + Add </button>
      </div>
      <div className='transaction-list'>
        {transactions.map((txt)=>(
          <div  className='transaction-item'
            data-type={txt.transactionStatus}
            key={txt.id}>
            <span>{txt.title}</span>
            <span className='transaction-amount' data-type={txt.transactionStatus}>
              ₹{txt.amount.toLocaleString()}
            </span>
            <span>{txt.transactionStatus.charAt(0).toUpperCase()+txt.transactionStatus.slice(1)}</span>
            <button onClick={()=>handleDelete(txt.id)}>X</button>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>
    </div>
  )
}
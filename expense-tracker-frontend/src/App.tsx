import { useState } from 'react'
// import heroImg from './assets/hero.png'
// import reactLogo from './assets/react.svg'
// import viteLogo from './assets/vite.svg'
import './App.css'
import ExpenseForm from './components/form';
import {useMutation, useQuery} from "@apollo/client/react";
import { gql } from '@apollo/client';
import { Button, Pagination } from 'antd';
import { CalendarFilled, EyeInvisibleOutlined } from '@ant-design/icons';
import ExpenseSummary from './components/ExpenseSummary';
import { Calendar, Car, Eye, Film, Handbag, HeartPulse, Lightbulb, ShoppingBag, Trash, UtensilsCrossed } from 'lucide-react';

const GET_EXPENSES = gql`
  query GetExpenses {
    expenses {
      id
      description
      category
      amount
      date
    }
  }
`;

const ADD_EXPENSE = gql`
  mutation AddExpense($description: String!, $category: String!, $amount: Float!, $date: String!) {
    addExpense(description: $description, category: $category, amount: $amount, date: $date) {
      id
      description
      category
      amount
      date
    }
  }
`;

const DELETE_EXPENSE=gql`
mutation DeleteExpense($id:ID!)
{
  deleteExpense(id:$id)
}
`;





const App=()=> {



  type History={
      description: String,
      category: String,
      amount: number,
      date: String,
      event_type: String,
      event_time:string;
  }

  const categoryIcons:Record<string, React.ReactNode> = {
    "Food":<UtensilsCrossed color="white" />,
    "Transport":<Car/>,
    "Entertainment":<Film/>,
    "Shopping":<ShoppingBag/>,
    "Bills":<Lightbulb/>,
  };

  const getCategoryIcon=(category:string)=>{
    return categoryIcons[category];
  }

  const categoryColors:Record<string, string> = {
    "Food":"bg-[#55A9A0]",
    "Transport":"bg-[#DCCFC0]",
    "Entertainment":"bg-[#FFC5AA]",
    "Shopping":"bg-[#90CAF9]",
    "Bills":"bg-[#FFC0DE]",
  };

  const getCategoryColor=(category:string)=>{
    return categoryColors[category];
  }
  const[addForm,setaddForm]=useState(false);
  const[showHistory,setshowHistory]=useState(true);
  const[history,setHistory]=useState<History[]>([]);

  const[selectedExpenseId,setselectedExpenseId]=useState<number|null>(null);

  const pageSize=2;
  const[currentPage,setCurrentPage]=useState(1);

  
  const { loading, error, data,refetch } = useQuery(GET_EXPENSES);
  const [addExpense] = useMutation(ADD_EXPENSE,{
    onCompleted: () => {
      refetch();
      setaddForm(false);
    }

  });

  const[deleteExpense]=useMutation(DELETE_EXPENSE,{
    onCompleted:()=>{
      refetch();
      setaddForm(false);
    }
  })

  console.log(selectedExpenseId);
 
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const expenses_data: Expenses[] = data.expenses;
  console.log(data.expenses);

  const handleAddExpense=()=>
  {
    setaddForm(true);
  }

  const start_index=(currentPage-1)*pageSize;
  const end_index=start_index+pageSize;
  const paginated_expenses=expenses_data.slice(start_index,end_index);

  const formatEventTime = (eventTime: string) => {
    console.log("eventTime:", eventTime);
  console.log("Date object:", new Date(eventTime));
    return new Date(eventTime).toLocaleString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
    });
};

  const getExpenseHistory=async(id:number)=>
  {
    setselectedExpenseId(id);
    const response=await fetch(`http://localhost:8080/api/expenses/${id}/history`);
    const historyData=await response.json();
    setHistory(historyData);
    setshowHistory(true);
    console.log("API Resposne", historyData);
  };

  const handleHideHistory=()=>
  {
    setshowHistory(false);
  }

  let total_amount=0;
  for(const e of expenses_data)
  {
      total_amount=total_amount+e.amount
  }
  
  let no_of_expenses=expenses_data.length;
  console.log(no_of_expenses)
  
  return (
    // Header Section 
    <div className="min-h-screen bg-[#D1EDD3] p-4 ">
      
      <div className="container mx-auto bg-white rounded-lg shadow-lg p-1">
    <div className='flex flex-cols items-center text-3xl font-bold rounded-t-lg p-4 sm:p-5 bg-[#5C7057] text-white gap-3'>
      <div><Handbag className='shrink-0 sm:hidden' size={40}/></div>
      <div><Handbag className='hidden shrink-0 sm:block' size={40}/></div>
      <div className="text-xl font-bold sm:text-3xl">Expense Tracker</div>
    </div>

      {/* Header 2 */}
      <div className="gap-50 m-4">
        <div className="">
          <h1 className='text-4xl sm:text-5xl font-bold'>Expenses</h1>
          <p className='text-sm text-gray-700 font-medium mt-4 sm:mt-4'>Track your expenses and stay in control</p>
        </div>
        <div>
          {/* Add Expense Button */}
          {!addForm && <button className="bg-[#5C7057] text-white px-4 py-2 rounded-lg hover:bg-[#4a5b45] mt-4 sm:mt-4"
        onClick={handleAddExpense}>Add Expense</button>}
        </div>
      </div>
      {/* Expense Summary */}
      <ExpenseSummary total_amount={total_amount} no_of_expenses={no_of_expenses} />

      {/* Expense List */}
      
<div className="relative m-5 mx-3 sm:mx-4 flex min-w-0 flex-col gap-4">
  {!addForm &&
    paginated_expenses.map((x) => (
      <div
        className="flex min-w-0 flex-col gap-3 rounded-lg border border-gray-300 bg-white p-3 sm:p-4"
        key={x.id}
      >
        
        <div className="flex min-w-0 flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

          
          <div className="flex min-w-0 flex-1 items-start gap-3">
            <div
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${getCategoryColor(x.category)}`}
            >
              {getCategoryIcon(x.category)}
            </div>

            <div className="grid min-w-0 flex-1 grid-cols-1 gap-1 sm:grid-cols-3 sm:items-center sm:gap-4">
              <p className="min-w-0 break-words font-medium">
                {x.description}
              </p>

              <p className="font-bold whitespace-nowrap">
                £{x.amount}
              </p>

              <p className="break-words text-sm sm:text-base">
                {x.date}
              </p>
            </div>
          </div>

          
          <div className="flex shrink-0 items-center justify-end gap-2">
            <button
              aria-label="Delete expense"
              className="rounded-lg p-2 text-[#fc8284] hover:bg-red-50"
              onClick={() => {
                const confirmed = window.confirm(
                  "Are you sure you want to delete this expense?"
                );

                if (confirmed) {
                  deleteExpense({
                    variables: {
                      id: x.id
                    }
                  });
                }
              }}
            >
              <Trash size={24} />
            </button>

            <button
              aria-label="View expense history"
              className="rounded-lg p-2 text-[#5C7057] hover:bg-green-50"
              onClick={() => getExpenseHistory(x.id)}
            >
              <Eye size={24} />
            </button>
          </div>
        </div>

        {/* Expense history */}
        {showHistory && selectedExpenseId == x.id && (
          <div className="min-w-0 border-t border-gray-200 pt-3">
            {history.map((h, index) => (
              <div
                key={index}
                className="mb-3 min-w-0"
              >
                <p className="inline-block max-w-full break-words rounded-lg bg-red-500 p-3 text-sm text-white">
                  {h.event_type}
                </p>

                <p className="mt-3 flex min-w-0 items-start gap-2 break-words text-sm text-gray-700">
                  <Calendar size={20} className="shrink-0" />
                  <span className="min-w-0 break-words">
                    {formatEventTime(h.event_time)}
                  </span>
                </p>

                <button
                  aria-label="Hide expense history"
                  className="mt-2 rounded-lg p-2 text-gray-600 hover:bg-gray-100"
                  onClick={handleHideHistory}
                >
                  <EyeInvisibleOutlined />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    ))}
</div>
      {addForm && <ExpenseForm addExpense={addExpense}/>
      }
      </div><br/>
      {/* <Pagination align="start" defaultCurrent={1} total={2} /> */}
      {!addForm && (
        <Pagination className="flex center justify-center" 
          current={currentPage}
          pageSize={pageSize}
          total={expenses_data.length}
          onChange={(page) => setCurrentPage(page)}
        />
      )}
      

    </div>
  );
}

export default App

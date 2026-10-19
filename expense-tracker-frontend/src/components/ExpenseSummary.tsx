
import React from 'react';

type ExpenseSummaryProps = {
    total_amount: number,
    no_of_expenses: number
}

const ExpenseSummary = ({
    total_amount,
    no_of_expenses
}: ExpenseSummaryProps) => {
  return (
    <div className="w-full min-w-0">
      <p className="text-xl font-bold m-3 sm:m-4">
        Expense Summary
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 px-3 sm:px-4 min-w-0">
        <div className="box-border min-w-0 w-full p-4 border border-green-300 rounded-lg shadow-md bg-[#f0faf6]">
          <h4 className="text-xs text-gray-700 font-semibold">
            Total Expenses:
          </h4>
          <p className="text-2xl sm:text-3xl lg:text-4xl font-bold break-words">
            £{total_amount.toFixed(2)}
          </p>
        </div>

        <div className="box-border min-w-0 w-full p-4 border border-blue-300 rounded-lg shadow-md bg-[#edf6fe]">
          <h4 className="text-xs text-gray-700 font-semibold">
            Number of Expenses:
          </h4>
          <p className="text-2xl sm:text-3xl lg:text-4xl font-bold break-words">
            {no_of_expenses}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ExpenseSummary;

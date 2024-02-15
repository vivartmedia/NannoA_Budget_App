// Export a function that updates the expense list in the DOM based on the current expenses array.
export const updateExpenseList = (expenses, deleteExpenseCallback) => {
    // Reference to the container where expenses will be displayed.
    const calculationsDiv = document.getElementById('calculations');
    calculationsDiv.innerHTML = ''; // Clear the container for a fresh start.

    // Iterate over each expense to create and append their respective DOM elements.
    expenses.forEach(expense => {
        // Create a container for each expense entry.
        const expenseEntry = document.createElement('div');
        expenseEntry.className = 'flex justify-between items-center p-2 mb-2 rounded-md text-slate-400 bg-slate-800 rounded-sm mx-14 ';

        // Container for holding the expense name and amount, ensuring they are spaced out.
        const expenseInfo = document.createElement('div');
        expenseInfo.className = 'flex justify-between w-full';

        // Create and append the name element for the expense.
        const expenseName = document.createElement('span');
        expenseName.textContent = `${expense.name}: `;
        expenseName.className = 'text-gray-200';

        // Create and append the amount element, displaying it as a negative value.
        const expenseAmount = document.createElement('span');
        expenseAmount.textContent = `-${expense.amount.toFixed(2)}`;
        expenseAmount.className = 'ml-6 text-gray-200';

        // Append the name and amount to the expense information container.
        expenseInfo.appendChild(expenseName);
        expenseInfo.appendChild(expenseAmount);

        // Create a delete button for removing the expense, with an attached event handler.
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'X';
        deleteBtn.className = 'bg-red-500 hover:bg-red-700 text-white font-bold ml-1 py-1 px-2 rounded';
        deleteBtn.onclick = () => { deleteExpenseCallback(expense.id) };

        // Append the expense information and delete button to the main expense entry container.
        expenseEntry.appendChild(expenseInfo);
        expenseEntry.appendChild(deleteBtn);
        // Finally, append the complete expense entry to the calculations container.
        calculationsDiv.appendChild(expenseEntry);
    });
};

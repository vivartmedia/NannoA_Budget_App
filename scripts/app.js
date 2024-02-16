// Import the function to update the expense list from another module.
import { updateExpenseList } from './expenseList.js';
import { adjustTextSizeForBudget, formatNumber } from './adjustTxtSize.js';
import { applyTranslations, getTranslationKeys } from './translate.js';

// Once the DOM is fully loaded, execute the following code.
document.addEventListener('DOMContentLoaded', () => {
    applyTranslations();
    // Initialize budget and expenses data, attempting to load from localStorage if available.
    let originalBudget = JSON.parse(localStorage.getItem('originalBudget')) || 0;
    let remainingBudget = JSON.parse(localStorage.getItem('remainingBudget')) || 0;
    let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    // Determine the next expense ID based on the highest current ID, ensuring uniqueness.
    let expenseId = expenses.length > 0 ? Math.max(...expenses.map(expense => expense.id)) + 1 : 0;

    // Function to save the current state to localStorage, ensuring data persistence.
    const saveData = () => {
        localStorage.setItem('originalBudget', JSON.stringify(originalBudget));
        localStorage.setItem('remainingBudget', JSON.stringify(remainingBudget));
        localStorage.setItem('expenses', JSON.stringify(expenses));
    };

    // Update the display of budget and remaining budget on the webpage.
    const updateBudgetDisplay = () => {
        document.getElementById('remainingBudget').textContent = formatNumber(remainingBudget.toFixed(2));
        adjustTextSizeForBudget();
        document.getElementById('originalBudget').textContent = formatNumber(originalBudget.toFixed(2));
    };

    // Add a new expense, update the budget and expenses list, then save the updated data.
    const addExpenseToList = (name, amount) => {
        const newExpense = { id: expenseId++, name, amount };
        expenses.push(newExpense);
        remainingBudget -= amount;
        updateBudgetDisplay();
        updateAndSaveExpenses();
    };

    // Delete an expense by its ID, recalculate the remaining budget, update the display, and save.
    const deleteExpense = (id) => {
        expenses = expenses.filter(expense => expense.id !== id);
        remainingBudget = originalBudget - expenses.reduce((acc, expense) => acc + expense.amount, 0);
        updateBudgetDisplay();
        updateAndSaveExpenses();
    };

    // A helper function to update the expense list display and save the current state.
    const updateAndSaveExpenses = () => {
        updateExpenseList(expenses, deleteExpense);
        saveData();
    };

    // Event listeners for updating the budget and adding expenses, including input validation.
    document.getElementById('updateBudget').addEventListener('click', () => {
        const keys = getTranslationKeys(); 

        const userInput = prompt(keys.enterTotalBudget);
        const budget = parseFloat(userInput);
        if (!isNaN(budget) && budget >= 0) {
            originalBudget = budget;
            remainingBudget = budget;
            updateBudgetDisplay();
            updateAndSaveExpenses();
        } else {
            alert(keys.invalidNumber);
        }
    });

    document.getElementById('addExpense').addEventListener('click', () => {
        const keys = getTranslationKeys(); // Retrieve the appropriate translations

        const expenseName = prompt(keys.enterExpenseName); // Use the translated string
        const expenseAmountInput = prompt(keys.enterExpenseAmount); // Use the translated string
        const expenseAmount = parseFloat(expenseAmountInput);

        if (!isNaN(expenseAmount) && expenseAmount > 0) {
            addExpenseToList(expenseName, expenseAmount);
        } else {
            alert(keys.invalidExpenseAmount); // Use the translated string for the alert
        }
    });


    // Initialize the display with the loaded or default data.
    updateBudgetDisplay();
    updateAndSaveExpenses(); // This primarily updates the list display.
});

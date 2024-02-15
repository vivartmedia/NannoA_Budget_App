import { updateExpenseList } from './expenseList.js';

document.addEventListener('DOMContentLoaded', () => {
    let originalBudget = JSON.parse(localStorage.getItem('originalBudget')) || 0;
    let remainingBudget = JSON.parse(localStorage.getItem('remainingBudget')) || 0;
    let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    let expenseId = expenses.length > 0 ? Math.max(...expenses.map(expense => expense.id)) + 1 : 0;

    const saveData = () => {
        localStorage.setItem('originalBudget', JSON.stringify(originalBudget));
        localStorage.setItem('remainingBudget', JSON.stringify(remainingBudget));
        localStorage.setItem('expenses', JSON.stringify(expenses));
    };

    const updateBudgetDisplay = () => {
        document.getElementById('remainingBudget').textContent = remainingBudget.toFixed(2);
        document.getElementById('originalBudget').textContent = originalBudget.toFixed(2);
    };

    const addExpenseToList = (name, amount) => {
        const newExpense = { id: expenseId++, name, amount };
        expenses.push(newExpense);
        remainingBudget -= amount;
        updateBudgetDisplay();
        updateAndSaveExpenses();
    };

    const deleteExpense = (id) => {
        expenses = expenses.filter(expense => expense.id !== id);
        remainingBudget = originalBudget - expenses.reduce((acc, expense) => acc + expense.amount, 0);
        updateBudgetDisplay();
        updateAndSaveExpenses();
    };

    const updateAndSaveExpenses = () => {
        updateExpenseList(expenses, deleteExpense);
        saveData();
    };

    document.getElementById('updateBudget').addEventListener('click', () => {
        const userInput = prompt("Please enter your total budget:");
        const budget = parseFloat(userInput);
        if (!isNaN(budget) && budget >= 0) {
            originalBudget = budget;
            remainingBudget = budget;
            updateBudgetDisplay();
            updateAndSaveExpenses();
        } else {
            alert("Please enter a valid number.");
        }
    });

    document.getElementById('addExpense').addEventListener('click', () => {
        const expenseName = prompt("What is the expense for?");
        const expenseAmountInput = prompt("How much is the expense?");
        const expenseAmount = parseFloat(expenseAmountInput);
        if (!isNaN(expenseAmount) && expenseAmount > 0) {
            addExpenseToList(expenseName, expenseAmount);
        } else {
            alert("Please enter a valid expense amount.");
        }
    });

    // Load initial data
    updateBudgetDisplay();
    updateAndSaveExpenses(); // This will just update the list on initial load
});


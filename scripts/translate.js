const translations = {
    en: {
        budgetManager: "Budget Manager",
        updateBudget: "Update Budget",
        addExpense: "Add Expenses",
        budgetTxtBottom: "Budget",
        enterTotalBudget: "Please enter your total budget:",
        invalidNumber: "Please enter a valid number.",

        enterExpenseName: "What is the expense for?",
        enterExpenseAmount: "How much is the expense?",
        invalidExpenseAmount: "Please enter a valid expense amount.",
        

        // Add more keys and values as needed
    },
    es: {
        budgetManager: "Gerente de Presupuesto",
        updateBudget: "actualizar presupuesto",
        addExpense: "Agregar gastos",
        budgetTxtBottom: "Presupuesto",
        enterTotalBudget: "Por favor, introduzca su presupuesto total:",
        invalidNumber: "Por favor, introduzca un número válido.",
        enterExpenseName: "¿Para qué es el gasto?",
        enterExpenseAmount: "¿Cuánto es el gasto?",
        invalidExpenseAmount: "Por favor, introduzca una cantidad válida para el gasto.",

        // Add more keys and values as needed
    },
    // Add more languages as needed
};


export function applyTranslations() {
    const userLang = navigator.language || navigator.userLanguage; // Get user's language
    const langCode = userLang.split('-')[0]; // Consider only the primary language subtag

    // Check if we support the detected language, fall back to English otherwise
    const translationKeys = translations[langCode] || translations['en'];

    // Update text content for each element that needs translation
    document.getElementById('budgetManagerTitle').textContent = translationKeys.budgetManager;
    document.getElementById('updateBudget').textContent = translationKeys.updateBudget;
    document.getElementById('addExpense').textContent = translationKeys.addExpense;
    // Continue for other elements
 
}


export function getTranslationKeys() {
    const userLang = navigator.language || navigator.userLanguage;
    const langCode = userLang.split('-')[0]; // Simplify "en-US" to "en", "es-ES" to "es", etc.
    return translations[langCode] || translations['en']; // Fallback to English if no matching translations
}

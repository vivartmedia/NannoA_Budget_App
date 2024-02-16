const translations = {
    en: {
        budgetManager: "Budget Manager",
        updateBudget: "Update Budget",
        // Add more keys and values as needed
    },
    es: {
        budgetManager: "Gerente de Presupuesto",
        updateBudget: "actualizar presupuesto",
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
    // Continue for other elements
 
}
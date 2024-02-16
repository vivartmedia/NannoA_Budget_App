

export function adjustTextSizeForBudget() {
    const budgetElement = document.getElementById('remainingBudget');
    const budgetValue = budgetElement.textContent || budgetElement.innerText;
    
    // Remove previous text size classes
    budgetElement.classList.remove('text-xs', 'text-sm', 'text-base', 'text-lg', 'text-xl', 'text-2xl', 'text-3xl', 'text-4xl', 'text-5xl', 'text-6xl', 'text-7xl');

    // Determine and apply new text size class based on content length or screen width
    if (budgetValue.length > 16) {
        budgetElement.classList.add('text-4xl');
    } else if (budgetValue.length >13) {
        budgetElement.classList.add('text-6xl');
    } else if (budgetValue.length < 8) {
        budgetElement.classList.add('text-7xl');
    } else {
        budgetElement.classList.add('text-xl'); // Default for smaller content lengths
    }

}


export function formatNumber(num) {
    return new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(num);
}
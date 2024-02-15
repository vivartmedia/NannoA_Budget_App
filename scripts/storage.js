export const loadFromStorage = (key, defaultValue = null) => {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : defaultValue;
};

export const saveToStorage = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
};

import { useState } from "react";

export const useLocalStorage = (keyName, defaultValue) => {
    const [storedValue, setStoredValue] = useState(() => {
        try {
            const value = window.localStorage.getItem(keyName);
            if (value) {
                return value;
            } 
        } catch (err) {
            return defaultValue;
        }
    });
    const setValue = (newValue) => {
        try {
            window.localStorage.setItem(keyName, newValue);
        } catch (err) {}
        setStoredValue(newValue);
    };
    const removeValue = () => {
        try {
            window.localStorage.removeItem(keyName);
        } catch (err) {}
    };

    return [storedValue, setValue, removeValue];
};
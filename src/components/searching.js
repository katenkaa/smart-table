import {rules, createComparison} from "../lib/compare.js";

export function initSearching(searchField) {
    return (data, state, action) => {
        // Получаем значение поиска из state
        const searchValue = state?.[searchField];
        
        // Если значение поиска пустое или не определено, возвращаем все данные
        if (!searchValue || String(searchValue).trim() === '') {
            return data;
        }
        
        // Приводим поисковый запрос к нижнему регистру
        const searchLower = String(searchValue).toLowerCase().trim();
        
        // Фильтруем данные
        return data.filter(item => {
            // Поля, по которым будем искать (должны совпадать с полями в данных)
            const searchableFields = ['date', 'customer', 'seller', 'total'];
            
            return searchableFields.some(field => {
                const fieldValue = item[field];
                
                // Пропускаем null/undefined
                if (fieldValue === undefined || fieldValue === null) {
                    return false;
                }
                
                // Приводим к строке и ищем совпадение
                const stringValue = String(fieldValue).toLowerCase();
                return stringValue.includes(searchLower);
            });
        });
    };
}
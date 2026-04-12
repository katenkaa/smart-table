import {createComparison, defaultRules} from "../lib/compare.js";

export function initFiltering(elements, indexes) {
    // @todo: #4.1 — заполнить выпадающие списки опциями
    
    Object.keys(indexes).forEach((elementName) => {
        if (elements[elementName]) {
            elements[elementName].append(
                ...Object.values(indexes[elementName]).map(name => {
                    const option = document.createElement('option');
                    option.value = name;
                    option.textContent = name;
                    return option;
                })
            )
        }
    });

    return (data, state, action) => {
        // @todo: #4.2 — обработать очистку поля
        
        if (action && action.name === 'clear') {
            const parent = action.closest('.filter-field');
            const input = parent?.querySelector('select, input');
            
            if (input) {
                input.value = '';
                const fieldName = action.dataset.field;
                if (fieldName && state[fieldName]) {
                    delete state[fieldName];
                }
            }
        }

        // @todo: #4.5 — отфильтровать данные используя компаратор
        
        let filteredData = [...data];
        
        // Фильтр по дате (частичное совпадение)
        if (state.date && state.date !== '') {
            const dateFilter = state.date.toLowerCase();
            filteredData = filteredData.filter(item => 
                item.date && item.date.toLowerCase().includes(dateFilter)
            );
        }
        
        // Фильтр по покупателю (частичное совпадение)
        if (state.customer && state.customer !== '') {
            const customerFilter = state.customer.toLowerCase();
            filteredData = filteredData.filter(item => 
                item.customer && item.customer.toLowerCase().includes(customerFilter)
            );
        }
        
        // Фильтр по продавцу (точное совпадение для select)
        if (state.searchBySeller && state.searchBySeller !== '') {
            filteredData = filteredData.filter(item => 
                item.seller === state.searchBySeller
            );
        }
        
        // Фильтр по диапазону total (totalFrom и totalTo)
        const fromValue = state.totalFrom ? parseFloat(state.totalFrom) : null;
        const toValue = state.totalTo ? parseFloat(state.totalTo) : null;
        
        if (fromValue !== null || toValue !== null) {
            filteredData = filteredData.filter(item => {
                const total = parseFloat(item.total);
                if (isNaN(total)) return false;
                
                if (fromValue !== null && total < fromValue) return false;
                if (toValue !== null && total > toValue) return false;
                
                return true;
            });
        }
        
        return filteredData;
    };
}
export function initSearching(searchField) {
  return (query, state, action) => {
    // Проверяем, что в поле поиска было что-то введено
    if (state[searchField] && state[searchField].trim()) {
      return {
        ...query,
        search: state[searchField]
      };
    }
    
    return query;
  };
}
import { createContext, useState } from 'react';

const SearchContext = createContext([{}, () => {}]);

const SearchProvider = props =>{

    const [ searchParam, setSearchParam ] = useState(null);
    const [ searchItem, setSearchItem ] = useState(null)

    return (
        <SearchContext.Provider value = {{ searchParam, setSearchParam, searchItem,  setSearchItem}}>
            {props.children}
        </SearchContext.Provider>
    )
}

export { SearchContext };

export default SearchProvider;
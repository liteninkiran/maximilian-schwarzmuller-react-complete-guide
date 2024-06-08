import { useState, useRef } from 'react';

export default function SearchableList({ items, children, itemKeyFn }) {
    const lastChange = useRef();
    const [searchTerm, setSearchTerm] = useState('');
    const searchResults = items.filter(item => {
        const title = item.title?.toLowerCase().includes(searchTerm.toLowerCase());
        const descr = item.description?.toLowerCase().includes(searchTerm.toLowerCase());
        return title || descr;
    });
    const handleChange = event => {
        if (lastChange.current) {
            clearTimeout(lastChange.current);
        }

        lastChange.current = setTimeout(() => {
            lastChange.current = null;
            setSearchTerm(event.target.value);
        }, 500);
    }

    return (
        <div className='searchable-list'>
            <input type='search' placeholder='Search' onChange={handleChange} />
            <ul>
                {
                    searchResults.map(item => (
                        <li key={itemKeyFn(item)}>
                            {children(item)}
                        </li>
                    ))
                }
            </ul>
        </div>
    );
}

import { useState } from 'react';

export default function SearchableList({ items, children, itemKeyFn }) {
    const [searchTerm, setSearchTerm] = useState('');
    const searchResults = items.filter(item => {
        const title = item.title?.toLowerCase().includes(searchTerm.toLowerCase());
        const descr = item.description?.toLowerCase().includes(searchTerm.toLowerCase());
        return title || descr;
    });
    const handleChange = event => setSearchTerm(event.target.value);

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

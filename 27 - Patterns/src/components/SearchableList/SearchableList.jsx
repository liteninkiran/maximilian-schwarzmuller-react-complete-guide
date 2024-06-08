import { useState } from 'react';

export default function SearchableList({ items, children }) {
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
                    searchResults.map((item, index) => (
                        <li key={index}>{children(item)}</li>
                    ))
                }
            </ul>
        </div>
    );
}

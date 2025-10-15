/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'

const SearchBar = ({ onSearchSubmit }) => {
    const [term, setTerm] = useState('');
    
    useEffect(() => {
        const handler = setTimeout(() => {
            onSearchSubmit(term);
        }, 500);

        return () => {
            clearTimeout(handler);
        };
    }, [term]);

    const handleChange = (e) => {
        setTerm(e.target.value);
    }

    return (
        <div className="flex justify-center mt-8">
            <div className="w-full max-w-lg">
                <input
                    value={term}
                    onChange={handleChange}
                    type="text"
                    placeholder="Search images..."
                    className="w-full px-5 py-3 rounded-2xl border border-blue-400 bg-white shadow focus:outline-none focus:ring-2 focus:ring-blue-300 text-lg transition"
                />
            </div>
        </div>
    )
}

export default SearchBar
import React from 'react'
import { useSearch } from '../context/searchContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
const SearchInput = () => {

    const navigate = useNavigate()
    const { search, setSearch } = useSearch()

    const handleSubmit = async (e) => {
        e.preventDefault()

        // Perform search logic here
        try {
            const { data } = await axios.get(`http://localhost:3000/api/v1/products/search/${search.keyword}`);
            console.log(data);
            setSearch({ keyword: search.keyword, results: data.result });

            // Redirect to search results page
            navigate('/search', { state: { results: data.result } });
        } catch (error) {
            console.error('Error fetching search results:', error);
        }
    }
    return (
        <>
            <form className="d-flex" role="search" onSubmit={handleSubmit}>
                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search.keyword}
                    onChange={(e) => setSearch({ ...search, keyword: e.target.value })}
                />
                {/*This creates a new object by copying all the existing properties of the search state using the     spread operator (...search).
                Then, it updates the keyword property of the search state with the new value from the input field (e.target.value).

                If you don't use the spread operator (...search), the entire search state will be replaced with the new    object, and other properties (like results) will be lost.
                setSearch({ keyword: e.target.value }); // This will remove the `results` property from the state.
            */ }
            
                <button className="btn btn-outline-success" type="submit">Search</button>
            </form>
        </>
    )
}

export default SearchInput

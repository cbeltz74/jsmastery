import React, {useEffect, useState} from 'react'
import Search from './components/Search'
import Spinner from './components/Spinner'
import MovieCard from './components/MovieCard';
import { useDebounce } from 'react-use';
import { updateSearchCount } from './appwrite';

const API_BASE_URL = 'https://api.themoviedb.org/3';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${API_KEY}`
  }
}

const App = () => {

const [searchTerm, setSearchTerm]= useState('');
const [errorMessage, setErrorMessage] = useState('');
const [movieList, setMovieList] = useState([]);
const [isLoading, setIsLoading] = useState(false);
const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');

// Debounce the search term to prevent excessive API calls 
// by waiting for the user to stop typing for 500ms.
// Added debouncedSearchTerm as a dependency to the useEffect Lines 65-67
useDebounce(() => {
  setDebouncedSearchTerm(searchTerm);
}
, 500, [searchTerm]);

const fetchMovies = async (query = '') => {
  setIsLoading(true);
  setErrorMessage('');

  try {
    const endpoint = query
    ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
    : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;

    const response = await fetch(endpoint, API_OPTIONS);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
   
    if(data.response === 'False') {
      setErrorMessage(data.error) || 'Failed to fetch movies';
      setMovieList([]);
      return;
    }

    setMovieList(data.results || []);

if(query && data.results.length > 0) {
  // Update the search count in Appwrite
  await updateSearchCount(query, data.results[0]);
}

  } catch (error) {
    console.error(`Error fetching movies: ${error}`);
    setErrorMessage('Failed to fetch movies. Please try again later.');
  } finally {
    setIsLoading(false);
  }
}

useEffect(() => {
  fetchMovies(debouncedSearchTerm);
}, [debouncedSearchTerm]);

  return (
    <main>

    <div className="pattern" />

    <div className="wrapper">

      <header>
        <img src="./hero.png" alt="Hero banner" />
        <h1>Find <span className="text-gradient">Movies</span> You'll Enjoy Without the Hassel</h1>
        <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </header>

      <section className="all-movies">    
        <h2 className="mt-[20px]">All Movies</h2>

      {isLoading ? (
        <Spinner />
      ) : errorMessage ? (
        <p className="text-red-500">{errorMessage}</p>
      ) : (
        <ul>
          {movieList.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </ul>
      )}
      
      
      </section>
    </div>
    </main>
    )
}
export default App
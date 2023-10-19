import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link for routing
import Select from 'react-select'; // Import the Select component
import '../App.css';

function HomeScreen() {
  // State variables for search and filtering
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  

  // Define available tags
  const tagsOptions = [
    { value: 'story', label: 'Story' },
    { value: 'comment', label: 'Comment' },
    { value: 'poll', label: 'Poll' },
    // Add more tags as needed
  ];

  // Handle the search button click
  const handleSearch = async () => {
    if (searchQuery.trim() === '') {
      alert('Please enter a search query.');
      return;
    }

    setLoading(true);

    try {
      //  API request based on user input and selected options.
      const tagsParam = selectedTags.map((tag) => `tags=${tag.value}`).join('&');

      const apiUrl = `http://hn.algolia.com/api/v1/search?query=${searchQuery}&${tagsParam}`;

      // Simulated fetch for demonstration 
      const response = await fetch(apiUrl);
      const data = await response.json();
      setSearchResults(data.hits);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="home-screen">
      <div className="search-bar">
        {/* Search input */}
        <input
          type="text"
          className="search-input"
          placeholder="Search Hacker News"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {/* Select for tags */}
        <Select
          className="tag-select"
          isMulti
          options={tagsOptions}
          value={selectedTags}
          onChange={(selected) => setSelectedTags(selected)}
          placeholder="Select Tags"
        />

        {/* Search button */}
        <button className="search-button" onClick={handleSearch} disabled={loading}>
          {loading ? 'Searching...' : 'Search'}
        </button>
      </div>
      {/* Display search results in a container */}
      <div className="search-results-box">
        {searchResults.length > 0 && (
          <div className="search-results">
            {searchResults.map((result) => (
              <div key={result.objectID} className="result-item">
                {/* Link to post detail */}
                <Link to={`/post/${result.objectID}`}>
                  <button>Details</button>
                </Link>
                {/* Display post details */}
                <p>Title: {result.title}</p>
                <p>URL: <a href={result.url} target="_blank" rel="noopener noreferrer">{result.url}</a></p>
                <p>Created At: {result.created_at}</p>
                <p>Created At (Unix Timestamp): {result.created_at_i}</p>
                <p>Number of Comments: {result.num_comments}</p>
                <p>Points: {result.points}</p>
                <p>Updated At: {result.updated_at}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default HomeScreen;

import React, { useState } from 'react';
import Select from 'react-select'; // Import the Select component
import '../App.css';

function HomeScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedField, setSelectedField] = useState('');
  const [selectedCondition, setSelectedCondition] = useState('');
  const [numericValue, setNumericValue] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  // Available numerical fields and conditions
  const numericalFields = [
    { value: 'created_at_i', label: 'Created Date' },
    { value: 'points', label: 'Points' },
    { value: 'num_comments', label: 'Number of Comments' },
  ];

  const numericalConditions = [
    { value: '>', label: 'Greater than' },
    { value: '>=', label: 'Greater than or equal to' },
    { value: '=', label: 'Equal to' },
    { value: '<', label: 'Less than' },
    { value: '<=', label: 'Less than or equal to' },
  ];

  const tagsOptions = [ // Define the available tags
    { value: 'story', label: 'Story' },
    { value: 'comment', label: 'Comment' },
    { value: 'poll', label: 'Poll' },
    // Add more tags as needed
  ];

  const handleSearch = async () => {
    if (searchQuery.trim() === '') {
      alert('Please enter a search query.');
      return;
    }

    // if (!selectedTags.length) {
    //   alert('Please select at least one tag.');
    //   return;
    // }

    // // if (!selectedField || !selectedCondition || !numericValue.trim()) {
    // //   alert('Please specify a valid numerical filter.');
    // //   return;
    // }

    setLoading(true);

    try {
      // Construct your API request based on user input and selected options.
      const tagsParam = selectedTags.map((tag) => `tags=${tag.value}`).join('&');
      const selectedFieldParam = selectedField.value;
      const selectedConditionParam = selectedCondition.value;
      const numericalValueParam = numericValue;

    //   const numericalFilters = `numericFilters=${selectedFieldParam}${selectedConditionParam}${numericalValueParam}`;
      const apiUrl = `http://hn.algolia.com/api/v1/search?query=${searchQuery}&${tagsParam}`;

      // Simulated fetch for demonstration (replace this with an actual API call):
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
        <input
          type="text"
          className="search-input"
          placeholder="Search Hacker News"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Select // Select for tags
          className="tag-select"
          isMulti
          options={tagsOptions}
          value={selectedTags}
          onChange={(selected) => setSelectedTags(selected)}
          placeholder="Select Tags"
        />
        <Select // Select for numerical field
          className="numeric-field-select"
          value={selectedField}
          options={numericalFields}
          onChange={(selected) => setSelectedField(selected)}
          placeholder="Select Numerical Field"
        />
        <Select // Select for numerical condition
          className="numeric-condition-select"
          value={selectedCondition}
          options={numericalConditions}
          onChange={(selected) => setSelectedCondition(selected)}
          placeholder="Select Numerical Condition"
        />
        <input
          type="number"
          className="numeric-value-input"
          placeholder="Numerical Value"
          value={numericValue}
          onChange={(e) => setNumericValue(e.target.value)}
        />
        <button className="search-button" onClick={handleSearch} disabled={loading}>
          {loading ? 'Searching...' : 'Search'}
        </button>
      </div>
      {/* Display search results here */}
      <div className="search-results-box"> {/* Box container for search results */}
      {searchResults.length > 0 && (
        <div className="search-results">
          {searchResults.map((result) => (
            <div key={result.objectID} className="result-item">
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

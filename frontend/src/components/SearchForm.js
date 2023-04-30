import React, { useState } from 'react';

const SearchForm = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="input-group">
        <input type="text" className="form-control" placeholder="Search by title or author" value={query} onChange={(e) => setQuery(e.target.value)} />
        <button className="btn btn-primary" type="submit">Search</button>
      </div>
    </form>
  );
};

export default SearchForm;

import { useRef } from 'react';
import './index.css'
import Form from 'react-bootstrap/Form';

const API_URL = 'https://api.unsplash.com/search/photos';
const API_KEY = environment.local.API_KEY;

function App() {
  const searchInput = useRef(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(searchInput.current.value);
  }

  const handleSelection = (selection) => {
    searchInput.current.value = selection;
  }

  return (
    <div className='container'>
      <h1 className="title">Image Search</h1>
      <div className="search-section">
        <Form onSubmit={handleSubmit}>
          <Form.Control 
          type="search" 
          placeholder="Type something to search..."
          className='search-input'
          ref={searchInput} />
        </Form>
      </div>
      <div className="filters">
        <div className="nature" onClick={() => handleSelection('Nature')}>Nature</div>
        <div className="birds" onClick={() => handleSelection('Birds')}>Birds</div>
        <div className="cats" onClick={() => handleSelection('Cats')}>Cats</div>
        <div className="shoes" onClick={() => handleSelection('Shoes')}>Shoes</div>
      </div>
    </div>
  )
}

export default App

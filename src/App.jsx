import { useRef, useState, useEffect, useCallback } from 'react';
import './index.css'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const API_URL = 'https://api.unsplash.com/search/photoss';
const VITE_API_KEY = import.meta.env.VITE_API_KEY;
const IMAGES_PER_PAGE = 20; 

function App() {
  const searchInput = useRef(null);
  const [images, setImages] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1)
  const [errorMsg, setErrorMsg] = useState('');
  
  const fetchImages = useCallback(async () => {
    try {
      if (searchInput.current.value) {
        setErrorMsg('');
        const data = await fetch(`${API_URL}?query=${searchInput.current.value}&page=${currentPage}&per_page=${IMAGES_PER_PAGE}&client_id=${VITE_API_KEY}`);
        console.log('data: ', data.ok);
        if (!data.ok) {
          throw new Error(`HTTP error! status: ${data.status}`);
        }

        const {results, total_pages } = await data.json();
        setImages(results)
        setTotalPages(total_pages)
      }
    } catch (error) {
      setErrorMsg("Error fetching images. Try again later.")
    }
  }, [currentPage])
  
  useEffect(() => {
    fetchImages();
  }, [fetchImages]);

  const handleResetSearch = () => {
    setCurrentPage(1);
    fetchImages();
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    handleResetSearch()
  }
  
  const handleSelection = (selection) => {
    searchInput.current.value = selection;
    handleResetSearch()
  }

  console.log("errorMsg: ", errorMsg)
  return (
    <div className='container'>
      <h1 className="title">Image Search</h1>
      {errorMsg && <p className="error-msg">{errorMsg}</p>}
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
      <div className="images">
        {images && images.map(image => (
          <img
            className='image'
            key={image.id}
            src={image.urls.small} 
            alt={image.alt_description}
          />
        ))}
      </div>
      <div className="buttons">
        { currentPage > 1 && <Button className="button" onClick={() => setCurrentPage(currentPage - 1) }>Previous</Button>}
        { currentPage < totalPages && <Button className="button" onClick={() => setCurrentPage(currentPage + 1)} >Next</Button>}
      </div>
    </div>
  )
}

export default App

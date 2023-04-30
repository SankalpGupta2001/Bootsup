import React, { useEffect, useState } from 'react';
import { Container, Table ,Button} from 'react-bootstrap';
import axios from "axios";
import SearchForm from './SearchForm';
const Home = () => {

    const [books ,setBooks] = useState([]);
    useEffect(() => {
        const getBooks = async() =>{
            try{
                const res = await axios.get("/api/books");
                console.log(res.data);
                setBooks(res.data);
            }
            catch(err){
                console.log(err);  
            }
        }
        getBooks();
    },[]);
    const handleDelete = (id) => {
        axios.delete(`/api/books/${id}`)
          .then(res => {
            setBooks(books.filter(book => book._id !== id));
          })
          .catch(err => console.log(err));
      };
      const handleSearch = async (query) => {
        const res = await axios.get(`/api/books/search?query=${query}`);
        setBooks(res.data);
      };
    return (
        
        <div>
        <Container>
      <h1>Books</h1>
      <SearchForm onSearch={handleSearch} />

      <Table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
          </tr>
        </thead>
        <tbody>
          {books.map(book => (
            <tr key={book._id}>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>
      <Button color="danger" onClick={() => handleDelete(book._id)}>Delete</Button>
    </td>
            </tr>
          ))}
        </tbody>
      </Table>
      </Container>
        </div>
        
    )
}

export default Home;
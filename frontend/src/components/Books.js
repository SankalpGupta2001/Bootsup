import React, {  useState } from 'react';
import { Container,  Form, Button } from 'react-bootstrap';

import axios from "axios";

const Books = () => {

    const [author ,setAuthor] = useState();
    const [title ,setTitle] = useState();

    const getBooks = async(e) =>{
        e.preventDefault();
        try{
            await axios.post( '/api/books', { title, author });
            setAuthor("");
            setTitle("");

        }
        catch(err){
            console.log(err);  
        }
    }



    return (
        
        <div>
        <Container>
      <h2>Add Book</h2>
    <Form onSubmit={getBooks}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Title</Form.Label>
        <Form.Control type="text" placeholder="Enter email" id="title" value={title} onChange={e => setTitle(e.target.value)}/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Author</Form.Label>
        <Form.Control type="text" placeholder="Password" id="author" value={author} onChange={e => setAuthor(e.target.value)}/>
      </Form.Group>
      
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>

      </Container>
        </div>
        
    )
}

export default Books;

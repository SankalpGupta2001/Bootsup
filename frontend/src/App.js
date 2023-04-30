import './App.css';
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./components/Home.js";
import Books from "./components/Books.js";
import Navbar from "./components/Navbar.js"
function App() {
  return (
    <div>
            <Navbar />
            <BrowserRouter>
                <Routes>
                       <Route path="/" element={<Home />} />
                       <Route path="/books" element={<Books />} />
                       
               </Routes>
            </BrowserRouter>
            
        </div> 
  )
}

export default App;

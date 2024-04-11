import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import ShowBook from './pages/ShowBook';
import CreateBook from './pages/CreateBook';
import EditBook from './pages/EditBook';
import DeleteBook from './pages/DeleteBook';
// import EditBook from './pages/Editbook';


function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/books/create' element={<CreateBook />} />
        <Route path='/books/details/:id' element={<ShowBook />} />
        <Route path='/books/edit/:id' element={<EditBook />} />
        <Route path='/books/delete/:id' element={<DeleteBook />} />
      </Routes>
    </div>
  );
}

export default App;

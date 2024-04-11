import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Spinner from '../components/Spinner';

function Home() {
  var [books, setBooks] = useState([]);
  var [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get('https://book-store-backend-alpha.vercel.app/books')
      .then((res) => {
        setBooks(res.data);
        setLoading(false);
        // console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className='p-4 container'>
      <div className='d-flex justify-content-between p-4'>
        <h1>BOOKS</h1>
        <Link to='/books/create' className='fs-2'>
          <i className='bi bi-plus-square' />
        </Link>
      </div>
      {loading ? (
        <Spinner />
      ) : (
        <table className='w-100' style={{ height: '200px' }}>
          <thead>
            <tr className='text-center'>
              <th className='border border-2'>No</th>
              <th className='border border-2'>Title</th>
              <th className='border border-2'>Author</th>
              <th className='border border-2'>Publish Year</th>
              <th className='border border-2'>Operations</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book, index) => {
              return (
                <tr className='text-center' key={index}>
                  <td className='border border-2'>{index + 1}</td>
                  <td className='border border-2'>{book.title}</td>
                  <td className='border border-2'>{book.author}</td>
                  <td className='border border-2'>{book.publishYear}</td>
                  <td className='border border-2'>
                    <div className='d-flex justify-content-center gap-5'>
                      <Link to={`/books/details/ ${book._id}`}>
                        <i className='bi bi-info-circle-fill'></i>
                      </Link>
                      <Link to={`/books/edit/ ${book._id}`}>
                        {/* <i className='bi bi-pencil-square'></i> */}
                        <i class='bi bi-brush'></i>
                      </Link>
                      <Link to={`/books/delete/ ${book._id}`}>
                        <i className='bi bi-trash'></i>
                      </Link>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Home;

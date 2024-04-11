import React, { useEffect, useState } from 'react';
import GoBack from '../components/GoBack';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Spinner from '../components/Spinner';

function ShowBook() {
  var [book, setBook] = useState({});
  var [loading, setLoading] = useState(false);
  var { id } = useParams();

  useEffect(() => {
    setLoading(true);
    console.log(id);
    const bookID = id.trim();
    let URL = `https://book-store-backend-wheat.vercel.app/books/${bookID}`;
    axios
      .get(URL)
      .then((res) => {
        setBook(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);
  return (
    <div className='p-4 container'>
      <div className='p-4'>
        <GoBack />
        <h3 className='pt-4'>show book</h3>
        {loading ? (
          <Spinner />
        ) : (
          <div className='row py-4 '>
            <div className='col-8 border border-2 bg-warning p-4'>
              <div className='p-2'>
                <span className='fw-bold'>Id:</span>
                <span>{book._id}</span>
              </div>
              <div className='p-2'>
                <span className='fw-bold'>Title:</span>
                <span>{book.title}</span>
              </div>
              <div className='p-2'>
                <span className='fw-bold'>Author:</span>
                <span>{book.author}</span>
              </div>
              <div className='p-2'>
                <span className='fw-bold'>PublishedYear:</span>
                <span>{book.publishYear}</span>
              </div>
              <div className='py-2'>
                <span className='fw-bold'>Created Time : </span>
                <span>{new Date(book.createdAt).toString()}</span>
              </div>
              <div className='py-2'>
                <span className='fw-bold'>Updated Time : </span>
                <span>{new Date(book.updatedAt).toString()}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ShowBook;

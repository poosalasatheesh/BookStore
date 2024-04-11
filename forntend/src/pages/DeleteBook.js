import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import GoBack from '../components/GoBack';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useSnackbar } from 'notistack';

function DeleteBook() {
  var [loading, setLoading] = useState(false);
  var navigate = useNavigate();
  var { id } = useParams();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  var handleDeleteBook = () => {
    setLoading(true);
    console.log(id);
    const bookID = id.trim();
    axios
      .delete(`https://book-store-backend-pi.vercel.app/books/${bookID}`)
      .then((res) => {
        console.log(res);
        enqueueSnackbar('Book Deleted Succesfully', { variant: 'success' });

        setLoading(false);
        navigate('/');
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar('Error', { variant: 'error' });
      });
  };
  return (
    <div className='p-4'>
      <GoBack />
      <h2 className='p-3'> DeleteBook</h2>
      {loading ? <Spinner /> : ''}
      <div className='py-5 border border-3 w-50 border-warning'>
        <div className='d-flex justify-content-center flex-column'>
          <p className='text-center fs-5'>Are you sure to delete ?</p>
          <button
            className='btn btn-danger w-25 m-auto'
            onClick={handleDeleteBook}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteBook;

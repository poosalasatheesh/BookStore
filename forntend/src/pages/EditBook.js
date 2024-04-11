import React, { useEffect, useState } from 'react';
import Goback from '../components/GoBack';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';

function EditBook() {
  var [title, setTitle] = useState('');
  var [author, setAuthor] = useState('');
  var [publishYear, setPublishYear] = useState('');
  var [loading, setLoading] = useState(false);
  var navigate = useNavigate();
  var { id } = useParams();
  var bookId = id.trim();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`https://book-store-backend-pi.vercel.app/books/${bookId}`)
      .then((res) => {
        setTitle(res.data.title);
        setAuthor(res.data.author);
        setPublishYear(res.data.publishYear);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  var handleBookEdit = () => {
    var data = {
      title,
      author,
      publishYear,
    };
    setLoading(true);
    axios
      .put(`https://book-store-backend-pi.vercel.app/books/${bookId}`, data)
      .then((res) => {
        setLoading(false);
        enqueueSnackbar('Book Edited succesfully', { variant: 'success' });
        navigate('/');
        console.log(res);
      })
      .catch((error) => {
        enqueueSnackbar('Error', { variant: 'error' });
        setLoading(false);
        console.log(error);
      });
  };
  return (
    <div className='p-4'>
      <Goback />
      <h2 className='mt-3'>Edit Book</h2>
      {loading ? <Spinner /> : ''}
      <div className='row mt-4 container'>
        <div className='col-6 m-auto border border-2 border-secondary px-4 py-2 bg-warning'>
          <div className='mb-3 mt-3'>
            <label for='email' className='form-label'>
              Title:
            </label>
            <input
              type='email'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className='form-control border border-2 border-dark'
              id='email'
              placeholder='Enter email'
              name='email'
            />
          </div>
          <div className='mb-3 mt-3'>
            <label for='email' className='form-label'>
              Author:
            </label>
            <input
              type='email'
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className='form-control border border-2 border-dark'
              id='email'
              placeholder='Enter Author'
              name='email'
            />
          </div>
          <div className='mb-3 mt-3'>
            <label for='email' className='form-label'>
              PublishYear:
            </label>
            <input
              type='publishYear'
              value={publishYear}
              onChange={(e) => setPublishYear(e.target.value)}
              className='form-control border border-2 border-dark'
              id='email'
              placeholder='Enter PublishYear'
              name='email'
            />
          </div>
          <button
            onClick={handleBookEdit}
            className='btn btn-primary border-dark mb-2 mt-3 w-100 m-auto'
          >
            <span className='text-align-center fw-bold'>Update</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditBook;

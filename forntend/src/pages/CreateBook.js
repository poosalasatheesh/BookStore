import React, { useState } from 'react';
import Goback from '../components/GoBack';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';

function CreateBook() {
  var [title, setTitle] = useState('');
  var [author, setAuthor] = useState('');
  var [publishYear, setPublishYear] = useState('');
  var [loading, setLoading] = useState(false);
  var navigate = useNavigate();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  var handleBookSave = () => {
    var data = {
      title,
      author,
      publishYear,
    };
    setLoading(true);
    axios
      .post('https://book-store-backend-alpha.vercel.app/books', data)
      .then((res) => {
        setLoading(false);
        enqueueSnackbar('Book is created succesfully', { variant: 'success' });
        navigate('/');
        console.log(res);
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar('Error', { variant: 'error' });
        console.log(error);
      });
  };
  return (
    <div className='p-4'>
      <Goback />
      <h2 className='mt-3'>Create Book</h2>
      {loading ? <Spinner /> : ''}
      <div className='row mt-4 container '>
        <div className='col-6 m-auto border border-2 border-secondary px-4 py-2 bg-warning'>
          <div className='mb-3 mt-3'>
            <label for='email' className='form-label'>
              Title:
            </label>
            <input
              type='email'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className='form-control border border-2 border-secondary'
              id='email'
              placeholder='Enter Title'
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
              className='form-control border border-2 border-secondary'
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
              className='form-control border border-2 border-secondary'
              id='email'
              placeholder='Enter PublishYear'
              name='email'
            />
          </div>
          <button
            onClick={handleBookSave}
            className='btn btn-primary border-dark mb-2 mt-3 w-100 m-auto'
          >
            <span className='text-align-center fw-bold'>Save</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateBook;

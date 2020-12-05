import React, { useState } from 'react';
import './Update.css';
import Button from '../Button/Button';
import axios from 'axios';
import SweetAlert from 'react-bootstrap-sweetalert';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { Link } from 'react-router-dom';

const Update = (todo) => {
  const [alert, setAlert] = useState(false);

  const handleSubmit = (_id, e) => {
    e.preventDefault();
    setAlert(true);
    axios.patch(`http://localhost:8000/post/${_id}`, {
      todo: 'tes',
    });
    window.location('/');
  };

  //sweet alert
  const onConfirm = () => {
    setAlert(false);
  };
  const onCancel = () => {
    setAlert(false);
  };

  return (
    <>
      <div className='container-hero'>
        <Header />
        <div className='hero'>
          <h2>
            If you bussy <span>like a Boss, </span>
            <span>Manage</span> your daily activity with
            <span id='box'>iDO</span>
          </h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Todo</label>
            <input
              //onChange={(e) => setTodo(e.target.value)}
              value={todo.todo}
              name='todo'
              type='text'
              placeholder='Go to work'
              required
            />
          </div>
          <div>
            <label>Desc</label>
            <textarea
              //onChange={(e) => setDesc(e.target.value)}
              value={todo.desc}
              name='Desc'
              type='text'
              placeholder='Im go to work 8:00 clock'
              required
            ></textarea>
          </div>
          <div className='container-button'>
            <Link to='/'>
              <Button className='btn btn-delete' name='Back' />
            </Link>
            <Button className='btn btn-update' name='Update' />
          </div>

          {alert && (
            <SweetAlert
              success
              title='Todo added successfully'
              onConfirm={onConfirm}
              onCancel={onCancel}
            />
          )}
        </form>
      </div>
      <Footer />
    </>
  );
};

export default Update;

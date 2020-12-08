import React, { useState } from 'react';
import './FormInput.css';
import Button from '../Button/Button';
import axios from 'axios';
import SweetAlert from 'react-bootstrap-sweetalert';

const FormInput = () => {
  const [todo, setTodo] = useState();
  const [desc, setDesc] = useState();
  const [alert, setAlert] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setAlert(true);
    const data = {
      todo: todo,
      desc: desc,
    };
    axios.post('http://localhost:8000/post', data).then(() => {
      setTodo('');
      setDesc('');
    });
  };

  //sweet alert
  const onConfirm = () => {
    setAlert(false);
  };
  const onCancel = () => {
    setAlert(false);
  };

  return (
    <div className='container-hero'>
      <div className='hero'>
        <h2>
          If you bussy <span>like a Boss, </span>
          <span>Manage</span> your daily activity with
          <span id='box'>iDO</span>
        </h2>
      </div>
      <form onSubmit={handleSubmit}>
        <div>
          <h3 className='title-text'>Todo</h3>
          <input
            onChange={(e) => setTodo(e.target.value)}
            value={todo}
            name='todo'
            type='text'
            placeholder='Example Go to work'
            required
          />
        </div>
        {/*         <div>
          <label>Desc</label>
          <textarea
            onChange={(e) => setDesc(e.target.value)}
            value={desc}
            name='Desc'
            type='text'
            placeholder='Im go to work 8:00 clock'
            required
          ></textarea>
        </div> */}
        <Button className='btn btn-add' name='Create' />
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
  );
};

export default FormInput;

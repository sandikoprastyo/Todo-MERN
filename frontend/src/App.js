import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import SweetAlert from 'react-bootstrap-sweetalert';
// Component
import Header from './Header/Header';
import Button from './Button/Button';
import FormInput from './FormInput/FormInput';
import Footer from './Footer/Footer';

const App = () => {
  const [alert, setAlert] = useState(false);

  const [todo, setTodo] = useState([
    {
      todo: 'Example Todo',
      date: '20-November-2020',
    },
  ]);

  useEffect(() => {
    axios
      .get('http://localhost:8000/post')
      .then((res) => {
        setTodo(res.data);
      })
      .catch(() => {
        setTodo([
          {
            todo: 'Data error check your internet',
            date: null,
          },
        ]);
      });
  });

  ///sweet alert cancel
  const onCancel = () => {
    setAlert(false);
  };
  ///sweet alert confirm
  const onConfirm = () => {
    setAlert(false);
  };

  const handleDelete = (_id, e) => {
    setAlert(true);
    axios.delete(`http://localhost:8000/post/${_id}`).then(() => {
      //filter todo yang sudah di hapus
      const todos = todo.filter((item) => item._id !== _id);
      setTodo(todos);
    });
  };

  const handleUpdate = (event) => {
    let idTodo = parseInt(event.target.value);
    axios.get(`http://localhost:8000/post/${idTodo}`).then((res) => {
      let dataTodo = res.data;
      setTodo([
        {
          todo: dataTodo.todo,
          date: dataTodo.date,
        },
      ]);
    });
  };

  return (
    <>
      <Header />
      <div className='App'>
        <div className='container'>
          <FormInput />
        </div>
        {todo.map((todo, i) => {
          return (
            <div className='box-wrap' key={i}>
              <div className='box' key={todo._id}>
                <h2 className='box-title'>{todo.todo}</h2>
                <p className='box-content'>{todo.desc}</p>
                <p className='box-date'> {todo.date}</p>
                <div className='box-button'>
                  <Button
                    onClick={(e) => handleDelete(todo._id, e)}
                    name='Delete'
                    className='btn btn-delete'
                  />
                  <Button
                    onClick={handleUpdate}
                    name='Update'
                    className='btn btn-update'
                  />
                </div>
              </div>
            </div>
          );
        })}
        {alert && (
          <SweetAlert
            success
            title='Todo delete'
            onConfirm={onConfirm}
            onCancel={onCancel}
          />
        )}
        <Footer />
      </div>
    </>
  );
};

export default App;

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
  const [todo, setTodo] = useState([]);
  const [update, setUpdate] = useState(false);
  const [todoUpdate, setTodoUpdate] = useState([]);
  const [updateID, setUpdateID] = useState(null);

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
            desc: 'Data error check your internet',
            date: new Date(),
          },
        ]);
      });
  });

  ///sweet alert cancel delete button
  const onCancelDelete = () => setAlert(false);
  ///sweet alert confirm delete button
  const onConfirmDelete = () => setAlert(false);

  //func delete button
  const handleDelete = (_id, e) => {
    setAlert(true);
    axios.delete(`http://localhost:8000/post/${_id}`).then(() => {
      //filter todo yang sudah di hapus
      const todos = todo.filter((item) => item._id !== _id);
      setTodo(todos);
    });
  };

  ///sweet alert cancel update button
  const onCancelUpdate = () => {
    setUpdate(false);
    setUpdateID(null);
  };

  ///sweet alert confirm update button
  const handleUpdate = (_id) => {
    setUpdate(true);
    setUpdateID(_id);
  };

  //!!Bug is here not get _id
  const onConfirmUpdate = () => {
    setUpdate(false);
    let ID = updateID;
    axios
      .patch(`http://localhost:8000/post/${ID}`, {
        todo: todoUpdate,
      })
      .catch((error) => {
        console.log(error);
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
                <p className='box-date'> {todo.date}</p>
                <div className='box-button'>
                  <Button
                    onClick={(e) => handleDelete(todo._id, e)}
                    name='Delete'
                    className='btn btn-delete'
                  />
                  <Button
                    name='Update'
                    className='btn btn-update'
                    onClick={() => handleUpdate(todo._id)}
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
            onConfirm={onConfirmDelete}
            onCancel={onCancelDelete}
          />
        )}
        ,
        {update && (
          <SweetAlert
            type={'controlled'}
            cancelBtnBsStyle='dark'
            title='Todo update'
            placeHolder='Write something'
            showCancel={true}
            onCancel={onCancelUpdate}
            onConfirm={(response) => onConfirmUpdate(response, todo._id)}
            dependencies={todo}
          >
            {(renderProps) => (
              <div className='container-update'>
                <form>
                  <hr />
                  <input
                    required
                    type={'text'}
                    ref={renderProps.setAutoFocusInputRef}
                    className='form-control'
                    value={todoUpdate}
                    onKeyDown={renderProps.onEnterKeyDownConfirm}
                    onChange={(e) => setTodoUpdate(e.target.value)}
                    placeholder={'Todo'}
                  />
                  <hr />
                </form>
              </div>
            )}
          </SweetAlert>
        )}
        <Footer />
      </div>
    </>
  );
};

export default App;

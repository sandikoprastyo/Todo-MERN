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
  const [update, setUpdate] = useState(false);
  const [todo, setTodo] = useState([]);
  const [todos, setTodos] = useState('');
  const [desc, setDesc] = useState('');

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
  const onCancelUpdate = () => setUpdate(false);
  ///sweet alert confirm update button
  const onConfirmUpdate = () => {
    setUpdate(false);
    patcher();
  };

  //func update button
  const handleUpdate = () => setUpdate(true);

  const patcher = (_id) => {
    console.log('====================================');
    console.log(_id);
    console.log('====================================');
    /*   axios.patch(`http://localhost:8000/post/${_id}`, {
      todo: 'response',
    }); */
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
                    name='Update'
                    className='btn btn-update'
                    onClick={(e) => handleUpdate(todo._id, e)}
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
            onCancel={onCancelUpdate}
            onConfirm={(response) => onConfirmUpdate(response)}
            dependencies={[todo]}
          >
            {(renderProps) => (
              <div className='container-update'>
                <form>
                  <hr />
                  <input
                    type={'text'}
                    ref={renderProps.setAutoFocusInputRef}
                    className='form-control'
                    value={todos}
                    onKeyDown={renderProps.onEnterKeyDownConfirm}
                    onChange={(e) => setTodos({ todos: e.target.value })}
                    placeholder={'Todos'}
                  />
                  <br />
                  <input
                    type={'text'}
                    className='form-control'
                    value={desc}
                    onKeyDown={renderProps.onEnterKeyDownConfirm}
                    onChange={(e) => setDesc({ desc: e.target.value })}
                    placeholder={'Desc'}
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

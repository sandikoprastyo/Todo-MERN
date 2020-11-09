import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
// Component
import Button from './Button/Button';
import Footer from './Footer/Footer';
import FormInput from './FormInput/FormInput';

const App = () => {
  const [todo, setTodo] = useState([
    { todo: 'Example todo', date: '20-November-2020' },
  ]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios('http://localhost:8000/post');
      setTodo(result.data);
    };
    fetchData();
  }, []);

  console.log(todo);
  return (
    <div className='App text-center'>
      <div className='container'>
        <FormInput />
        <Button className='btn btn-add' name='add' />
        <Button className='btn btn-delete' name='delete' />
      </div>
      {todo.map((todos) => {
        return (
          <div className='block' key={todos._id}>
            <h1 className='todo'>{todos.todo}</h1>
            <div className='footer'>
              <p className='date'>{todos.date}</p>
              <Button className='btn btn-update' name='delete' />
              <Button className='btn btn-delete' name='update' />
            </div>
          </div>
        );
      })}
      <Footer />
    </div>
  );
};

export default App;

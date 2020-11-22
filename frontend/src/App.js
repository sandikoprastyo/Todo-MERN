import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
// Component
import Header from "./Header/Header";
import Button from "./Button/Button";
import FormInput from "./FormInput/FormInput";
import Footer from "./Footer/Footer";

const App = () => {
  const [todo, setTodo] = useState([
    {
      todo: "Example Todo",
      date: "20-November-2020",
    },
  ]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios("http://localhost:8000/post");
      setTodo(result.data);
    };
    fetchData();
  }, []);

  console.log(todo);

  const handleDelete = (event) => {
    let idTodo = parseInt(event.target.value);
    axios.delete(`http://localhost:8000/post/${idTodo}`).then(() => {
      setTodo(null);
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
      <div className="App">
        <div className="container">
          <FormInput />
        </div>
        {todo.map((todo) => {
          return (
            <div className="box-wrap">
              <div className="box" key={todo._id}>
                <h2 className="box-title">{todo.todo}</h2>
                <p className="box-content">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Eveniet modi laborum minima id laudantium mollitia deserunt
                  consequuntur asperiores, officia iusto illo impedit natus
                  accusamus numquam totam doloremque sequi esse dolor.
                </p>
                <p className="box-date">{todo.date}</p>
                <div className="box-button">
                  <Button
                    onClick={handleDelete}
                    name="Delete"
                    className="btn btn-delete"
                  />
                  <Button
                    onClick={handleUpdate}
                    name="Update"
                    className="btn btn-update"
                  />
                </div>
              </div>
            </div>
          );
        })}
        <Footer />
      </div>
    </>
  );
};

export default App;

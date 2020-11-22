import React from "react";
import "./FormInput.css";
import Button from "../Button/Button";

const FormInput = (props) => {

  return (
    <div className="container-hero">
      <div className="hero">
        <h2>
          If you bussy <span>like a Boss, </span>
          <span>Manage</span> your daily activity with
          <span id="box">iDO</span>
        </h2>
      </div>
      <form>
        <div>
          <label>Todo</label>
          <textarea onChange={props.onChange} value={props.value} name="todo" type="text" placeholder="todo" required></textarea>
        </div>
        <div>
          <label>Date</label>
          <input onChange={props.onChange} value={props.value} name="date" type="text" placeholder="ex: 12-Desember-2020" required />
        </div>
        <Button className="btn btn-add" name="Create" />
      </form>
    </div>
  );
};

export default FormInput;

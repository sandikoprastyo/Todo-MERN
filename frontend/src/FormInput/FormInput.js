import React from "react";
import "./FormInput.css";
import Button from "../Button/Button";

const FormInput = (props) => {
  const handleAdd = () => {
    alert("Create List Success");
  };
  return (
    <div className="container-hero">
      <div className="hero">
        <h2>
          If you bussy <span>like a Boss, </span><span>Manage</span> your daily activity with
          <span id="box">iDO</span>
        </h2>
      </div>
      <form>
        <textarea placeholder="Input todo:"></textarea>
        <Button onClick={handleAdd} className="btn btn-add" name="Create" />
      </form>
    </div>
  );
};

export default FormInput;
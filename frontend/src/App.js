import "./App.css";
// Component
import Button from "./Button/Button";
import Footer from "./Footer/Footer";
import FormInput from "./FormInput/FormInput";

function App(props) {
  return (
    <div className="App">
      <div className="container">
        <FormInput />
        <Button class="btn btn-update" name="Update" />
      </div>
      <Footer />
    </div>
  );
}

export default App;

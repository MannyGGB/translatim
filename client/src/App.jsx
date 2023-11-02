import "./App.css";
import axios from "axios";
import { useState } from "react";

function App() {
  //store out from and to languages in state
  const [from, setFrom] = useState("en");
  const [to, setTo] = useState("en");

  //store the word we want to translate in state
  const [word, setWord] = useState("");
  const [translation, setTranslation] = useState("");
  //add image in state
  const [image, setImage] = useState("");
  //add gif in state
  const [gif, setGif] = useState("");
  //on change function for the from and to states (we can write arrow functions directly into our select)
  //on change function for the input of the word we want to translate (we can write arrow functions directly into our input)

  //onSubmit function that calls our API to get the translation

  async function handleTranslate(event) {
    event.preventDefault();
    const API = `http://localhost:8080/translate?word=${word}&from=${from}&to=${to}`;
    const res = await axios.get(API);
    setTranslation(res.data.translation);
    setImage(res.data.image);
    setGif(res.data.gif);
  }

  return (
    <>
      <form onSubmit={handleTranslate}>
        <div className="container">
          <select onChange={(event) => setFrom(event.target.value)}>
            <option value="en">English</option>
            <option value="es">Spanish</option>
            <option value="pl">Polish</option>
            <option value="tr">Turkish</option>
            <option value="ar">Arabic</option>
          </select>
          <input
            type="text"
            placeholder="Translate"
            onChange={(event) => setWord(event.target.value)}
          />
        </div>
        <div className="container">
          <select onChange={(event) => setTo(event.target.value)}>
            <option value="en">English</option>
            <option value="es">Spanish</option>
            <option value="pl">Polish</option>
            <option value="tr">Turkish</option>
            <option value="ar">Arabic</option>
          </select>
          <button>Submit</button>
          <div className="output">{translation}</div>
          <img src={image} />
          <img src={gif} />
        </div>
      </form>
    </>
  );
}

export default App;

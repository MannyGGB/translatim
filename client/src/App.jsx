import "./App.css";
import axios from "axios";
import { useState } from "react";

function App() {
  //store out from and to languages in state
  const [from, setFrom] = useState("en");
  const [to, setTo] = useState("es");

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
    // `http://localhost:8080/translate?word=${word}&from=${from}&to=${to}`;
    //const API = `https://translatim-4f6e.onrender.com/translate?word=${word}&from=${from}&to=${to}`;

    const res = await axios.get(API);
    setTranslation(res.data.translation);
    setImage(res.data.image);
    setGif(res.data.gif);
  }

  return (
    <>
      <header>
        <h1>Translatim</h1>
        <p>Visualise words around the world</p>
      </header>
      <main>
        <form onSubmit={handleTranslate} className="input-container">
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
          <button>Submit</button>
        </form>
        <form className="output-container">
          <select onChange={(event) => setTo(event.target.value)}>
            <option value="es">Spanish</option>
            <option value="en">English</option>
            <option value="pl">Polish</option>
            <option value="tr">Turkish</option>
            <option value="ar">Arabic</option>
          </select>
          <input readOnly value={translation} />
        </form>
        <div>
          <img src={image} />
        </div>
        <div>
          <img className="gif" src={gif} />
        </div>
      </main>
    </>
  );
}

export default App;

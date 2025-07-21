import { useState, useCallback, useEffect, useRef } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [length, setlength] = useState(4);
  const [numberAllowed, setnumberAllowed] = useState(false);
  const [charAllowed, setcharAllowed] = useState(false);
  const [password, setpassword] = useState("");
  const passwordRef = useRef(null);
  const generatePassword = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str += "1234567890";
    if (charAllowed) str += "!@#$%^&*_+";
    for (let i = 0; i < length; i++) {
      const char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setpassword(pass);
  }, [length, numberAllowed, charAllowed]);

  useEffect(() => {
    generatePassword();
  }, [length, numberAllowed, charAllowed]);
  const copyPasswordToClipboard = () => {
    window.navigator.clipboard.writeText(password);
    passwordRef.current?.select();
  };

  return (
    <div className="bg-gray-800 w-full max-w-lg mx-auto shadow-md rounded-lg px-6 py-3 my-10 text-orange-600 text-lg">
      <h1 className="text-white font-bold text-center py-3">
        Password Generator
      </h1>
      <div className="flex shadow rounded-lg overflow-hidden mb-4 py-2">
        <input
          type="text"
          value={password}
          className="outline-none px-3 py-1 w-full bg-white rounded-l-lg"
          placeholder="Password"
          readOnly
          ref={passwordRef}
        />
        <button
          onClick={copyPasswordToClipboard}
          className="bg-blue-700 outline-none text-white px-3 py-0.5 shrink-0 rounded-r-lg"
        >
          copy
        </button>
      </div>
      <div className="flex text-md justify-between">
        <div className="flex items-center gap-x-1">
          <input
            type="range"
            min={4}
            max={20}
            value={length}
            className="cursor-pointer"
            onChange={(e) => setlength(e.target.value)}
            name=""
            id=""
          />
          <label className="text-lg" htmlFor="length">
            Length : {length}
          </label>
        </div>
        <div className="flex item-center gap-x-1">
          <input
            type="checkbox"
            name=""
            id=""
            defaultChecked={numberAllowed}
            onChange={() => {
              setnumberAllowed((prev) => !prev);
            }}
          />
          <label htmlFor="number">Numbers</label>
        </div>
        <div className="flex item-center gap-x-1">
          <input
            type="checkbox"
            name=""
            id=""
            defaultChecked={charAllowed}
            onChange={() => {
              setcharAllowed((prev) => !prev);
            }}
          />
          <label htmlFor="charInput">Charecters</label>
        </div>
      </div>
    </div>
  );
}

export default App;

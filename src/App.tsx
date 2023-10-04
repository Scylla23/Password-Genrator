import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';




function App() {
  const [length, setLength] = useState(8);
  const [number, setNumber] = useState(false);
  const [character, setCharcter] = useState(false);
  const [password, setPassword] = useState("");
  const [isCopied, setIsCopied] = useState(false);
  
  const inputRef = useRef<HTMLInputElement | null>(null);

  const showToast = () => {
    toast.success("Password copied to clipboard",{
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });
  };

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (number) str += "0123456789";
    if (character) str += "!@#$%^&*-_+=[]{}~`";

    for (let index = 0; index < length; index++) {
      let i = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(i);
    }
    setPassword(pass);
  }, [length, number, character, setPassword]);

  useEffect(() => {
    passwordGenerator();
  } , [length, number, character,passwordGenerator])

  const handleCopyClick = useCallback(() => {
    if(inputRef.current){
      // Select the input text
      inputRef.current?.select();
     
      // Execute the copy command
      window.navigator.clipboard.writeText(password)
      
      setIsCopied(true);
      showToast();
      setTimeout(() => {
       setIsCopied(false);
      }, 500);
    }
   },[password])

  
  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-600 text-black-500 text-xl">
        <h1 className="text-white text-4xl text-center mt-3 mb-7">Password Generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
          ref={inputRef}
            type="text"
            value={password}
            className="outline-none w-full py-1 px-3"
            placeholder="Password"
            readOnly
          />
          <button className={isCopied ? " bg-white-700 text-white px-3 py-0.5 shrink-0" : "outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0"} onClick={handleCopyClick}>Copy</button>
        </div>
        <div 
        className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <input type="range" min={8} max={50} value={length} className="cursor-pointer" onChange={(e)=> {setLength(Number(e.target.value))}}/>
            <label htmlFor="">Length: {length}</label>
          </div>
          <div className="flex items-center gap-x-1">
      <input
          type="checkbox"
          defaultChecked={number}
          id="numberInput"
          onChange={() => {
            setNumber((prev) => !prev);
          }}
      />
      <label htmlFor="numberInput">Numbers</label>
      </div>
      <div className="flex items-center gap-x-1">
          <input
              type="checkbox"
              defaultChecked={character}
              id="characterInput"
              onChange={() => {
                setCharcter((prev) => !prev )
              }}
          />
          <label htmlFor="characterInput">Characters</label>
      </div>
        </div>
      </div>
      <ToastContainer/>
    </>
  );
}

export default App;

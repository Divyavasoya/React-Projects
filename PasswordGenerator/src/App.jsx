import { useState, useCallback, useEffect, useRef } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import './App.css'

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const notify = () => toast('Here is your toast.');

  //useRef hook
  const passwordref = useRef(null)

  const copyPwToClipboard = useCallback(() => {
    passwordref.current?.select();
    // passwordref.current?.setSelectionRange(0, 9);
    window.navigator.clipboard.writeText(password)
  }, [password])


  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz123456789~`?><{}[]()=-+_\|"
    if (numberAllowed) str += "1234567890"
    if (charAllowed) str += "!@#$%^&*~`"

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }
    setPassword(pass)

  }, [length, numberAllowed, charAllowed, setPassword])

  useEffect(() => {
    passwordGenerator()
  }, [length, numberAllowed, charAllowed, passwordGenerator])

  return (
    <>
      <div className='w-full h-screen flex items-center justify-center'>
        <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-4 my-8 text-orange-500 bg-gray-800 flex flex-col '>
          <h1 className='text-white text-center mb-3 text-2xl'>Password Generator</h1>
          <div className='flex shadow rotate-lg overflow-hidden mb-4'>
            <input
              type="text"
              value={password}
              placeholder='Password'
              className='outline-none w-full py-1 px-3 bg-amber-50 placeholder:text-amber-500'
              readOnly
              ref={passwordref}
            />
            <button
              onClick={copyPwToClipboard }
              className='outline-none bg-blue-700 text-white px-3 py-0.5 cursor-pointer '>Copy</button>
            <Toaster />
          </div>
          <div className='flex text-sm gap-x-2'>
            <div className='flex items-center gap-x-1'>
              <input type="range" min={6} max={100} value={length} className='cursor-pointer' onChange={(e) => { setLength(e.target.value) }} />
              <label>Length : {length}</label>
            </div>
            <div className='flex items-center gap-x-1'>
              <input type="checkbox"
                defaultChecked={numberAllowed}
                id="numberInput"
                onChange={() => {
                  setNumberAllowed((prev) => !prev)
                }}
              />
              <label htmlFor="">Numbers</label>
            </div>
            <div className='flex items-center gap-x-1'>
              <input type="checkbox"
                defaultChecked={numberAllowed}
                id="numberInput"
                onChange={() => {
                  setNumberAllowed((prev) => !prev)
                }}
              />
              <label htmlFor="">Characters</label>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
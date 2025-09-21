import react from "react";
import {useState ,useCallback ,useEffect} from "react";
function App(){
const [password,setPassword]=useState("");
const [copy,setcopy]=useState(false);
const [length,setLength]=useState(8);
const [number,setNumber]=useState(false);
const [character,setCharacter]=useState(false);
const passwordGenerator=useCallback(()=>{
  let pass="";
  let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  if(character){
    str+="!@#$%^&*()_+?><:{}[]";
  }
  if(number){
    str+="0123456789";
  }
  for(let i=0;i<=length;i++){
    let char=Math.random()*str.length+1;
    pass=pass+str.charAt(char);
  }
  setPassword(pass)

},[length,number,character])
useEffect(()=>{
  passwordGenerator();
},[length,number,character])
const copySelected=()=>{
  navigator.clipboard.writeText(password);
  setcopy(true);
  setTimeout(()=>{
    setcopy(false);
  },2000)
}
  return(
    <>
    <div className=" w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-30 bg-gray-500 text-black">
      <h1 className="text-center py-3 text-white text-1xl"> Random Password Generator</h1>
      <div className="flex shadow rounded-lg overflow-none mb-4">
        <input
        type="text"
        className="outline-none w-full py-1 px-3 bg-white"
        value={password}
        placeholder="Password"
        onChange={(e)=>setPassword(e.target.value)}
        ReadOnly>
        </input>
        <button className="outline-none bg-blue-500 text-white px-3 py-2  shrink-0 cursor-pointer"
        onClick={copySelected}
        >{copy?"Copied!":"Copy"}
        </button>
      </div >
      <div className="flex text-sm gap-x-2">
        <div className="flex items-center gap-x-1">
          <input
          type="range"
          min="6"
          max="100"
          className="cursor-pointer"
          onChange={(e)=>setLength(e.target.value)}
          value={length}> 
          </input>
          <label>Length : {length}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
            type="checkbox"
            id="number"
            defaultChecked={number}
            onChange={()=>{
              setNumber((pre)=>!pre);
            }}
            ></input>
            <label> Numbers</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input
          type="checkbox"
          id="symbol"
          defaultChecked={character}
          onChange={()=>{
            setCharacter((pre)=>!pre);
          }}
          >
          </input>
          <label>Symbols</label>
        </div>
      </div>
    </div>
    </>
  )
}
export default App;
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import './App.css'

function App() {
  
  const [Secondsleft , setSecondsleft] = useState(25*60);
  const [isactive , setisactive ] = useState(false);
  const sound = new Audio('./assets/mixkit-classic-short-alarm-993.wav');


  useEffect(()=>{
    let interval = null;
    if(isactive && Secondsleft>0){
      interval = setInterval(()=>{
        setSecondsleft((prev)=>prev-1);
      },1000)

    }else if (Secondsleft == 0){
      sound.play().catch(error=>console.log("error",error));
      
      clearInterval(interval);
      setisactive(false);
      alert("TIME IS UP ")
    }
    return ()=> clearInterval(interval);
  },[isactive , Secondsleft])


  const formate_time = ()=>{
    const min = Math.floor(Secondsleft/60);
    const sec = Secondsleft % 60
    return `${min.toString().padStart(2,'0')} : ${sec.toString().padStart(2,'0')}`;
  };
  useEffect(()=>{
    document.title = `${formate_time()} pomodoro`;
  },[Secondsleft])
  const [mode , setmode] = useState("deep");

  
  return (
    <>
    <div className={`main-container ${mode} `}>
      <div className='timer-container'>
        <h1 className="title">🍅 POMODORO 🍅</h1>
        <p className='p'>HI, nice to see you</p>
        <p className='p'>are you ready to start our</p><p className='p'> studying journy together</p>
        

        <div className='time'>
          <div className='real-time'>
          <span >{formate_time()}</span>
        </div>
        <div className='control'>
          <button onClick={()=>setisactive(!isactive)}>
            {isactive ? 'PAUSE' : 'START'}
          </button>
          <button onClick={()=>{setisactive(false);setSecondsleft(25*60);}}>RESET</button>

        </div>
      </div>
      <div className='btns'>
      <button className='break' onClick={()=>{setSecondsleft(5*60);setisactive(true);setmode("shallow");}}>Short break 5 min</button>
      <button className='break' onClick={()=>{setSecondsleft(15*60);setisactive(true);;setmode("deep");}}>Long break 15 min</button>
      <br></br>
      <button onClick={()=>{setSecondsleft(25*60);setisactive(true);setmode("shallow");}}>shallow learning</button>
      <button onClick={()=>{setSecondsleft(45*60);setisactive(true);setmode("deep");}}>Deep learning</button>
      
      </div>
    </div>
    
    </div>
    
    </>
  )
}

export default App

import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import './Register.css';
import axios from 'axios';

const Login = () => {
  const email = useRef(null);
  const password = useRef(null);
  const[msg,setMsg]=useState({});
  const navigate = useNavigate();

  const handleSubmit = async(e)=>{
    e.preventDefault();
    try{
      const response = await axios.post('http://localhost:8000/login',{
        email:email.current.value,
        password:password.current.value
      });
      setMsg(response.data);
    }catch(err){
      setMsg(err.response.data);
    }
    setTimeout(() => {
      setMsg({});
    }, 2000);
  }

  return (
    <section className="reg-container">
      <section className="reg">
        <form>
          <p className="header">Login</p>
          <label htmlFor="email">Email</label><br />
          <input type="text" name="email" ref={email}/><br />
          <label htmlFor="password">Password</label><br />
          <input type="password" name="password" ref={password}/><br />
          <p className="nav">Create a new account ? <span className='link' onClick={()=>navigate('/')}>register</span></p>
          {msg && (
            <p className={`msg msg-${msg.success ? 'success' : 'fail'}`}>{msg.message}</p>
          )}
          <div className="button-cont">
          <button className='reg-button' onClick={handleSubmit}>Login</button>
          </div>
        </form>
      </section>
    </section>
  )
}

export default Login
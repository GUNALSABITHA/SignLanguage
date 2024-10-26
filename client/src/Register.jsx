import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import './Register.css';
import axios from 'axios';

const Register = () => {
  const firstname = useRef(null);
  const lastname = useRef(null);
  const email = useRef(null);
  const password = useRef(null);
  const[msg,setMsg]=useState({});
  const navigate = useNavigate();

  const handleSubmit = async(e)=>{
    e.preventDefault();
    try{
      const response = await axios.post('http://localhost:8000/register',{
        firstname:firstname.current.value,
        lastname:lastname.current.value,
        email:email.current.value,
        password:password.current.value
      });
      console.log(response);
      setMsg(response.data);
      if(response.data.success){
        navigate('/login');
      }
    }catch(err){
      console.log(err);
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
          <p className="header">Register</p>
          <label htmlFor="firstname">Firstname</label><br />
          <input type="text" name="firstname" ref={firstname}/><br />
          <label htmlFor="lastname">Lastname</label><br />
          <input type="text" name="firstname" ref={lastname}/><br />
          <label htmlFor="email">Email</label><br />
          <input type="text" name="email" ref={email}/><br />
          <label htmlFor="password">Password</label><br />
          <input type="password" name="password" ref={password}/><br />
          <p className="nav">Already Have A Account ? <span className='link' onClick={()=>navigate('/login')}>Login</span></p>
          {msg && (
            <p className={`msg msg-${msg.success ? 'success' : 'fail'}`}>{msg.message}</p>
          )}
          <div className="button-cont">
          <button className='reg-button' onClick={handleSubmit}>Register</button>
          </div>
        </form>
      </section>
    </section>
  )
}

export default Register
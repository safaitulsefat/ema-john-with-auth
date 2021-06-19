
import React, { useContext, useState } from 'react';

import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router-dom';
import { createUserWithEmailAndPassword,handleFbSignIn, handleGoogleSignIn, handleSignOut, initializeLoginFramework, newUserEmailAndPassword, signInWithEmailAndPassword } from './LoginManager';


function Login() {
  const [newUser,setNewUser]=useState(false);
  const [user,setUser] = useState({
    isSignedIn:false,
    name:'',
    email:'',
    password:'',
    photo:'',
    error:'',
    success:''
  })
  initializeLoginFramework();
  const [logInUser,setLogInUser] = useContext(UserContext);

  const history = useHistory();
  const location =  useLocation();
  let { from } = location.state || { from: { pathname: "/" } };
  const handleResponse = (res,redirect) => {
      setUser(res);
      setLogInUser(res);
      if(redirect){
      history.replace(from);
      }
  }
  const googleSignIn = () => {
    handleGoogleSignIn()
    .then(res=>{
    handleResponse(res,true);
    })
  }
  
  const signOut = () =>{
    handleSignOut()
    .then(res => {
      handleResponse(res,false);
    })
  }
  const fbSignIn = ()=> {
    handleFbSignIn()
    .then(res => {
      handleResponse(res,true);
    })
  }
  
  
 
  const handleBlur = (e) => {
    let isFormValid = true;
    if(e.target.name === 'email'){
        isFormValid = /^[^\s@]+@[^\s@]+$/.test(e.target.value); 
    }
    if(e.target.name === 'password'){
        const isPasswordValid = e.target.value.length > 6;
        const passwordHasNumber = /\d{1}/.test(e.target.value);
        isFormValid = isPasswordValid && passwordHasNumber;
    }
    if(isFormValid){
       const newUserInfo = {...user};
       newUserInfo[e.target.name]=e.target.value;
       setUser(newUserInfo);
    
    }
    
  }
  const handleSubmit = (e)=>{
    if(newUser && user.email && user.password){
      createUserWithEmailAndPassword(user.name,user.email,user.password)
      .then(res=> {
        handleResponse(res,true);
      })
    }
    if(!newUser && user.email && user.password){
      signInWithEmailAndPassword(user.email,user.password)
      .then(res=> {
        handleResponse(res,true);
    })
 
  }
  e.preventDefault();
}
 

  return (
    <div className="App">
      {
        user.isSignedIn ? <button onClick={signOut}>Sing out</button>:
      <button onClick={googleSignIn}>Sing in</button>
       }
       <br/>
       <button onClick={fbSignIn}>facebook login</button>
      {
        user.isSignedIn && 
        <div>
           <p>welcome {user.name}</p>
           <p>your email: {user.email}</p>
           <img src={user.photo} alt="" />
           </div>
      }
      <h1>Our own authentication</h1>
      <input type="checkbox" onChange={()=>setNewUser(!newUser)} name="" id="" />
      <label htmlFor="newUser">new user sign up</label>
      <form onSubmit={handleSubmit}>
        {newUser && <input type="text" name="name" onBlur={handleBlur} placeholder="enter name" required />}
        <br/>
        <input type="text" name="email" onBlur={handleBlur} placeholder= "your email address" required/>
        <br/>
        <input type="password" name="password" onBlur={handleBlur} placeholder="Your password" required/>
        <br/>
        <input type="submit"  value={newUser ? 'sign up' : 'sign in'} />
      </form>
      
        <p style={{color:'red'}}>{user.error}</p>
        {
          user.success &&
        <p style={{color:'green'}}>User {newUser ? 'created' : 'Loged In Sucsessfully'}</p>


      }
      
    </div>
  );
}

export default Login;
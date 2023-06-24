import React, {useState} from 'react';
import styled from 'styled-components';
import { createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';

import { firebaseAuth } from "../utils/firebase-config";
import Header from '../components/Header';
import BackgroundImage from '../components/BackgroundImage';
import { useNavigate } from 'react-router-dom'; 




const SignUpPage = () => {
    const [showPassword, setShowPassword ] = useState(false);
    const [formValues, setformValues] = useState({email: "", password:""})
    const navigate = useNavigate()

    const handleSignIn = async()=>{
        try {
            const{email, password} = formValues
            await createUserWithEmailAndPassword(firebaseAuth, email, password)
        }catch (error){
            console.log(error)
        }
    }

onAuthStateChanged(firebaseAuth,(currentUser)=>{
    if(currentUser) navigate('/')
})


  return (
    <Container>
<BackgroundImage/>
<div className='content'>
<Header login/>
<div className='body'>
    <div className='text'>
        <h1>Unlimited movies, TV shows and more </h1>
        <h4>Watch anywhere. Cancel anytime.</h4>

        <h6>Ready to watch? Enter your email to create and restart your membership</h6>

    </div>
    <div className='form'>
        {
            showPassword ? (
                <input type='password' placeholder='password' name='password' 
                value={formValues.password}
                onChange={(e)=>setformValues({
                    ...formValues,[e.target.name]: e.target.value
                }) }
                />
        ): (  
        <input type="email" placeholder='email address' name="email"
        value={formValues.email}
        onChange={(e)=>setformValues({
            ...formValues,[e.target.name]: e.target.value
        }) }
        />
        )}
        {
            !showPassword ? (
                <button onClick={()=>setShowPassword(true)}>Get Started</button>
            ):<button on onClick={handleSignIn}>Sign Up</button>
        }
     
        
        
    </div>
</div>
</div>
    </Container>
  )
}

const Container = styled.div`
position: relative;
.content{
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(0,0,0,0.79); //background dims up with this code
    height: 100vh;
    width: 100vw;
    grid-template-columns: 15vh 85vh;
    .body{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

}
.text{
    display: flex;
    flex-direction: column;
    /* justify-content: center; */
    text-align: center;
    font-size: 2rem;
    color: white;
    margin-bottom: 6rem;
}
h1 {
  font-size: 3rem;
  font-weight: bold;
  padding: 0 10rem;
  margin-bottom: 10rem;
  margin-top: 6rem;
  color: white; 
}

h4 {
  font-size: 1.8rem;
  font-weight: bold;
  margin-bottom: 5rem;
  margin-top: -9rem;
  color: white; 
}

h6 {
  font-size: 1.2rem;
  color: white; 
  margin-top: -3rem;
  margin-bottom: -4rem;
}
.form{
    display: grid;
    width: 60%;
    grid-template-columns: ${({showPassword})=>showPassword? "1fr 1fr" : "2fr 1fr"};
    

input{
    color: white;
    background-color: black;
    padding: 1.5rem;
    font-size: 1.2rem;
    width: 45rem;
    &:focus{
        outline:none;
    }
}
button{
    padding: 0.5rem 1rem;
    background-color: red;
    border: none;
    cursor: pointer;
    color: white;
    font-size: 1.05rem;
    width: 10rem;
}

}
`
export default SignUpPage

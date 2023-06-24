// import React from 'react'
import React, { useState, useEffect } from 'react'


import styled from 'styled-components';
import { AiOutlineInfoCircle } from "react-icons/ai";
import {FaPlay} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import TopNav from '../components/Topnav';
import Card from '../components/Card';
import { fetchMovies, getGenre } from '../store';
import SliderContainer from '../components/SliderContainer';




const Netflix = () => {
  const [isScrolled, setIsScrolled] = useState(false);
   const navigate = useNavigate()

   const movies = useSelector((state)=> state.netflix.movies)

   const genreLoaded = useSelector((state)=> state.netflix.genreLoaded)

  const dispath= useDispatch()

  useEffect(()=>{
dispath(getGenre())

  },[])

  useEffect(()=>{
    if(genreLoaded){
      dispath(fetchMovies({type: "all"}))
    }
    
      })

  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true)
    return () => (window.onscroll = null)
  }
  // console.log(isScrolled)
  // console.log(movies)


  return (
    <HeroContainer>
    <div className='hero'>
      <TopNav isScrolled={isScrolled}/>
      <img 
      className="background-image"
      src='https://res.cloudinary.com/ehizeex-shop/image/upload/v1668267540/NetflixApp/avengers-age-of-ultron-team-together-poster-wallpaper-1600x600-92751_84_qvwbif.jpg'
        alt='hero image'
      />
      <div className="container">
    <div className='title'>
      <h1>Avengers</h1>
      <p>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repellendus facere est quod molestiae fuga totam neque quaerat expedita eos! Veniam fugiat consequatur quaerat non labore, pariatur dolore odit ab commodi!
      </p>
    </div>
    <div className='buttons'>
      <button onClick={()=>navigate('/player')} className='playButton'>Play</button>
      <button className='MoreButton'>More</button>

    </div>
      </div>

    </div>
   <SliderContainer movies={movies}/>
    </HeroContainer>
  );
};
const HeroContainer = styled.div `

.hero{
  position: relative;
  .background-image {
    filter:brightness(40%);

  }
  img{
    height: 70vh;
    width: 100%;
  }
  .container{
    position: absolute;
    bottom: 1rem;
    .title{
      h1 {
  margin-left: 5rem;
  text-transform: uppercase;
  font-size: 73px;
  background: linear-gradient(to right, #eee, rgb(128, 13, 13));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  color: transparent;
}

      p{
        margin-bottom: -50px;
        width: 640px;
        margin-left: 5rem;
        font-family: "lexend Deca", sans-serif;
        color: white;
      }
    }
    .buttons{
      display: flex;
      margin: 5rem;
      gap: 2rem;
    }
    .playButton{
      display: flex;
      align-items: center;
      justify-content: center;
      color: red;
      border-radius: 1rem;
      font-size: 1.4rem;
      gap: 1rem;
      padding: 0.9rem;
      padding-left: 2rem;
      padding-right: 2.4rem;
      border: none;
      cursor: pointer;
      transition: background-color 0.3s ease-in-out;
      &:hover {
    background-color: #ffffff;
  }
    
    }

    .MoreButton{
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      background-color: black;
      border-radius: 1rem;
      font-size: 1.4rem;
      gap: 1rem;
      padding: 0.9rem;
      padding-left: 2rem;
      padding-right: 2.4rem;
      border: 0.1rem solid white ;
      transition: background-color 0.3s ease-in-out, border-color 0.3s ease-in-out;

&:hover {
  background-color: #333333;
  border-color: #ffffff;
}
}
    
  }
   
}

`
export default Netflix

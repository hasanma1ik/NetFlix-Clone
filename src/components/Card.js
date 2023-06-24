import React,{useState} from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { AiFillPlayCircle } from 'react-icons/ai';
import { AiOutlinePlus } from "react-icons/ai";
import { RiThumbUpFill, RiThumbDownFill } from "react-icons/ri";
import { BiChevronDown } from "react-icons/bi";
import { BsCheck } from "react-icons/bs";

export default React.memo(function Card ({movieData}) {    //coming from movie slider
    const [onHovered, setOnHovered] = useState(false);
    const navigate = useNavigate();


    // const Card = ({movieData}) => {     //coming from movie slider
    //     const [onHovered, setOnHovered] = useState(false);
    //     const navigate = useNavigate();
  return (
    <CardContainer 
    onMouseEnter={()=>setOnHovered(true)}
    onMouseLeave={()=>setOnHovered(false)}
    >
 <img
  src={`https://image.tmdb.org/t/p/w500${movieData.image}`} 
 alt='movie poster'
 onClick={()=>navigate('/player')}
 />
 {
    onHovered && (
        <div className='hover'>
            <div className='image-video-wrapper'>
            <img src={`https://image.tmdb.org/t/p/w500${movieData.image}`} 
 alt='movie poster'
 onClick={()=>navigate('/player')}
 />

 <video src='https://res.cloudinary.com/ehizeex-shop/video/upload/v1668377666/NetflixApp/Action_mlw9wx.mp4'
autoPlay loop controls 
/>
            </div>
<div className='info-container'>
    <h3 className='movieName' onClick={()=>navigate('/player')}> {movieData.name}</h3>
    <div className='icons'>
        <div className='controls'>
            <AiFillPlayCircle
            title='play'
            onClick={()=>navigate('/player')}
            />
            <RiThumbUpFill title='like'/>
            <RiThumbDownFill title='dislike'/>
            <BsCheck title='Remove from list'/>
            <AiOutlinePlus title='Add to my list'/>
        </div>
        <div className='info'>
            <BiChevronDown title='More Info'/>
        </div>
    </div>
    <div className='genre'>
        <ul>
          {movieData.genre.map((genre)=>{
            <li> { genre } </li>
          })}
        </ul>

    </div>
</div>
        </div>
      
    )}

    </CardContainer>
   
  )
})  
const CardContainer = styled.div`
margin-top: 1rem;   //space in b/w the rockmovie 
max-width: 230px;
width: 230px;
height: 100%;
cursor: pointer;
position: relative;
background-color: red;
border-radius: 10px;
box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease-in-out;

  &:hover { //when u hover it will lift slightly up
    transform: translateY(-5px);
  }
  img {
  border-radius: 0.2rem;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 10;
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: scale(1.05);
  }
}
.hover{
    z-index: 99;
    height: max-content;
    width: 20rem;
    position: absolute;
    top: -18vh;
    left: 0;
    border-radius: 0.2rem;
    border: 0.1rem solid gray;
    background-color: #181818;
    transition: 0.3s ease-out;

    .image-video-wrapper {
  position: relative;
  height: 140px;

  img,
  video {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 0.3rem;
    position: absolute;
    top: 0;
    z-index: 4;
    transition: transform 0.3s ease-in-out;
  }

  img {
    filter: brightness(80%);
  }

  &:hover img {
    transform: scale(1.05);
  }

  &:hover video {
    transform: scale(1.1);
  }
}

    .info-container{
        display: flex;
        flex-direction: column;
        padding: 1rem;
        gap: 0.5rem;
        .movieName{
            color: white;
        }
    }
    .icons{
        display: flex;
        justify-content: space-between;
        .controls{
            display: flex;
            gap: 0.5rem;
        }
    
    svg{
        color: white;
        border: 0.1rem solid white;
        border-radius: 50%;
        font-size: 1.5rem;
        cursor: pointer;
        transition: 0.3s ease-in-out;
        &:hover{
            color: #b8b8b8;
        }
    }
    }
    .genre{
        display: flex;
        color: white;
        gap: 1rem;
        li{
            padding-right: 0.7rem;
            &:first-of-type{
                list-style-type: none;
            }
        }
    }
}



`


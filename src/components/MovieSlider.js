import React, {useState, useRef} from 'react'
import Card from './Card'
import styled from 'styled-components'
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai'

export default React.memo (function MovieSlider  ({ data, title }) { 
    const listRef = useRef()

    const [controlVisibility, setcontrolVisibility] = useState(false) 
    const [sliderPosition, setsliderPosition] = useState(0)
    const handleDirection = (direction)=>{
        let distance = listRef.current.getBoundingClientRect().x -70;
        if(direction === 'left' && sliderPosition >0){
            listRef.current.style.transform = `translateX(${230 + distance}px)`
            setsliderPosition(sliderPosition - 1)
        } //sliders this one to the left, the one below to the right

        if(direction === 'right' && sliderPosition < 4){
            listRef.current.style.transform = `translateX(${-230 + distance}px)`
            setsliderPosition(sliderPosition + 1)
        }
    }
    return (
        <Container
        controlVisibility = {controlVisibility}
        onMouseEnter={()=>setcontrolVisibility(true)}
        onMouseLeave={()=>setcontrolVisibility(false)}
        
        >
            <h1>{title}</h1>
            <div className='wrapper'>
                <div className={`slider-action left ${!controlVisibility ? 'none' : ''}`}>
                     <AiOutlineLeft onClick={()=> handleDirection('left')}/>
                </div>
            <div className='slider' ref={listRef}>

                {
                    data.map((movie, index) => {
                        return < Card movieData={movie} index={index} key={movie.id} />
                    })
                }

                
            </div>
            <div className={`slider-action right ${!controlVisibility ? 'none' : ''}`}>
                     <AiOutlineRight onClick={()=> handleDirection('right')}/>
                </div>
            
            </div>
        </Container>

    )
}) 
const Container = styled.div`
gap: 0.7rem;
position: relative;
padding: 1rem 0;
h1{
    margin-left: 5px;
    font-size: 25px;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    color: white;   // new releases all the subheadings are now in white

}
.wrapper{
    .slider{
        display: flex;
        width: max-content;
        gap: 0.6rem;
        transform: translate(0px);
        transition: 1s ease-in-out;
        margin-left: 5px;
    }
    .slider-action{
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        z-index: 99;
        height: 100%;
        top: 2rem;
         bottom: 0;
         width: 50px ;
         transition: 0.1s ease-in-out;
         &:hover {
    width: 70px;
    background-color: rgba(0, 0, 0, 0.5);
  }
         svg{
            font-size: 2rem;
            cursor: pointer;
            color: white;
            transition: color 0.2s ease-in-out;
         }
         &:hover svg { //color of arrows left and right
    color: #ff0000;
  }
    }
    .left{
        left:0
    }
    .right{
        right: 0;
    }
    .none{
        display: none;
    }
}
`

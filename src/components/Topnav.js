import React from "react";
import { FiLogOut } from 'react-icons/fi';
import styled from "styled-components";
 import { Link, useNavigate } from 'react-router-dom';
import { firebaseAuth } from "../utils/firebase-config";
import { onAuthStateChanged, signOut } from 'firebase/auth';

 



const TopNav = ({isScrolled}) => {

    const navlinks = [
        {name: "Home", link: '/'},
        {name: "Tv Shows", link: '/tv'},
        {name: "Movies", link: '/movies'},
        {name: "My List", link: '/mylist'},
        
    
    ];

  const navigate = useNavigate()
  onAuthStateChanged(firebaseAuth,(currentUser)=>{
    if(!currentUser) navigate('/login')
})

    return (

       <NavContainer>
        <nav className={`${isScrolled ? "scrolled" : "notScroll"}`}>
        <div className="LeftsideNav">
            <div className="Netflixlogo">
                <img src='https://res.cloudinary.com/ehizeex-shop/image/upload/v1668265433/NetflixApp/2560px-Netflix_2015_logo.svg_rbicwl_knwp6f.png'
                alt="Netflixlogo"
                />
            </div>
            <ul className="links">
                {
                    navlinks.map(({ name, link })=>{
                        return(
                            <li key={name}>
                                <Link to={link}>{name}</Link>
                            </li>
                        )
                    })
                }
            </ul>
        </div>

        <div className="RightsideNav">
        <button onClick={() => signOut(firebaseAuth)}>Logout</button>
                <FiLogOut/>
            
        </div>  
        </nav>
       </NavContainer>
    );
};

const NavContainer = styled.div `
.notScroll{
    display: flex;
}
.scrolled{
    display: flex;
    background-color: maroon;
}
nav{
    position: sticky;
    top: 0;
    height: 6rem;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    /* background-color: #000; */
    position: fixed;
    z-index: 2;
    color: #fff;
  padding: 1rem;
    padding: 0.4rem;
    align-items: center;
    transition: 0.3s ease-in-out;
    .LeftsideNav{
        display: flex;
        align-items: center;
        gap: 4rem;
        margin-left: 2rem;
    
    .Netflixlogo{
        display: flex;
        justify-content: center;
        align-items: center;
        height: 4rem;
    }
    img{
        width: 10rem;
        height: 2rem;
    }
}
.links{
    display: flex;
    list-style-type: none;
    gap: 3rem;
    li{
        a{
             color: #fff;
  text-decoration: none;
  font-size: 1.2rem;
  font-weight: bold;
        }
    }
}
}
.RightsideNav{
    display: flex;
    align-items: center;
    gap: 0.8rem;
    margin-right: 1rem;
    button{
        background-color: transparent;
  border: none;
  cursor: pointer;
  color: #fff;
  font-size: 1.2rem;

    }&:focus{
        outline: none;
    } svg{
        color: white;
        font-size: 2rem;
    }
}
`

export default TopNav;
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../LikedMovies.css';
import {ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import jwtDecode from 'jwt-decode';


const LikedMovies = ({match}) => {

const [likedMovies , setLikedMovies] = useState([]);
const [user, setUser] = useState();

useEffect(()=>{
    async function fetchData(){
        var jwt1 = localStorage.getItem('myToken');
        console.log(jwt1);
        if(jwt1)
        {
            const cUser = jwtDecode(jwt1);
            setUser(cUser.currentUser);
            console.log(cUser.currentUser);
            await axios.get(`https://popcorn-movie-review.herokuapp.com/liked-movies/${cUser.currentUser}`)
                .then(res => {
                    setLikedMovies(res.data);
                    console.log(likedMovies);
                })
                .catch(err => console.log(err))
        }
        else{
            window.location.href = '/account';
        }
    }
    fetchData();
},[]);

const deleteMovie = async(movie)=>{
    const details = {
        id: user,
        movie: movie.Title
    }
    console.log(details);
    await axios.post("https://popcorn-movie-review.herokuapp.com/delete-movie" , details)
    .then(res => {
        console.log(res.data);
        toast.info("Deleted Successfully!");
    })

    await axios.get(`https://popcorn-movie-review.herokuapp.com/liked-movies/${user}`)
         .then(res => {
             setLikedMovies(res.data);
             console.log(likedMovies);
         })
         .catch(err => console.log(err))
}


    return ( 
        <div>
        <center><h1 className='liked-title'>Your Wishlist</h1></center>
        <div className="liked-container">
            {likedMovies.map(m =>(
                <div className='liked-movie'>
                    <img src={m.Poster} alt="" width="230px" height="320px"/>
                    <center><h5>{m.Title}</h5></center>
                    <center><button className="btn btn-danger" onClick={() => deleteMovie(m)}>Delete</button></center>
                    <ToastContainer />
                </div>
            ))}
        </div>
        </div>

     );
}
 
export default LikedMovies;
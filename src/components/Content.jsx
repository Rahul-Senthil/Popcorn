import React,{ useEffect, useState } from 'react';
import {ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import shaw from './shaw.png';
import jwtDecode from 'jwt-decode';

const Content = (props) => {
    const {movie} = props;
    const [likedMovies , setLikedMovies] = useState([]);
    const [user, setUser] = useState();

    const static_movie = {
        Actors: "Tim Robbins, Morgan Freeman, Bob Gunton",
        Awards: "Nominated for 7 Oscars. 21 wins & 43 nominations total",
        BoxOffice: "$28,699,976",
        Country: "United States",
        DVD: "21 Dec 1999",
        Director: "Frank Darabont",
        Genre: "Drama",
        Language: "English",
        Plot: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
        Poster: "https://m.media-amazon.com/images/M/MV5BMDFkYTc0MGEtZmNhMC00ZDIzLWFmNTEtODM1ZmRlYWMwMWFmXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg",
        Production: "N/A",
        Rated: "R",
        Ratings: [{Source: 'Internet Movie Database', Value: '9.3/10'}],
        Released: "14 Oct 1994",
        Response: "True",
        Runtime: "142 min",
        Title: "The Shawshank Redemption",
        Writer: "Stephen King, Frank Darabont"
    }

    useEffect(()=>{
        async function fetchData(){
            var jwt1 = localStorage.getItem('myToken');
            if(jwt1)
            {
                const cUser = jwtDecode(jwt1);
                setUser(cUser.currentUser);
                await axios.get(`https://popcorn-movie-review.herokuapp/liked-movies/${cUser.currentUser}`)
                .then(res => {
                    setLikedMovies(res.data);
                    console.log(likedMovies);
                })
                .catch(err => console.log(err))
            }
        }
        fetchData();
    },[]);

    const addMovie = async(movie) => 
    {
        console.log(user);
        if (user) {
            let duplicate = false;
            likedMovies.map(m => {
            console.log(m.Title);
            if(m.Title ===  movie.Title)
            {
                duplicate = true;
            }
            })
            if(duplicate ===  false)
            {
                const details = {
                    id: user,
                    movie
                }
                console.log(details);
                await axios.post("https://popcorn-movie-review.herokuapp/add-movie" , details)
                .then(res => {
                    console.log(res.data);
                    toast.success("Added to your wishlist");
                })
            }
            else
            {
                toast.warning("Already in your wishlist!");
            }
        }
        else{
            window.location.href = '/account';
        }
    }

    if(movie){
        if(movie.Response === 'False')
        {
            return(
                <center><h4>Sorry!! No such movie found :)</h4></center>
            )
        }
        else{
            return ( 
                <div className="container">
                    <div className="row">
                        <div className="col-lg-4 movie">
                            <img src={movie.Poster} alt="" width="300px" id="img" className="mx-3"/>
                        </div>
                        <div className="col-lg-8">
                            <h1>{movie.Title? movie.Title : " "}</h1>
                            <p></p>
                            {movie.Actors === 'N/A'?  "" : <p><b>Starring:</b> {movie.Actors}</p>}
                            {movie.Director === 'N/A'?  "" : <p><b>Director:</b> {movie.Director}</p>}
                            {movie.Writer === 'N/A'?  "" : <p><b>Writer:</b> {movie.Writer}</p>}
                            {movie.Genre === 'N/A'?  "" : <p><b>Genre:</b> {movie.Genre}</p>}
                            {movie.Plot === 'N/A'?  "" : <p><b>Plot:</b> {movie.Plot}</p>}
                            {/* {movie.Ratings.map(m =>(
                                <p>{m.Source}: {m.Value}</p>
                            ))} */}
                             {movie.Ratings[0] === 'N/A'?  "" : <p><b>Rating: </b>{movie.Ratings[0].Source} - {movie.Ratings[0].Value}</p>}
                             {movie.Language === 'N/A'?  "" : <p><b>Language:</b> {movie.Language}</p>}
                             {movie.Released === 'N/A'?  "" : <p><b>Released:</b> {movie.Released}</p>}
                             {movie.Runtime === 'N/A'?  "" : <p><b>Runtime:</b> {movie.Runtime}</p>}
                             {movie.Awards === 'N/A'?  "" : <p><b>Awards:</b> {movie.Awards}</p>}
                            <button className="btn btn-info" onClick={() => addMovie(movie)}>Add to Wishlist</button> {/*add to db*/}
                            <ToastContainer />
                        </div>
                    </div>   
                </div>
             );
        }
    }
    else{
        return(
            <div>
            <img src={shaw} alt="" width="100%"/>
            <div className="container" style={{"margin-top":"30px","margin-bottom":"50px"}}>
                    <div className="row">
                        <div className="col-lg-4 movie">
                            <img src={static_movie.Poster} alt="" width="300px" id="img" className="mx-3"/>
                        </div>
                        <div className="col-lg-8">
                            <h1>{static_movie.Title? static_movie.Title : " "}</h1>
                            <p></p>
                            {static_movie.Actors === 'N/A'?  "" : <p><b>Starring:</b> {static_movie.Actors}</p>}
                            {static_movie.Director === 'N/A'?  "" : <p><b>Director:</b> {static_movie.Director}</p>}
                            {static_movie.Writer === 'N/A'?  "" : <p><b>Writer:</b> {static_movie.Writer}</p>}
                            {static_movie.Genre === 'N/A'?  "" : <p><b>Genre:</b> {static_movie.Genre}</p>}
                            {static_movie.Plot === 'N/A'?  "" : <p><b>Plot:</b> {static_movie.Plot}</p>}
                            {/* {movie.Ratings.map(m =>(
                                <p>{m.Source}: {m.Value}</p>
                            ))} */}
                             {static_movie.Ratings[0] === 'N/A'?  "" : <p><b>Rating: </b>{static_movie.Ratings[0].Source} - {static_movie.Ratings[0].Value}</p>}
                             {static_movie.Language === 'N/A'?  "" : <p><b>Language:</b> {static_movie.Language}</p>}
                             {static_movie.Released === 'N/A'?  "" : <p><b>Released:</b> {static_movie.Released}</p>}
                             {static_movie.Runtime === 'N/A'?  "" : <p><b>Runtime:</b> {static_movie.Runtime}</p>}
                             {static_movie.Awards === 'N/A'?  "" : <p><b>Awards:</b> {static_movie.Awards}</p>}
                            <button className="btn btn-info" onClick={() => addMovie(static_movie)}>Add to Wishlist</button> {/*add to db*/}
                            <ToastContainer />
                        </div>
                    </div>   
                </div>
                </div>
        )
    }
}
 
export default Content;
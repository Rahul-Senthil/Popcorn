import React, { useState } from 'react';
import Content from './Content';
import RecentMovies from './RecentMovies';

const Review = () => {

const api_key = '8b56e275';

const [movie , setMovie] = useState('');
const [recentMovies , setRecentMovies] = useState([]);

const removeDuplicate = movieData =>{
    if(!recentMovies.find(movie => movie.Title === movieData.Title) && movieData.Response !== 'False')
    {
        if(recentMovies.length<=4)
        {
            recentMovies? setRecentMovies([...recentMovies , movieData]) : setRecentMovies([movieData]);
        }
        else{
            recentMovies.reverse().pop();
            recentMovies.reverse();
            setRecentMovies([...recentMovies , movieData]);
        }
    }
    else{
        console.log("Duplicate found");
    }
}

const searchInput = React.createRef();
const handleSearch = async(e) => {
    e.preventDefault();
    const query = searchInput.current.value;
    const url = `https://www.omdbapi.com/?t=${query}&apikey=${api_key}`;
    const response = await fetch(url);
    const movieData = await response.json();
    console.log(movieData);
    setMovie(movieData);
    removeDuplicate(movieData);
    console.log("Recent Movies: ", recentMovies);
};






    return ( 
    <React.Fragment>
     <div className="container my-4">
     <div className="row">
         <div className="col-lg-6 mx-auto">
             <div className="d-flex">
                 <input className="form-control me-3" type="search" placeholder="Search" ref={searchInput}/>
                 <button className="btn btn-outline-dark" type="submit" onClick={handleSearch}>Search</button>
               </div>
         </div>
     </div>
 </div>
 <Content movie={movie}/>
 <RecentMovies recentMovies = {recentMovies} currentMovie={movie}/>

 
 </React.Fragment>
     );
}
 
export default Review;
import React from 'react';
import '../RecentMovies.css';


const RecentMovies = props => {
 
    const {recentMovies , currentMovie} = props;
    
    if(recentMovies.length!==0)
    {
        return(
            (
                <div>         
                <div className='recent-movies'>
                    {recentMovies.slice().reverse()
                    .map(m => (
                            (m.Title!==currentMovie.Title?<div className="recent-poster"><img src={m.Poster} alt="" width="300px" height="400px"/><center><h5>{m.Title}</h5></center></div> : "")
                    ))}
                </div>
                </div>
            )
        );
    }
    else{
        return(
            <h2></h2>
        )
    }
}
 
export default RecentMovies;
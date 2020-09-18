import React, { useState, useEffect } from 'react'
import './Row.css'
import axios from './axios';



function Row({ title, fetchUrl, isLargeRow }) {

    const base_url = 'https://image.tmdb.org/t/p/original/';

    const [movies, setMovies] = useState([]);

    useEffect(() => {

        // this is required because you can not call async function inside use effect hook. thus, needs separate function
        async function fetchData() {
            const request = await axios.get(fetchUrl);
            setMovies(request.data.results);
        }

        fetchData();
    }, [fetchUrl]);


    return (
        <div className='row'>
            <h2>{title}</h2>
            <div className="row__posters">
                {movies?.map(movie => (
                    <img
                        key={movie.id}
                        className={`row__poster${isLargeRow ? " row__posterLarge" : ""}`}
                        src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
                        alt={movie.title ? movie.title : movie.name} />
                ))}
            </div>

        </div>
    )
}

export default Row

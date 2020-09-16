import React, { useState, useEffect } from 'react'
import './Row.css'
import axios from './axios';



function Row({ title, fetchUrl }) {

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

    console.log(movies);

    return (
        <div className='row'>
            <h2>{title}</h2>
            <div className="row__posters">
                {movies?.map(movie => (
                    <img
                        className='row__poster'
                        src={base_url + movie.poster_path}
                        alt={movie.name} />

                ))}
            </div>

        </div>
    )
}

export default Row

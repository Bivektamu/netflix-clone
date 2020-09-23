import React, { useState, useEffect } from 'react'
import './Row.css'
import axios from './axios';
import Youtube from 'react-youtube';
import movieTrailer from 'movie-trailer'


function Row({ title, fetchUrl, isLargeRow }) {

    const base_url = 'https://image.tmdb.org/t/p/original/';

    const [movies, setMovies] = useState([]);
    const [trailerUrl, setTrailerUrl] = useState('');

    useEffect(() => {

        // this is required because you can not call async function inside use effect hook. thus, needs separate function
        async function fetchData() {
            const request = await axios.get(fetchUrl);
            setMovies(request.data.results);
        }

        fetchData();
    }, [fetchUrl]);

    const opts = {
        height: '390',
        width: '100%',
        playerVars: {
            autoplay: 1,
        }

    };

    const handleOnClick = (movie) => {
        console.log(movie);
        console.log(trailerUrl);
        if (trailerUrl) {
            setTrailerUrl('');
        }
        else {
            movieTrailer(movie?.name || movie?.title || "")
                .then(url => {
                    const urlParams = new URLSearchParams(new URL(url).search);
                    setTrailerUrl(urlParams.get('v'));

                }).catch(error => console.log(error));
        }
    }


    return (
        <div className='row'>
            <h2>{title}</h2>
            <div className="row__posters">
                {movies?.map(movie => (
                    <img
                        key={movie.id}
                        onClick={() => handleOnClick(movie)}
                        className={`row__poster${isLargeRow ? " row__posterLarge" : ""}`}
                        src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
                        alt={movie.title ? movie.title : movie.name} />
                ))}
            </div>

            {trailerUrl && <>
                <div className="trailer">
                    <a className="close__btn" onClick={() => setTrailerUrl('')}></a>
                    <Youtube videoId={trailerUrl} opts={opts} />
                </div>
            </>}

        </div>
    )
}

export default Row

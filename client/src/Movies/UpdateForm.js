import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {useParams} from 'react-router-dom';


const initialState = {
    title: '',
    director: '',
    metascore: '',
    stars: []
};

const UpdateForm = props => {
console.log('this is props on update form', props);
const [movie, setMovie] = useState(initialState);
const {id} = useParams();

useEffect(() => {
    const movieToUpdate = props.movieList.find(film => `${film.id}` === id);
    if (movieToUpdate) {
        setMovie(movieToUpdate);
    }
}, [props.movieList, id]);

const handleChanges = e => {
    e.persist();
    let value = e.target.value;
    if (e.target.name === 'stars') {
        value = value.split(',')
    }
    if (e.target.name === 'metascore') {
        value = parseInt(value, 10);
    }
    setMovie({
        ...movie,
        [e.target.name]: value
    })
}
const handleSubmit = e => {
    e.preventDefault();

    axios
    .put(`http://localhost:5000/api/movies/${id}`, movie)
    .then(res => {
        console.log('this is the res.data from handle submit', res.data)
        props.getMovieList();
        props.history.push('/');
    })
    .catch(err => console.log(err));
}
return (
    <div>
        <form onSubmit={handleSubmit}>
            <input type='text' placeholder='title' name='title' value={movie.title} onChange={handleChanges}/>
            <input type='text' placeholder='director' name='director' value={movie.director} onChange={handleChanges}/>
            <input type='text' placeholder='metascore' name='metascore' value={movie.metascore} onChange={handleChanges}/>
            <input type='text' placeholder='stars' name='stars' value={movie.stars} onChange={handleChanges}/>
            <button type='submit'>Edit Movie</button>
        </form>
    </div>
    )
}
export default UpdateForm;
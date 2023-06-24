import {
    configureStore,
     createAsyncThunk,
     createSlice,
} from '@reduxjs/toolkit';

import axios from 'axios';
import { MY_API_KEY, TMDB_BASE_URL } from '../utils/constant';


const initialState = {
    movies: [], 
    genreLoaded: false,
    genre: []
}
export const getGenre = createAsyncThunk("netflix/genre", async()=>{
   const {data: {genre},} = await axios.get(`${TMDB_BASE_URL}/genre/movie/list?api_key=${MY_API_KEY}`);
//    console.log(genre);
   return genre;
});

const arrayOfMovieData = (array, moviesArray, genre)=>{
    array.forEach((movie)=>{
        const moviesGenre = []
        movie.genre_ids.forEach((genre)=>{
            const name = moviesGenre.find(({id})=> id === genre)
            if(name) moviesGenre.push(name.name)
        })
        if(movie.backdrop_path)
        moviesArray.push({
            id: movie.id,
            name: movie?.original_name ? movie.original_name : movie.original_title,
            image: movie.backdrop_path,
            genre: moviesGenre.slice(0,2)
        })
    })
}

const getMovieData = async(api, genre, paging = false)=>{
    const moviesArray = []
    for (let i = 1; moviesArray.length < 80 &&  i < 10; i++){
      const {data: {results},} =  await axios.get(`${api}${paging ? `&page=${i}`: ""}`)
        arrayOfMovieData( results, moviesArray, genre)
    }
    return moviesArray
}

export const fetchMovies = createAsyncThunk("netflix/trending", async({type}, myThunk)=>{
    const {netflix: {genre}, } = myThunk.getState()
    return getMovieData(`${TMDB_BASE_URL}/trending/${type}/week?api_key=${MY_API_KEY}`, genre, true);
    // console.log(data)

})

const NetflixSlice = createSlice({
    name: "Netflix",
    initialState,
    extraReducers: (builder)=>{
        builder.addCase(getGenre.fulfilled, (state, action)=>{
            state.genre = action.payload;
            state.genreLoaded = true
        });
        builder.addCase(fetchMovies.fulfilled, (state, action)=>{
            state.movies = action.payload;
           
        });
    }

})

export const store = configureStore ({
    reducer:{
        netflix:NetflixSlice.reducer
    }
})
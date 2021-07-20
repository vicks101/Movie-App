import React from 'react';
import { data } from '../data';
import Navbar from './Navbar';
import MovieCard from './MovieCard';
import {addMovies, setShowFavourites} from '../actions'

class App extends React.Component {
 componentDidMount(){
   //make api
   this.props.store.subscribe(()=>{
      this.forceUpdate();//never use
   });
   this.props.store.dispatch(addMovies(data));
   console.log('STATE',this.props.store.getState());
 }
 isMovieFavourite=(movie)=>{
   const {favourites}=this.props.store.getState();
   const index=favourites.indexOf(movie);
   if(index!==-1) return true;
   return false;
 }
 onChangeTab=(val)=>{
   this.props.store.dispatch(setShowFavourites(val));
 }
  render(){
    const {list,favourites,showFavourites}=this.props.store.getState();
    const displayMovies=showFavourites ? favourites:list;
    console.log('RENDER');
    console.log("MY FAV MOVIES", this.props.store.getState());
  return (
    <div className="App">
      <Navbar/>
      <div className="main">
        <div className="tabs">
        <div className={`tab ${showFavourites ?' ':'active-tabs'}`} onClick={()=>this.onChangeTab(false)}> Movies</div>
        <div className={`tab ${showFavourites ?'active-tabs':' '}`} onClick={()=>this.onChangeTab(true)}> Favourite</div> 
      </div>
      <div className="list">
        {displayMovies.map((movie,index)=>(
          <MovieCard movie={movie} 
          key={`movies-${index}`} 
          dispatch={this.props.store.dispatch} 
          isFavourite={this.isMovieFavourite(movie)}
          />

        ))}
      <div>
        {displayMovies.length===0 ?<div className="no-movies"> No Movies to display ! </div> :null}
      </div>  
         </div>
        </div>
    </div>
  );
}
}

export default App;

import React from 'react'
import cardStyle from './card.module.css'
import { BsHeart, BsHeartFill } from "react-icons/bs";
export const Card = ({src, id, updateFunc}) => {

  // const [isLiked, setLiked] = useState(false);
  const addCatLikeList = () => {
    if(localStorage.getItem('likeList')){
      let likedCats = JSON.parse(localStorage.getItem('likeList'));

      if(!likedCats.filter(e => e.id === id).length > 0){
        likedCats.push({id: id, url: src});
      }
      else{
        likedCats = likedCats.filter(e => e.id !== id);
      }

      
      localStorage.setItem('likeList', JSON.stringify(likedCats))
    }
    else{
      localStorage.setItem('likeList', JSON.stringify([{id: id, url: src}]))
    }
    updateFunc()
  }
  return (
    <div className={cardStyle.card}>
      <img src={src} alt='Котик'></img>
      <button onClick={addCatLikeList}><BsHeartFill className={cardStyle.icon}/><BsHeart className={cardStyle.icon}/></button>
    </div>
  )
}

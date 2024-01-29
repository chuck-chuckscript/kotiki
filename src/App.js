
import './App.css';
import { Card } from './components/Card/Card';
import { useEffect, useMemo, useState } from 'react';
import ApiService from './service/ApiService';
import { Loader } from './components/Loader/Loader';

function App() {
  const [cats, setCats] = useState([]);
  const [update, setUpdate] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [showLiked, setShowLiked] = useState(false);
  const [likedCats, setLikedCats] = useState([])
  const asyncGetCats = async () => {
    setLoading(true);
    let data = await ApiService.getCats();
    console.log(data)
    setCats([...data]);
    if(localStorage.getItem('likeList')){
      let likedCats = JSON.parse(localStorage.getItem('likeList'));


      setLikedCats([...likedCats]);
    }
    else{
      localStorage.setItem('likeList', JSON.stringify([]));
      let likedCats = JSON.parse(localStorage.getItem('likeList'));


      setLikedCats([...likedCats]);
    }
    setLoading(false);

    
  }
  useEffect(() => {
    asyncGetCats();
  }, [])


  useEffect(() => {


    if(update){
      let likedCats = JSON.parse(localStorage.getItem('likeList'));


      setLikedCats([...likedCats]);
      setUpdate(false);
    }
  }, [update])

  const allCats = useMemo(() => {
    return cats.map(e => <Card key={e.id} id={e.id} src={e.url} updateFunc={() => setUpdate(true)}/>)
  }, [cats])

  const allLikedCats = useMemo(() => {
    return likedCats.map(e => <Card key={e.id} id={e.id} src={e.url} updateFunc={() => setUpdate(true)}/>)
  }, [likedCats])

  return (
    <div className="App">
      <header className="header">
        <button onClick={() => setShowLiked(false)}>Все котики</button>
        <button onClick={() => setShowLiked(true)}>Любимые котики</button>
      </header>
      {
        isLoading
        ?
        <Loader/>
        :
        <>
          {
            showLiked 
            ?
            <section className='cats-list'>
            {allLikedCats.length !== 0 ? allLikedCats : <h1>Нет понравившихся котиков</h1>}
            </section>
            :
            <section className='cats-list'>
            {allCats}
            </section>
          }
        </>
      }
      
      
    </div>
  );
}

export default App;

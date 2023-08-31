import './App.css';
import PhotoCard from './Components/PhotoCard';
import { useEffect, useState } from 'react';
import axios from "axios"

function App() {
  const [data,setData] = useState([]);
  const [page,setPage] = useState(32);
  const [loading,setLoading] = useState(false);
  const [endMsg,setEndMsg] = useState(false);

  const fetchData = ()=>{
    setLoading(true)
    axios.get(`https://picsum.photos/v2/list?page=${page}`)
    .then(res=>{
      if(res.data.length){
      setData([...data,...res.data]);
      setLoading(false);
    }
      else{
        setEndMsg(true);
        setLoading(false)
        window.removeEventListener("scroll",loadNewContent);
      }
    }).catch(err=>console.log(err));
  }

  useEffect(()=>{
    fetchData();
    window.addEventListener("scroll",loadNewContent);
    return ()=>{
      window.removeEventListener("scroll",loadNewContent);
    }
  },[page]);

  const loadNewContent=()=>{
    const bottom = Math.floor(document.documentElement.scrollHeight - document.documentElement.scrollTop) === document.documentElement.clientHeight;
    if(bottom){
   setPage(page=>page+1)
    }
  }

  return (
    <div className="App">
        <h1>Photo Gallery</h1>
        <div className="App-photoCard-div">
        {
          data?.map((ele,index)=>
          <div key={index}>
          <PhotoCard 
          photoURL = {ele.download_url}
          author = {ele.author}
          />
          </div>
          )
        }
        {loading?<h2>Loading Content...</h2>:null}
        {endMsg?<h3>You are all caught up!</h3>:null}
       </div>
    </div>
  );
}

export default App;

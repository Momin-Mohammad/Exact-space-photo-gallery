import { useState } from "react";
import styles from "./PhotoCard.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';

export default function PhotoCard({photoURL,author}){
    const[likes,setLikes] = useState(0);
    const IncrementLikes = ()=>{
        setLikes(likes => likes+1);
    }
    return(
        <div className={styles.PhotoCard_MainDiv}>
            <img 
            className={styles.PhotoCard_Photo}
            src={photoURL} alt="display image" />
            <p>{author}</p>
            <FontAwesomeIcon 
            cursor={"pointer"}
            onClick={IncrementLikes} 
            size="lg"
            icon={faThumbsUp} color="rgb(55, 134, 219)"/>
            <p>{likes}</p>
        </div>
    )
}
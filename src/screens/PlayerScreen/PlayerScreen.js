import React, { useState, useEffect } from 'react'
//Importing Styles
import "./PlayerScreen.scss";
//Importing Firebase
import { auth, googleProvider } from "../../firebase";
import db from "../../firebase";
//Importing Components
import Song from '../../components/song/Song';
import Player from '../../components/player/Player';

const PlayerScreen = () => {
    const [songs, setSongs] = useState([]);
    const [currentSong, setCurrentSong] = useState({});
    const [isPlaying, setIsPlaying] = useState(false);
    useEffect(() => {
        //Importing Songs array from firebase
        db.collection('songs').onSnapshot(snapshot => (
            setSongs(snapshot.docs.map(doc => doc.data()))
        ))
        setCurrentSong(songs[0])
    }, [songs])

    return (
        <div className="player">
            <div className="player__header">
                <h1>Debadrita Ghosh</h1>
                <h4>Logout</h4>
            </div>
            <div className="player__body">
                <Song currentSong={currentSong} />
                <Player
                    currentSong={currentSong}
                    isPlaying={isPlaying}
                    setIsPlaying={setIsPlaying}
                />
            </div>
        </div>
    )
}

export default PlayerScreen;

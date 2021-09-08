import React, { useState, useEffect, useRef } from 'react'
//Importing Styles
import "./PlayerScreen.scss";
//Importing Firebase
import { auth } from "../../firebase";
import db from "../../firebase";
//Importing Components
import Song from '../../components/song/Song';
import Player from '../../components/player/Player';
import Library from '../../components/library/Library';
//React Router
import { Redirect } from 'react-router';

const PlayerScreen = ({ userDetail, setUserDetail }) => {
    const [songs, setSongs] = useState([]);
    const [currentSong, setCurrentSong] = useState({});
    const [isPlaying, setIsPlaying] = useState(false);
    //Ref
    const audioRef = useRef(null);
    const [songInfo, setSongInfo] = useState({
        currentTime: 0,
        duration: 0
    });
    useEffect(() => {
        //Importing Songs array from firebase
        const subsscribe = db.collection('songs').onSnapshot(snapshot => (
            setSongs(snapshot.docs.map(doc => doc.data()))
        ));
        // eslint-disable-next-line no-mixed-operators
        if (currentSong === undefined || Object.keys(currentSong).length === 0 && currentSong.constructor === Object) {
            setCurrentSong(songs[0]);
        }
        return () => {
            subsscribe();
        }
    }, [songs, currentSong]);

    //Function for Updating Audio Time
    const timeUpdateHandler = (e) => {
        const current = e.target.currentTime;
        const duration = e.target.duration;
        setSongInfo({ ...songInfo, currentTime: current, duration: duration });
    }
    const logOutHandler = () => {
        auth.signOut();
        setUserDetail(
            {
                ...userDetail,
                name: '',
                id: 0,
                email: '',
                pic: ''
            }
        )
    }

    if (userDetail.id === 0) {
        return (
            <Redirect to="/login" />
        )
    }
    return (
        <div className="player">
            <div className="player__header">
                <div className="player__headerLeft">
                    <div className="player__headerLeft-top">
                        <h5>Hii, </h5>
                        <h5 className="username">{userDetail.name}</h5>
                    </div>
                    <h2>Welcome Back</h2>
                </div>
                <div className="player__headerRight">
                    <img src={userDetail.pic ? userDetail.pic : 'https://img.icons8.com/color/2x/user.png'} alt="profile" />
                    <p onClick={logOutHandler}>Logout</p>
                </div>
            </div>
            <div className="player__body">
                <div className="player__main">
                    <Song currentSong={currentSong} />
                    <Player
                        currentSong={currentSong}
                        setCurrentSong={setCurrentSong}
                        isPlaying={isPlaying}
                        setIsPlaying={setIsPlaying}
                        audioRef={audioRef}
                        songInfo={songInfo}
                        setSongInfo={setSongInfo}
                        songs={songs}
                    />
                </div>
                <Library
                    songs={songs}
                    setCurrentSong={setCurrentSong}
                    setIsPlaying={setIsPlaying}
                />
            </div>
            <audio
                onTimeUpdate={timeUpdateHandler}
                onLoadedMetadata={timeUpdateHandler}
                ref={audioRef}
                src={currentSong?.audio} ></audio>
        </div>
    )
}

export default PlayerScreen;

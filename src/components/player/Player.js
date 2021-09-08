import React, { useState, useRef } from 'react'
//Importing Styles
import "./Player.scss";
//Importing Font Awesome Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faAngleLeft, faAngleRight, faPause } from "@fortawesome/free-solid-svg-icons";

const Player = ({ currentSong, setCurrentSong, songs, setSongInfo, songInfo, setIsPlaying, isPlaying, audioRef }) => {

    //Function for Play Music
    const playSongHandler = () => {
        if (isPlaying) {
            audioRef.current.pause();
            setIsPlaying(!isPlaying);
        }
        else {
            audioRef.current.play();
            setIsPlaying(!isPlaying);
        }
    }

    //Function For Formatting the Time
    const getTime = (time) => {
        return (
            Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
        );
    }
    //Function for Dragable Range
    const dragHandler = (e) => {
        audioRef.current.currentTime = e.target.value;
        setSongInfo({ ...songInfo, currentTime: e.target.value })
    }

    const goBackWard = () => {
        if (setCurrentSong.id === 0) {
            setCurrentSong(songs[0])
        }
        else {
            setCurrentSong(songs[currentSong.id - 1])
        }
        setIsPlaying(false);
    }

    const goForWard = () => {
        const arrayLen = songs.length - 1;
        console.log(arrayLen);
        if (setCurrentSong.id === arrayLen) {
            console.log(songs[arrayLen])
        }
        else {
            setCurrentSong(songs[currentSong.id + 1])
        }
        setIsPlaying(false);
    }

    return (
        <div className="playerC">
            <div className="playerC__timeControl">
                <p>{getTime(songInfo.currentTime)}</p>
                <input
                    min={0}
                    max={songInfo.duration}
                    value={songInfo.currentTime}
                    type="range"
                    onChange={dragHandler}
                />
                <p>{songInfo.duration ? getTime(songInfo.duration) : "0:00"}</p>
            </div>
            <div className="PlayerC__playControl">
                <FontAwesomeIcon
                    className="skip-back"
                    size="2x"
                    icon={faAngleLeft}
                    onClick={goBackWard}
                />
                <FontAwesomeIcon
                    className="play"
                    size="2x"
                    icon={isPlaying ? faPause : faPlay}
                    onClick={playSongHandler}
                />
                <FontAwesomeIcon
                    className="skip-forward"
                    size="2x"
                    icon={faAngleRight}
                    onClick={goForWard}
                />
            </div>
        </div>
    )
}

export default Player

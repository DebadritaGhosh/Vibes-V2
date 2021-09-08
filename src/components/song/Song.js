import React from 'react'
import "./Song.scss";

const Song = ({ currentSong }) => {
    return (
        <div className="song">
            <img src={currentSong?.cover} className="outerImg" alt="SongImage" />
            <div className="overlay">
                <img src={currentSong?.cover} className="InnerImg" alt="SongImage" />
                <h2>{currentSong?.name}</h2>
                <h3>{currentSong?.artist}</h3>
            </div>

        </div>
    )
}

export default Song;

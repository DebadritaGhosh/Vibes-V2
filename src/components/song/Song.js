import React from 'react'
import "./Song.scss";

const Song = ({ currentSong }) => {
    return (
        <div className="song">
            <img src={currentSong?.cover} alt="SongImage" />
            <h2>{currentSong?.name}</h2>
            <h3>{currentSong?.artist}</h3>
        </div>
    )
}

export default Song;

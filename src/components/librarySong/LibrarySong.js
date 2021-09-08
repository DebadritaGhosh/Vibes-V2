import React from 'react'
import "./LibrarySong.scss";

const LibrarySong = ({ songs, song, setCurrentSong, setIsPlaying }) => {
    const songPlayHandler = async () => {
        setCurrentSong(songs[song.id]);
        console.log(songs[song.id])
        setIsPlaying(false);
    }
    return (
        <div className="librarySong" onClick={songPlayHandler}>
            <img src={song?.cover} alt="SongImage" />
            <div className="librarySong__songDetail">
                <h3>{song?.name}</h3>
                <h4>{song?.artist}</h4>
            </div>
        </div>
    )
}

export default LibrarySong;

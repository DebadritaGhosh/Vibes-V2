import React from 'react'
import "./Library.scss";
//Importing Components
import LibrarySong from '../librarySong/LibrarySong';

const Library = ({ songs, setCurrentSong, setIsPlaying }) => {
    return (
        <div className="library">
            <h2>Library</h2>
            <div className="library__song">
                {
                    songs.map((song) => (
                        <LibrarySong
                            song={song}
                            songs={songs}
                            setCurrentSong={setCurrentSong}
                            key={song.id}
                            setIsPlaying={setIsPlaying}
                        />
                    ))
                }
            </div>
        </div>
    )
}

export default Library;

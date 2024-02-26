import React, { useState } from 'react';
import axios from 'axios';
import './Spc.css';
import Login from './login';
import Navigate from './Navigation';


export default function PlaylistCreator() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedSongs, setSelectedSongs] = useState([]);
  const [playlistName, setPlaylistName] = useState("");
  const [accessToken, setAccessToken] = useState("");


  // Function to search for songs
  const searchSongs = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      }
    }
    try {
      const response = await axios.get(`https://api.spotify.com/v1/search?q=${searchTerm}&type=track`, config);
      setSearchResults(response.data.tracks.items);
    } catch (error) {
      console.error('Error fetching songs:', error);
    }
  };

  // Function to add a song to the selected list
  const addSongToList = (song) => {
    setSelectedSongs([...selectedSongs, song]);
  };

  const removeSongFromList = (songid) => {
    setSelectedSongs(prev => prev.filter(t => t.id !== songid));
  };

  const savetoplaylist = (e) => {
    document.getElementById('saveBtn').innerText = 'Saved';
  }

  return (
    <div>
      <div className="about-me-bg-1"></div>
      <div className="about-me-bg-2"></div>
      <Navigate />
      <div className='page-container'>
        <p className='page-name'>Spotify Playlist Creator</p>
        <div className='spc-page'>
          <Login accessToken={accessToken} setAccessToken={setAccessToken} />
          {accessToken && (
            <div className='spc-page-div'>
              <div className='top-div'>
                <div className='next-div'>
                  <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder='Enter search term' className='text-entry' id='song-searchbar' />
                  <button onClick={searchSongs} className='spc-button'>Search</button>
                </div>
                <div className='lvl-2-div'>
                  <p className='spc-header'>Top Matches</p>
                  {searchResults.map((song) => (
                    <div className='song-div' key={song.id}>
                      <div className='song-details'>
                        <p className='song-name' >{song.name}</p>
                        <p className='artist'> by {song.artists[0].name}</p>
                      </div>
                      <button className='add-btn' onClick={() => addSongToList(song)}>+</button>
                    </div>
                  ))}
                </div>
              </div>
              <div className='top-div'>
                <div className='next-div'>
                  <input type='text' value={playlistName} onChange={(e) => setPlaylistName(e.target.value)} name='playlist_name' placeholder='Playlist name' className='text-entry' id='playlist-name' />
                  <button id='saveBtn' className='spc-button' onClick={savetoplaylist}>Create Playlist</button>
                  <div className='lvl-2-div'>
                    <p className='spc-header'>Selected songs</p>
                    {selectedSongs.map((song) => (
                      <div className='song-div' key={song.id}>
                        <div className='song-details'>
                          <p className='song-name' >{song.name}</p>
                          <p className='artist'> by {song.artists[0].name}</p>
                        </div>
                        <button className='add-btn' onClick={() => removeSongFromList(song.id)}>-</button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <footer>
        <p>&copy; 2024 Rishabh Goel. All rights reserved. V1.1</p>
      </footer>
    </div>
  );
}

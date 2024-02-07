import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';


const getAccessToken = async () => {
  const TOKEN_ENDPOINT = 'https://accounts.spotify.com/api/token';
  // header paremeter
  const config = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    }
  }
  // request body parameter
  const data = {
    grant_type: 'client_credentials',
    client_id: '68454f854adb49db969d4c7cc8dde421',
    client_secret: 'bd661f27335540d2a793b65f28aad834',
  }

  const response = await axios.post(TOKEN_ENDPOINT, data, config)
  return response.data.access_token;
};

const accessToken = await getAccessToken();

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedSongs, setSelectedSongs] = useState([]);
  const [playlistName, setPlaylistName] = useState("");


  // Function to search for songs
  const searchSongs = async () => {
    const config={
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
    setSelectedSongs(prev=>prev.filter(t=>t.id!==songid));
  };

  const savetoplaylist = (e) => {

    document.getElementById('saveBtn').innerText='Saved';
  }

  return (
    <div>
      <h1>Spotify Song Selector</h1>
      <div>
        <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        <br/>
        <br/>
        <button onClick={searchSongs}>Search</button>
      </div>
      <div>
        <h2>Search Results</h2>
        <ul>
          {searchResults.map((song) => (
            <li key={song.id}>
              {song.name} by {song.artists[0].name}{'  '}
              <button onClick={() => addSongToList(song)}>Add</button>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h2>Selected Songs</h2>
        <label for='playlist_name'>Enter a name for your playlist</label>
        <br/>
        <input type='text' value={playlistName} onChange={(e)=> setPlaylistName(e.target.value)} name='playlist_name' placeholder='Playlist name'/>
        <ul>
          {selectedSongs.map((song) => (
            <li key={song.id}>
              {song.name} by {song.artists[0].name}{'  '}
              <button onClick={() => removeSongFromList(song.id)}>Remove</button>
            </li>
          ))}
        </ul>
        <button id='saveBtn' onClick={savetoplaylist}>Add to my Spotify</button>
      </div>
    </div>
  );
}

export default App;

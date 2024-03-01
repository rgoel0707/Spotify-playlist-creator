import React, { useState } from 'react';
import axios from 'axios';
import './Spc.css';
import Login from './login';
import Navigate from './Navigation';
import SearchTile from './searchTile';
import PlaylistTile from './playlistTile';
import ErrorPopup from './errorPopup';


export default function PlaylistCreator() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedSongs, setSelectedSongs] = useState([]);
  const [playlistName, setPlaylistName] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [user, setUser] = useState('');
  const [userId, setUserId] = useState('');
  const [showPopup, setShowPopup] = useState('');


  const getName = async (aToken) => {
    const config = {
      headers: {
        Authorization: `Bearer ${aToken}`,
      }
    }
    try {
      const response = await axios.get(`https://api.spotify.com/v1/me`, config);
      setUser(response.data.display_name);
      setUserId(response.data.id);
    } catch (error) {
      console.error('Error fetching username', error);
    }
  };

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

  const createPlaylist = async () => {
    if (playlistName === ''){
      setShowPopup('Please enter a name for the playlist');
    }
    else if(selectedSongs.length === 0) {
      setShowPopup('Please select some songs for the new playlist');
    }
    else{
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        }
      }
      const playlistData = {
        "name": playlistName,
        "description": "New playlist description",
        "public": true
      }
      const songData={
          uris: selectedSongs.map(song=>song.uri)
      }
      try {
        setShowPopup('Creating the playlist...');
        const response = await axios.post(`https://api.spotify.com/v1/users/${userId}/playlists`, playlistData, config);

        const response2= await axios.post(`https://api.spotify.com/v1/playlists/${response.data.id}/tracks`, songData, config);
        console.log(response2.data);
        setShowPopup(`Playlist Created: ${playlistName}`);
        setSearchResults([]);
        setSelectedSongs([]);
        setSearchTerm("");
        setPlaylistName("");
      } catch (error) {
        console.error('Error creating playlist:', error);
      }
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
    createPlaylist();
  }

  return (
    <div>
      <div className="about-me-bg-1"></div>
      <div className="about-me-bg-2"></div>
      {showPopup !== "" && <ErrorPopup showPopup={showPopup} setShowPopup={setShowPopup} />}
      <Navigate />
      <div className='page-container'>
        <p className='page-name'>Spotify Playlist Creator</p>
        <div className='spc-page'>
          <Login accessToken={accessToken} setAccessToken={setAccessToken} user={user} getName={getName} />
          {accessToken && (
            <div className='spc-page-div'>
              <SearchTile searchTerm={searchTerm} setSearchTerm={setSearchTerm} searchSongs={searchSongs} searchResults={searchResults} addSongToList={addSongToList} />
              <PlaylistTile playlistName={playlistName} setPlaylistName={setPlaylistName} savetoplaylist={savetoplaylist} selectedSongs={selectedSongs} removeSongFromList={removeSongFromList} createPlaylist={createPlaylist} />
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

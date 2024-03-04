import React from "react";

export default function PlaylistTile({playlistName, setPlaylistName, savetoplaylist,selectedSongs,removeSongFromList}) {
  return (
    <div className='top-div' id="playlist-tile">
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

  )
}

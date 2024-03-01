import React from "react";

export default function SearchTile({searchTerm, setSearchTerm, searchSongs, searchResults, addSongToList}) {
  return (
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
  )
}

import React from "react";
import Playlist from "../Components/Playlist/Playlist";
import SearchBar from ".//SearchBar/SearchBar";
import SearchResults from "../Components/SearchResults/SearchResults";

//DO NOT write any code here..use App.js to write your code.

function App(props) {
  return (
    <div>
      <h1>
        <a href="http://localhost:3000">Musicmania</a>
      </h1>
      <div className="App">
        <SearchBar onSearch={props.search} />
        <div className="App-playlist">
          <SearchResults
            searchResults={props.searchResults}
            onAdd={props.doThese}
          />
          <Playlist
            playlistTracks={props.playlistTracks}
            onNameChange={props.updatePlaylistName}
            onRemove={props.removetrack}
            onSave={props.savePlaylist}
          />
        </div>
      </div>
    </div>
  );
}
export default App;

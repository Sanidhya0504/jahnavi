import React from "react";
import "./App.css";

import Spotify from "../util/Spotify";
import SearchBar from "./SearchBar/SearchBar";
import SearchResults from "../Components/SearchResults/SearchResults";
import Playlist from "../Components/Playlist/Playlist";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      SearchResults: [],
      playlistName: "New Playlist",
      playlistTrack: [],
    };
    this.search = this.search.bind(this);
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.removeTrackSearch = this.removeTrackSearch.bind(this);
    this.doThese = this.doThese.bind(this);
  }

  search(term) {
    Spotify.search(term).then((SearchResults) => {
      this.setState({ SearchResults: SearchResults });
    });
  }
  addTrack(track) {
    let tracks = this.state.playlistTracks;
    if (tracks.find((savedTrack) => savedTrack.id === track.id)) {
      return;
    }
    tracks.push(track);
    this.setState({ playlistTracks: tracks });
  }
  removeTrack(track) {
    let tracks = this.state.playlistTracks;
    let trackSearch = this.state.SearchResults;
    tracks = tracks.filter((currentTrack) => currentTrack.id !== track.id);
    trackSearch.unshift(track);
    this.setstate({ playlistTracks: tracks });
  }
  removeTrackSearch(track) {
    let tracks = this.state.SearchResults;
    tracks = tracks.filter((currentTrack) => currentTrack.id !== track.id);
    this.setState({ SearchResults: tracks });
  }
  doThese(track) {
    this.addTrack(track);
    this.removeTrackSearch(track);
  }
  updatePlaylistName(name) {
    this.setState({ updatePlaylistName: name });
  }
  savePlaylist() {
    const trackUrls = this.state.playlistTracks.map((track) => track.url);
    Spotify.savePlaylist(this.state.playListName, trackUrls).then(() => {
      this.setState({
        updatePlaylistName: "New Playlist",
        playlisttracks: [],
      });
    });
  }
  render() {
    return (
      <div>
        <h1>
          <a href="http://localhost:3000">Musicmania</a>
        </h1>
        <div className="App">
          <SearchBar onSearch={this.search} />
          <div className="App-playlist">
            <SearchResults
              searchResults={this.searchResults}
              onAdd={this.doThese}
            />
            <Playlist
              playlistTracks={this.state.playlistTrack}
              onNameChange={this.updatePlaylistName}
              onRemove={this.removetrack}
              onSave={this.savePlaylist}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;

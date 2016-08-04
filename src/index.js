import _ from 'lodash';
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import SearchBar from './components/search_bar';
import YTSearch from 'youtube-api-search';
import VideoList from './components/video_list';
import VideoDetail from './components/video_details';

const API_KEY = 'AIzaSyB6dHkXZK2MUv3yBpFPkRuqvpCI8tfGzwU';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      videos: [],
      selectedVideo: null
    };

    this.videoSearch('sufboards');
  }

  videoSearch(term){
    YTSearch({key: API_KEY, term : term}, (videos) => {
      this.setState({
        videos: videos,          // Videos coming back from YouTube
        selectedVideo: videos[0] // Set a default selected video from YouTube
      });
    });
  }

  render(){
    const videoSearch = _.debounce((term) => {this.videoSearch(term)}, 300) // lodash .3 sec wait period

    return (
        <div>
            <SearchBar onSearchTermChange={videoSearch} />
            <VideoDetail video={this.state.selectedVideo} />
            <VideoList
              onVideoSelect={selectedVideo => this.setState({selectedVideo})}
              videos={this.state.videos} />
        </div>
    );
  }
}

ReactDOM.render(<App />, document.querySelector('.container'));

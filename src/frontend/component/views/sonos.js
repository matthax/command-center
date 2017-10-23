import React from 'react';
import { withData } from '../hoc';
import { MediaPlayer } from '../players';

class SonosFactory extends React.Component {
  handlePause = () => {
    fetch('/api/sonos/pause').then((response) => response.json()).then(({paused, playing, error}) => {
      console.log(paused, playing, error);
    }).catch((err) => {
      console.error(err);
    });
  };
  handlePlay = () => {
    fetch('/api/sonos/play').then((response) => response.json()).then(({paused, playing, error}) => {
      console.log(paused, playing, error);
    }).catch((err) => {
      console.error(err);
    });
  };
  render() {
    const { data, error } = this.props;
    const { track, state } = data ? data : {};
    const { title, artist, album, position, duration, albumArtURL } = track ? track : {};
    return (
      <section style={{ padding: 20 }}>
        <MediaPlayer poster={albumArtURL} duration={duration} time={position} title={title} subtitle={`${album} - ${artist}`} playing={state === 'playing'} sonos={true} onPlay={this.handlePlay} onPause={this.handlePause} />
      </section>
    )
  }
}
const Sonos = withData(SonosFactory, '/api/sonos/current');
export default Sonos;
export { Sonos };
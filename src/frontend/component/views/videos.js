import React from 'react';
import { Button } from 'react-toolbox/lib/button';
import { MediaPlayer } from './players';

class Videos extends React.Component {
  render() {
    return (
      <section style={{ padding: 20 }}>
        <MediaPlayer src={'/api/player/video/GTA ft. Vince Staples - Little Bit of This.mp4'} />
      </section>
    )
  }
}
export default Videos;
export { Videos };
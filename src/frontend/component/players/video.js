import React from 'react';
import { Card, CardMedia, CardTitle, CardText, CardActions } from 'react-toolbox/lib/card';
import { Button } from 'react-toolbox/lib/button';
import Slider from 'react-toolbox/lib/slider';
import theme from './theme.css';
import classnames from 'classnames';

class VideoPlayer extends React.Component {
  state = {
    seek: 0,
    time: 0,
    volume: 0,
    length: 0,
    seeking: false,
    playing: false,
    muted: false,
  };
  handleSeek = (seek) => {
      this.setState({ seek });
  };
  handleDragStart = () => {
    this.setState({ seeking: true });
  };
  handleDragStop = () => {
    console.log('drag ended');
    this.setState({ seeking: false, time: this.state.seek }, () => {
      this.video.currentTime = this.state.seek;
    });
  };
  handleClick = () => {
    var playing = !this.state.playing;
    this.setState({ playing: playing }, () => {
      if (playing) { console.log('hit play'); this.video.play(); }
      else { console.log('hit pause'); this.video.pause(); }
    });
  };
  handleDurationChange = () => {
    console.log('duration', this.video.duration);
    this.setState({length: this.video.duration});
  };
  handleStalled = () => {
    console.log('stalled');
  };
  handleTimeUpdate = () => {
    console.log('seek', this.video.currentTime);
    const time = this.video.currentTime;
    if (this.state.seeking) this.setState({ time });
    else this.setState({ time, seek: time });
  };
  handlePlay = () => {
    console.log('play');
  };
  handleEnded = () => {
    this.video.pause();
    this.setState({playing: false, time: 0, seek: 0});
    console.log('ended');
  };
  handlePlaying = () => {
    console.log('playing');
  };
  handlePause = () => {
    console.log('pause');
  };
  setref = (audio) => {
    this.video = audio;
    // const { playing } = this.state;
    // if (playing && this.video) this.video.play();
  };
  componentDidMount = () => {
    // const { playing } = this.state;
    // if (playing && this.video) this.video.play();
  };
  render() {
    const { seek, time, volume, length, muted, playing, seeking } = this.state;
    const width = '350px'
    return (
    <section>
      <Card style={{width: width, position: 'relative'}}>
        <CardMedia>
          <video src={'/api/player/video/LittleBitOfThis'} style={{width: width}} ref={this.setref} onPlay={this.handlePlay} onPause={this.handlePause} onStalled={this.handleStalled} onEnded={this.handleEnded} onPlaying={this.handlePlaying} onTimeUpdate={this.handleTimeUpdate} onDurationChange={this.handleDurationChange} />
        </CardMedia>
        <CardTitle
          title="Little Bit of This"
          subtitle="Good Times Ahead - Vince Staples"
        />
        <Button icon={ playing ? 'pause' : 'play_arrow'} floating accent mini onClick={this.handleClick} className={theme.play} />
        <div className={classnames(theme.equalizer, { [theme.playing]: playing })}>
          <div className={theme.bar} />
          <div className={theme.bar} />
          <div className={theme.bar} />
          <div className={theme.bar} />
          <div className={theme.bar} />
          <div className={theme.bar} />
        </div>
        <Slider value={seek} onChange={this.handleSeek} min={0} max={length} onDragStart={this.handleDragStart} onDragStop={this.handleDragStop} />
      </Card>
      </section>
    )
  }
};
export default VideoPlayer;

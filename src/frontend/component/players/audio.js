import React from 'react';
import { Card, CardMedia, CardTitle, CardText, CardActions } from 'react-toolbox/lib/card';
import { Button } from 'react-toolbox/lib/button';
import Slider from 'react-toolbox/lib/slider';
import theme from './theme.css';
import classnames from 'classnames';

class AudioPlayer extends React.Component {
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
      this.audio.currentTime = this.state.seek;
    });
  };
  handleClick = () => {
    var playing = !this.state.playing;
    this.setState({ playing: playing }, () => {
      if (playing) { console.log('hit play'); this.audio.play(); }
      else { console.log('hit pause'); this.audio.pause(); }
    });
  };
  handleDurationChange = () => {
    console.log('duration', this.audio.duration);
    this.setState({length: this.audio.duration});
  };
  handleStalled = () => {
    console.log('stalled');
  };
  handleTimeUpdate = () => {
    console.log('seek', this.audio.currentTime);
    const time = this.audio.currentTime;
    if (this.state.seeking) this.setState({ time });
    else this.setState({ time, seek: time });
  };
  handlePlay = () => {
    console.log('play');
  };
  handleEnded = () => {
    this.audio.pause();
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
    this.audio = audio;
    // const { playing } = this.state;
    // if (playing && this.audio) this.audio.play();
  };
  componentDidMount = () => {
    // const { playing } = this.state;
    // if (playing && this.audio) this.audio.play();
  };
  render() {
    const { seek, time, volume, length, muted, playing, seeking } = this.state;
    return (
    <section>
      <Card style={{width: '350px', position: 'relative'}}>
        <CardMedia
        aspectRatio="wide"
        image="/api/images/gta.jpg"
        />
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
        <audio src={'/api/player/audio/LittleBitOfThis'} ref={this.setref} onPlay={this.handlePlay} onPause={this.handlePause} onStalled={this.handleStalled} onEnded={this.handleEnded} onPlaying={this.handlePlaying} onTimeUpdate={this.handleTimeUpdate} onDurationChange={this.handleDurationChange} />
        <Slider value={seek} onChange={this.handleSeek} min={0} max={length} onDragStart={this.handleDragStart} onDragStop={this.handleDragStop} />
      </Card>
      </section>
    )
  }
};
export default AudioPlayer;

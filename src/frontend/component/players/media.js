import React from 'react';
import { Card, CardMedia, CardTitle, CardText, CardActions } from 'react-toolbox/lib/card';
import { Button, IconButton } from 'react-toolbox/lib/button';
import FontIcon from 'react-toolbox/lib/font_icon';
import Slider from 'react-toolbox/lib/slider';
import theme from './theme.css';
import classnames from 'classnames';

const isAudio = (file) => {
  return file.toLocaleLowerCase().endsWith('.mp3');
};
const isVideo = (file) => {
  return file.toLocaleLowerCase().endsWith('.mp4');
};

class MediaPlayer extends React.Component {
  state = {
    seek: 0,
    time: 0,
    volume: 0,
    length: 0,
    fullscreen: false,
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
      this.media.currentTime = this.state.seek;
    });
  };
  handleClick = () => {
    var playing = !this.state.playing;
    this.setState({ playing: playing }, () => {
      if (playing) { console.log('hit play'); this.media.play(); }
      else { console.log('hit pause'); this.media.pause(); }
    });
  };
  handleDurationChange = () => {
    console.log('duration', this.media.duration);
    this.setState({length: this.media.duration});
  };
  handleStalled = () => {
    console.log('stalled');
  };
  handleTimeUpdate = () => {
    console.log('seek', this.media.currentTime);
    const time = this.media.currentTime;
    if (this.state.seeking) this.setState({ time });
    else this.setState({ time, seek: time });
  };
  handleFullscreenClick = () => {
    this.setState({fullscreen: !this.state.fullscreen});
  };
  handlePlay = () => {
    console.log('play');
  };
  handleEnded = () => {
    this.media.pause();
    this.setState({playing: false, time: 0, seek: 0});
    console.log('ended');
  };
  handlePlaying = () => {
    console.log('playing');
  };
  handlePause = () => {
    console.log('pause');
  };
  setref = (media) => {
    this.media = media;
    // const { playing } = this.state;
    // if (playing && this.media) this.media.play();
  };
  componentDidMount = () => {
    // const { playing } = this.state;
    // if (playing && this.media) this.media.play();
  };
  render() {
    const { seek, time, volume, length, muted, playing, seeking, fullscreen } = this.state;
    const { src, poster } = this.props;
    const isAudioFile = isAudio(src);
    const width = '350px';
    return (
    <section>
      <Card style={{width: width, position: 'relative'}}>
        { isAudioFile ? <CardMedia
        aspectRatio="wide"
        image={poster}
        /> : 
        <CardMedia className={theme.cardMedia}>
          <video src={'/api/player/video/LittleBitOfThis'} style={{width: width}} ref={this.setref} onPlay={this.handlePlay} onPause={this.handlePause} onStalled={this.handleStalled} onEnded={this.handleEnded} onPlaying={this.handlePlaying} onTimeUpdate={this.handleTimeUpdate} onDurationChange={this.handleDurationChange} />
          { !isAudioFile ? <div className={theme.videoControls}><IconButton icon={ playing ? 'pause' : 'play_arrow'} onClick={this.handleClick} /> <IconButton icon={fullscreen ? 'fullscreen_exit' : 'fullscreen'} onClick={this.handleFullscreenClick} /></div>: null }
        </CardMedia>
        }
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
        { isAudioFile ? <audio src={src} ref={this.setref} onPlay={this.handlePlay} onPause={this.handlePause} onStalled={this.handleStalled} onEnded={this.handleEnded} onPlaying={this.handlePlaying} onTimeUpdate={this.handleTimeUpdate} onDurationChange={this.handleDurationChange} /> : null }
        <Slider value={seek} onChange={this.handleSeek} min={0} max={length} onDragStart={this.handleDragStart} onDragStop={this.handleDragStop} />
      </Card>
      </section>
    )
  }
};
export default MediaPlayer;
export { MediaPlayer };

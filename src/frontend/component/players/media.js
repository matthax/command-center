import React from 'react';
import { Card, CardMedia, CardTitle, CardText, CardActions } from 'react-toolbox/lib/card';
import { Button, IconButton } from 'react-toolbox/lib/button';
import FontIcon from 'react-toolbox/lib/font_icon';
import Slider from 'react-toolbox/lib/slider';
import theme from './theme.css';
import classnames from 'classnames';
import ReactDOM from 'react-dom';
import { isFullscreen, exitFullscreen, fullscreen } from '../utils/fullscreen';

const isAudio = (file) => {
  return file && file.toLocaleLowerCase().endsWith('.mp3');
};
const isVideo = (file) => {
  return file && file.toLocaleLowerCase().endsWith('.mp4');
};

class MediaPlayer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      seek: props.time || 0,
      time: props.time || 0,
      volume: 0,
      length: props.duration || 0,
      fullscreen: false,
      seeking: false,
      playing: props.playing || false,
      muted: false,
    };
  };
  handleSeek = (seek) => {
      this.setState({ seek });
  };
  handleDragStart = () => {
    this.setState({ seeking: true });
  };
  handleDragStop = () => {
    this.setState({ seeking: false, time: this.state.seek }, () => {
      this.media.currentTime = this.state.seek;
    });
  };
  handleClick = () => {
    const { onPlay, onPause } = this.props;
    var playing = !this.state.playing;
    this.setState({ playing: playing }, () => {
      if (playing) { 
        if (this.media) this.media.play(); 
        if (onPlay) { onPlay(); } 
      }
      else { 
        if (this.media) this.media.pause(); 
        if (onPause) { onPause(); } 
      }
    });
  };
  handleDurationChange = () => {
    this.setState({length: this.media.duration});
  };
  handleStalled = () => {
    console.log('stalled');
  };
  handleTimeUpdate = () => {
    const time = this.media.currentTime;
    if (this.state.seeking) this.setState({ time });
    else this.setState({ time, seek: time });
  };
  handleFullscreenClick = () => {
    this.setState({fullscreen: !this.state.fullscreen}, () => {
      const cardMedia = ReactDOM.findDOMNode(this.cardMedia);
      if (this.state.fullscreen && !isFullscreen()) fullscreen(cardMedia);
      else if (!this.state.fullscreen && isFullscreen()) exitFullscreen(cardMedia);
    });
  };
  handleFullscreenExit = () => {
    this.setState({fullscreen: isFullscreen()});
  }
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
  setCardMediaRef = (cardMedia) => {
    this.cardMedia = cardMedia;
  };
  setMediaRef = (media) => {
    this.media = media;
    // const { playing } = this.state;
    // if (playing && this.media) this.media.play();
  };
  componentDidMount = () => {
    // const { playing } = this.state;
    // if (playing && this.media) this.media.play();
    if (document.addEventListener)
    {
        document.addEventListener('webkitfullscreenchange', this.handleFullscreenExit, false);
        document.addEventListener('mozfullscreenchange', this.handleFullscreenExit, false);
        document.addEventListener('fullscreenchange', this.handleFullscreenExit, false);
        document.addEventListener('MSFullscreenChange', this.handleFullscreenExit, false);
    }
  };
  componentWillUnmount = () => {
    document.removeEventListener('webkitfullscreenchange', this.handleFullscreenExit);
    document.removeEventListener('mozfullscreenchange', this.handleFullscreenExit);
    document.removeEventListener('fullscreenchange', this.handleFullscreenExit);
    document.removeEventListener('MSFullscreenChange', this.handleFullscreenExit);
  };
  componentWillReceiveProps = (nextProps) => {
    const { playing, duration, poster, title, subtitle } = nextProps;
    if (playing != this.state.playing || duration != this.state.length) {
      this.setState({playing: playing, length: duration});
    }
  };
  render() {
    const { seek, time, volume, length, muted, playing, seeking, fullscreen } = this.state;
    const { src, poster, title, subtitle, video, sonos, onPlay, onPause, ...rest } = this.props;
    const isAudioFile = typeof video === 'undefined' ? (typeof sonos === 'undefined' ? isAudio(src) : true) : !video;
    const width = '350px';
    return (
    <section>
      <Card style={{width: width, position: 'relative'}}>
        { isAudioFile ? <CardMedia
        aspectRatio="square"
        image={poster}
        /> : 
        <CardMedia className={classnames(theme.cardMedia, { [theme.fullscreen]: fullscreen })} ref={this.setCardMediaRef}>
          <video src={src} style={ fullscreen ? {} : {width: width}} ref={this.setMediaRef} onPlay={this.handlePlay} onPause={this.handlePause} onStalled={this.handleStalled} onEnded={this.handleEnded} onPlaying={this.handlePlaying} onTimeUpdate={this.handleTimeUpdate} onDurationChange={this.handleDurationChange} onClick={this.handleClick} {...rest} />
          { !isAudioFile ? 
          <div className={theme.videoControls}>
            { fullscreen ? <IconButton icon={ playing ? 'pause' : 'play_arrow'} onClick={this.handleClick} className={theme.videoPlayButton} /> : null }
            <IconButton icon={fullscreen ? 'fullscreen_exit' : 'fullscreen'} onClick={this.handleFullscreenClick} className={theme.fullscreenButton} />
            { fullscreen ? <Slider value={seek} onChange={this.handleSeek} min={0} max={length} onDragStart={this.handleDragStart} onDragStop={this.handleDragStop} className={theme.videoSlider} /> : null }
          </div> : null }
        </CardMedia>
        }
        <CardTitle
          title={title}
          subtitle={subtitle}
        />
        <Button icon={ playing ? 'pause' : 'play_arrow'} floating accent mini onClick={this.handleClick} className={theme.play} />
        { isAudioFile ? <div className={classnames(theme.equalizer, { [theme.playing]: playing })}>
          <div className={theme.bar} />
          <div className={theme.bar} />
          <div className={theme.bar} />
          <div className={theme.bar} />
          <div className={theme.bar} />
          <div className={theme.bar} />
        </div> : null }
        { isAudioFile && !sonos ? <audio src={src} ref={this.setMediaRef} onPlay={this.handlePlay} onPause={this.handlePause} onStalled={this.handleStalled} onEnded={this.handleEnded} onPlaying={this.handlePlaying} onTimeUpdate={this.handleTimeUpdate} onDurationChange={this.handleDurationChange} {...rest} /> : null }
        { !fullscreen ? <Slider value={seek} onChange={this.handleSeek} min={0} max={length} onDragStart={this.handleDragStart} onDragStop={this.handleDragStop} /> : null }
      </Card>
      </section>
    )
  }
};
export default MediaPlayer;
export { MediaPlayer };

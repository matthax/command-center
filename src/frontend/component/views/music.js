import React from 'react';
import { withData } from '../hoc';
import { List, ListItem, ListSubHeader, ListDivider, ListCheckbox } from 'react-toolbox/lib/list';
import Dialog from 'react-toolbox/lib/dialog';
import { Button } from 'react-toolbox/lib/button';
import { MediaPlayer } from '../players';

class MusicFactory extends React.Component {
  state = {
    active: false,
    song: null,
  };

  handleToggle = () => {
    this.setState({active: !this.state.active});
  }
  handleClick = (song) => {
    this.setState({song: song, active: true});
  }

  actions = [
    { label: "Close", onClick: this.handleToggle },
  ];
  render() {
    const { active, song } = this.state;
    const { data, error } = this.props;
    return (
      <section style={{ padding: 20 }}>
        <List selectable ripple>
        <ListSubHeader caption={data ? 'Music' : 'Loading Music Library'} />
          { data && data.files ? data.files.map(({ file, playable, created, isDirectory, isFile, tag }, index) => {
            const tags = tag && tag.tags ? tag.tags : {};
            return (<ListItem selectable ripple key={`media_${index}`} caption={tags.title || file} legend={tags && tags.artist ? `${tags.artist} - ${tags.album || ''}` : created} leftIcon={playable ? 'play_arrow' : (isDirectory ? 'folder' : (isFile ? 'insert_drive_file' : 'help'))} onClick={(e) => { this.handleClick(file); }}/>)
          }) : null }
        </List>
        { active && song ? <Dialog
          actions={this.actions}
          active={this.state.active}
          onEscKeyDown={this.handleToggle}
          onOverlayClick={this.handleToggle}
          title='Media Test'
        >
        <MediaPlayer poster={"/api/images/gta.jpg"} src={`/api/player/audio/${encodeURIComponent(song)}`} type="audio/mpeg" />
        </Dialog> : null }
      </section>
    )
  }
}
const Music = withData(MusicFactory, '/api/files/media/audio')
export default Music;
export { Music };
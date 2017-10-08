import React from 'react';
import { withData } from '../hoc';
import { List, ListItem, ListSubHeader, ListDivider, ListCheckbox } from 'react-toolbox/lib/list';
import Dialog from 'react-toolbox/lib/dialog';
import { Button } from 'react-toolbox/lib/button';

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
          { data && data.files ? data.files.map((file, index) => (<ListItem selectable ripple key={`media_${index}`} caption={file} leftIcon='play' onClick={(e) => { this.handleClick(file); }}/>)) : null }
        </List>
        { active && song ? <Dialog
          actions={this.actions}
          active={this.state.active}
          onEscKeyDown={this.handleToggle}
          onOverlayClick={this.handleToggle}
          title='Media Test'
        >
        <audio controls>
            <source src={`/api/player/audio/${encodeURIComponent(song)}`} type="audio/mpeg" />
            Your browser does not support the audio element.
        </audio>
        </Dialog> : null }
      </section>
    )
  }
}
const Music = withData(MusicFactory, '/api/files/media/audio')
export default Music;
export { Music };
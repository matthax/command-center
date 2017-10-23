import React from 'react';
import { List, ListItem, ListSubHeader, ListDivider, ListCheckbox } from 'react-toolbox/lib/list';

class Apps extends React.Component {
  render() {
    return (
      <section style={{ padding: 20 }}>
        <List selectable ripple>
          <ListSubHeader caption='Apps' />
          <ListItem to='/files' caption='File Browser' leftIcon='folder' ripple selectable onClick={this.handleToggle} />
          <ListItem to='/sonos' caption='Sonos Streaming' leftIcon='queue_music' />
          <ListItem to='/yeezy' caption='Buy Yeezy' leftIcon='attach_money' />
        </List>
      </section>
    )
  }
}
export default Apps;
export { Apps };
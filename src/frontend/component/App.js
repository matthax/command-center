import React from 'react';
import { Drawer } from 'react-toolbox/lib/drawer';
import { List, ListItem, ListSubHeader, ListDivider, ListCheckbox } from 'react-toolbox/lib/list';
import AppBar from './PurpleAppBar.js';      // AppBar with simple overrides
import { BrowserRouter, Route, Link, Switch, withRouter } from 'react-router-dom';
import { Home, Files, Music, Videos, Apps, Sonos } from './views';

class App extends React.Component {
  state = {
    drawer: false,
  };
  // componentWillReceiveProps = (next) => {
  //   console.log(next);
  // };
  // shouldComponentUpdate = (nextProps, nextState) => {
  //   if (nextState) return true;
  //   const { location: currentLocation } = this.props;
  //   const { location } = nextProps;
  //   if (currentLocation.pathname !== location.pathname) return true;
  //   else {
  //     console.info(nextProps, nextState);
  //     return false;
  //   }
  // };
  handleToggle = () => {
    this.setState({ drawer: !this.state.drawer });
  };
  render() {
    const { drawer } = this.state;
    return (
      <div>
        <AppBar onLeftIconClick={this.handleToggle} />
        <Drawer active={drawer} onOverlayClick={this.handleToggle}>
          <List selectable ripple>
            <ListSubHeader caption='Media' />
            <Link to='/music'><ListItem caption='Music' leftIcon='library_music' ripple selectable onClick={this.handleToggle} /></Link>
            <Link to='/videos'><ListItem caption='Videos' leftIcon='video_library' ripple selectable onClick={this.handleToggle} /></Link>
            <ListItem caption='Photos' leftIcon='photo_library' />
            <ListSubHeader caption='Apps' />
            <Link to='/files'><ListItem caption='File Browser' leftIcon='folder' ripple selectable onClick={this.handleToggle} /></Link>
            <Link to='/sonos'><ListItem caption='Sonos' leftIcon='queue_music' /></Link>
            <Link to='/apps'><ListItem caption='Apps' leftIcon='apps' /></Link>
          </List>
        </Drawer>
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/files' exact component={Files} />
          <Route path='/music' exact component={Music} />
          <Route path='/videos' exact component={Videos} />
          <Route path='/apps' exact component={Apps} />
          <Route path='/sonos' exact component={Sonos} />
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);

import React from 'react';
import PropTypes from 'prop-types';
import { AppBar } from 'react-toolbox/lib/app_bar';
import Navigation from 'react-toolbox/lib/navigation';
import { IconMenu, MenuItem, MenuDivider } from 'react-toolbox/lib/menu'; // Bundled component import
import withUser from './hoc/withUser';
import Logo from './Logo.js';
import theme from './PurpleAppBar.css';

const PurpleAppBar = ({ children, verified, user, token, error, ...other }) => (
  <AppBar {...other} title={'Bark Command Center'} leftIcon='menu' theme={theme}>
    <Logo />
    {children}
    { user && user.name ? user.name.first : null }
    <Navigation type='horizontal' className={theme.navigation}>
      <IconMenu icon='more_vert' position='auto' menuRipple>
        <MenuItem value='settings' icon='settings' caption='Settings' />
        <MenuDivider />
        { user ? <MenuItem value='signout' icon='exit_to_app' caption='Sign Out' /> : <MenuItem value='signin' icon='launch' caption='Sign In' /> }
      </IconMenu>
    </Navigation>
  </AppBar>
);

PurpleAppBar.propTypes = {
  children: PropTypes.node
};

export default withUser(PurpleAppBar, false);

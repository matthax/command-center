import React from 'react';
import SuccessButton from '../SuccessButton.js';    // A button with complex overrides
import { Button } from 'react-toolbox/lib/button';

class Home extends React.Component {
  render() {
    return (
      <section style={{ padding: 20 }}>
        <SuccessButton label='Success' primary raised />
        <Button label='Primary Button' primary />
      </section>
    )
  }
}
export default Home;
export { Home };
import React from 'react';
import AppBar from './PurpleAppBar.js';      // AppBar with simple overrides
import SuccessButton from './SuccessButton.js';    // A button with complex overrides
import { Button } from 'react-toolbox/lib/button';

const App = () => (
  <div>
    <AppBar />
    <section style={{ padding: 20 }}>
      <SuccessButton label='Success' primary raised />
      <audio controls>
          <source src="/api/player/solo" type="audio/mpeg" />
          Your browser does not support the audio element.
      </audio>
      <Button label='Primary Button' primary />
    </section>
  </div>
);

export default App;

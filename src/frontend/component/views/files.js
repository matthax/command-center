import React from 'react';
import { Button } from 'react-toolbox/lib/button';

class Files extends React.Component {
  render() {
    return (
      <section style={{ padding: 20 }}>
        <Button label='Files' primary raised />
      </section>
    )
  }
}
export default Files;
export { Files };
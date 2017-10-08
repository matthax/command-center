import React from 'react';
import { Button } from 'react-toolbox/lib/button';

class Videos extends React.Component {
  render() {
    return (
      <section style={{ padding: 20 }}>
        <Button label='Videos' primary raised />
      </section>
    )
  }
}
export default Videos;
export { Videos };
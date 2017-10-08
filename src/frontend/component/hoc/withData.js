import React from 'react';

function withData(WrappedComponent, endpoint) {
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        data: null,
        error: null,
      };
    }

    componentDidMount() {
      this.getData(endpoint);
    }

    getData = (endpoint) => {
      fetch(endpoint).then((response) => response.json()).then((data) => {
        this.setState({ data: data, error: null });
      }).catch((err) => {
        this.setState({ error: err });
      });
    }

    render() {
      const { data, error } = this.state;
      return <WrappedComponent data={data} error={error} {...this.props} />;
    }
  };
};
export default withData;
export { withData };

import React from 'react';
import decode from 'jwt-decode';

function withUser(WrappedComponent, verify) {
  return class extends React.Component {
    constructor(props) {
      super(props);
      const token = localStorage.getItem('token');
      this.state = {
        verified: false,
        token: token,
        error: null,
        user: token ? decode(token) : null,
      };
    }

    componentDidMount() {
      if (verify) {
        const { token } = this.state;
        this.verifyToken(token);
      }
    }

    verifyToken = (token) => {
      fetch(`/api/verify?token=${token}`).then((user) => {
        this.setState({ verified: true, token: token, user: user, error: null });
      }).catch((err) => {
        this.setState({ verified: false, token: null, error: err, user: null });
      });
    }

    render() {
      const { user, verified, token, error } = this.state;
      return <WrappedComponent user={user} verified={verified} token={token} error={error} {...this.props} />;
    }
  };
};
export default withUser;
export { withUser };

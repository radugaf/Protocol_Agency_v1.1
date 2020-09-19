import React, { Component } from "react";
import { Redirect } from "react-router-dom";

import { connect } from "react-redux";

import { login } from "../../redux/actions/auth";

class Login extends Component {
  state = {
    email: "",
    password: "",
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();
    const { email, password } = this.state;
    const users = { email, password };
    this.props.login(users);

    // this.setState({
    //   email: "",
    //   password: "",
    // });
  };
  render() {
    if (this.props.isAuthenticated) {
      return <Redirect to="/" />;
    }
    const { email, password } = this.state;

    return (
      <div className="row card card-body mt-4 mb-4">
        <p className="h5 text-center mb-4">Login</p>
        <form className="col-6 offset-3" onSubmit={this.onSubmit}>
          <div className="form-group">
            <label for="male">Email</label>
            <input
              className="form-control"
              placeholder="Email"
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={this.onChange}
              required
            />
          </div>
          <div className="form-group">
            <label for="male">Password</label>
            <input
              className="form-control"
              placeholder="Password"
              type="password"
              name="password"
              id="password"
              onChange={this.onChange}
              required
              value={password}
            />
          </div>

          <div className="form-group text-center">
            <button className="btn btn-primary" type="submit">
              Submit
            </button>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(Login);

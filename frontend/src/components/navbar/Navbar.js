import React, { Component, Fragment } from "react";
import { Link, NavLink } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../redux/actions/auth";

class navbar extends Component {
  render() {
    const { isAuthenticated, user } = this.props.auth;
    console.log({ user });
    const authLinks = (
      <>
        <div className="navbar__bottom">
          <li className="navbar__bottom__item">
            <strong>{user ? `Welcome ${user.username}` : ""}</strong>
          </li>
        </div>
        <button
          className="nav-link btn btn-info btn-sm text-light"
          onClick={this.props.logout}>
          Logout
        </button>
        <p>
          <NavLink className="navbar__top__auth__link" to="/change-password">
            Change Password
          </NavLink>
        </p>
        {user && user.is_agency && (
          <p>
            <NavLink className="navbar__top__auth__link" to="/invite-agent">
              Add Agent
            </NavLink>
          </p>
        )}
        <p>
          <NavLink className="navbar__top__auth__link" to="/agencyform">
            Agent/Agency form
          </NavLink>
        </p>
      </>
    );

    const guestLinks = (
      <>
        <p>
          <NavLink className="navbar__top__auth__link" to="/login">
            Login
          </NavLink>
        </p>
        <p>
          <NavLink className="navbar__top__auth__link" to="/signup">
            Sign Up
          </NavLink>
        </p>
        <p>
          <NavLink className="navbar__top__auth__link" to="#">
            Forgot Password
          </NavLink>
        </p>
      </>
    );

    return (
      <Fragment>
        <nav className="navbar">
          <div className="navbar__top">
            <div className="navbar__top__logo">
              <Link className="navbar__top__logo__link" to="/">
                Protocol Estate
              </Link>
            </div>
            <div className="navbar__top__auth">
              {/* If the user is isAuthenticated then show the authlinks else show guestLinks. */}
              <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
            </div>
          </div>

          <div className="navbar__bottom">
            <li className="navbar__bottom__item">
              <NavLink className="navbar__bottom__item__link" exact to="/">
                Home
              </NavLink>
            </li>
            <li className="navbar__bottom__item">
              <NavLink
                className="navbar__bottom__item__link"
                exact
                to="/listings"
              >
                Listings
              </NavLink>
            </li>
            <li className="navbar__bottom__item">
              <NavLink className="navbar__bottom__item__link" exact to="/about">
                About
              </NavLink>
            </li>
            <li className="navbar__bottom__item">
              <NavLink
                className="navbar__bottom__item__link"
                exact
                to="/contact"
              >
                Contact
              </NavLink>
            </li>
          </div>
        </nav>
      </Fragment>
    );
  }
}

navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(navbar);

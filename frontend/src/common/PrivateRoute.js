import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

const PrivateRoute = ({ component: Component, auth, ...rest }) => {
  {
    console.log({ auth: auth.user && auth.user.is_agency });
  }
  return (
    <Route
      {...rest}
      render={(props) => {
        {
          console.log(props);
        }
        if (auth.isLoading) {
          return <h2>Loading ...</h2>;
        } else if (!auth.isAuthenticated) {
          return <Redirect to="/login" />;
        } else if (
          auth &&
          auth.user.is_agency &&
          props.match.path === "/invite-agent"
        ) {
          return <Component {...props} />;
        } else if (
          auth &&
          auth.user &&
          !auth.user.is_agency &&
          props.match.path === "/invite-agent"
        ) {
          return <Redirect to="/" />;
        } else {
          return <Component {...props} />;
        }
      }}
    />
  );
};
const maptStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(maptStateToProps)(PrivateRoute);

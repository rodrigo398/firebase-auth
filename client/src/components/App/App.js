import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import { AuthProvider } from "#components/shared/AuthContext";
import { GoogleProvider } from "#components/shared/GoogleContext";
import Loader from "#components/shared/Loader";
import PrivateRoute from "#components/shared/PrivateRoute";

const Home = lazy(() => import("./Home"));
const Login = lazy(() => import("./Login"));
const SignUp = lazy(() => import("./SignUp"));

const App = () => {
  return (
    <AuthProvider>
      <GoogleProvider>
        <Suspense fallback={<Loader />}>
          <Router>
            <PrivateRoute exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={SignUp} />
          </Router>
        </Suspense>
      </GoogleProvider>
    </AuthProvider>
  );
};

export default App;

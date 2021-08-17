import React from 'react';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import { Route, Switch } from 'react-router-dom';
// import NavBarContainer from './nav/navbar_container';

import MainPage from './main/main_page';
import LoginFormContainer from './session/login_form_container';
import SignupFormContainer from './session/signup_form_container';
import HomeContainer from './home/home_container';
import PlantIndexContainer from "./plants/plant_index_container";
import PlantShowContainer from "./plants/plant_show_container";

const App = () => (
  <div>
    {/* <NavBarContainer /> */}
    <Switch>
        <Route exact path="/" component={MainPage} />
        <AuthRoute exact path="/login" component={LoginFormContainer} />
        <AuthRoute exact path="/signup" component={SignupFormContainer} />

        <ProtectedRoute exact path="/home" component={HomeContainer} />
        <ProtectedRoute exact path="/plants" component={PlantIndexContainer} />
        <ProtectedRoute exact path="/plants/:plantId" component={PlantShowContainer} />
    </Switch>
  </div>
);

export default App;
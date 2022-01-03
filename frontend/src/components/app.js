import React from 'react';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import { Route, Switch } from 'react-router-dom';

import MainPageContainer from './main/main_page_container';
import LoginFormContainer from './session/login_form_container';
import SignupFormContainer from './session/signup_form_container';
import HomeContainer from './home/home_container';
import PlantIndexContainer from "./plants/plant_index_container";
import PlantShowContainer from "./plants/plant_show_container";
import GardenIndexContainer from "./gardens/garden_index_container";
import InstructionContainer from "./instructions/instruction_index_container";

const App = () => (
  <div>
    <Switch>
        <AuthRoute exact path="/" component={MainPageContainer} />
        <AuthRoute exact path="/login" component={LoginFormContainer} />
        <AuthRoute exact path="/signup" component={SignupFormContainer} />

        <ProtectedRoute exact path="/home" component={HomeContainer} />
        <ProtectedRoute exact path="/plants" component={PlantIndexContainer} />
        <ProtectedRoute exact path="/plants/:plantId" component={PlantShowContainer} />
        <ProtectedRoute exact path="/feed" component={GardenIndexContainer} />
      <ProtectedRoute exact path="/instructions" component={InstructionContainer} />
    </Switch>
  </div>
);

export default App;
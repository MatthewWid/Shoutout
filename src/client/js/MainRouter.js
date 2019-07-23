import React from "react";
import {BrowserRouter, Switch, Route} from "react-router-dom";
import Home from "./pages/Home.js";
import Profile from "./pages/Profile.js";
import NotFound from "./pages/NotFound.js";

const MainRouter = () => (
	<BrowserRouter>
		<Switch>
			<Route path="/" component={Home} exact></Route>
			<Route path="/:userName" component={Profile} exact></Route>
			<Route component={NotFound}></Route>
		</Switch>
	</BrowserRouter>
);

export default MainRouter;

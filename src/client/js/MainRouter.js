import React from "react";
import {BrowserRouter, Switch, Route, Redirect} from "react-router-dom";
import withAuth from "./pages/withAuth.js";
import Home from "./pages/Home.js";
import Settings from "./pages/Settings.js";
import Attribution from "./pages/Attribution.js";
import NotFound from "./pages/NotFound.js";
import Profile from "./pages/Profile.js";

const MainRouter = () => (
	<BrowserRouter>
		<Switch>
			<Route path="/" component={Home} exact />
			<Route path="/settings" component={withAuth(Settings)} exact />
			<Route path="/attribution" component={Attribution} exact />
			<Route path="/404" component={NotFound} exact />
			<Route path="/:username" component={Profile} exact />
			<Redirect from="*" to="/404" />
		</Switch>
	</BrowserRouter>
);

export default MainRouter;

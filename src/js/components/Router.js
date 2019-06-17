import React from "react";
import {BrowserRouter, Switch, Route} from "react-router-dom";
import App from "./App.js";
import NotFound from "./NotFound.js";

const Router = () => (
	<BrowserRouter>
		<Switch>
			<Route path="/" component={App} exact></Route>
			<Route component={NotFound}></Route>
		</Switch>
	</BrowserRouter>
);

export default Router;

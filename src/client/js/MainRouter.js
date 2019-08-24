import React from "react";
import {BrowserRouter, Switch, Route, Redirect} from "react-router-dom";
import {ROUTE_USER} from "constants";
import withAuth from "./pages/withAuth.js";
import Home from "./pages/Home.js";
import All from "./pages/All.js";
import Top from "./pages/Top.js";
import Settings from "./pages/Settings.js";
import Attribution from "./pages/Attribution.js";
import NotFound from "./pages/NotFound.js";
import Profile from "./pages/Profile.js";
import Post from "./pages/Post.js";

const MainRouter = () => (
	<BrowserRouter>
		<Switch>
			<Route path="/" component={Home} exact />
			<Route path="/all" component={All} exact />
			<Route path="/top" component={Top} exact />
			<Route path="/settings" component={withAuth(Settings)} exact />
			<Route path="/attribution" component={Attribution} exact />
			<Route path="/404" component={NotFound} exact />
			<Route path={[
				`${ROUTE_USER}`,
				`${ROUTE_USER}/likes`,
				`${ROUTE_USER}/followers`,
				`${ROUTE_USER}/following`
			]} component={Profile} exact />
			<Route path={`${ROUTE_USER}/:postId`} component={Post} exact />
			<Redirect from="*" to="/404" />
		</Switch>
	</BrowserRouter>
);

export default MainRouter;

import React from "react";
import {BrowserRouter, Switch, Route} from "react-router-dom";
import Header from "./components/Header.js";
import Layout from "./pages/Layout.js";
import Home from "./pages/Home.js";
import Profile from "./pages/Profile.js";
import NotFound from "./pages/NotFound.js";

const MainRouter = () => (
	<BrowserRouter>
		<Header />
		<Layout>
			<Switch>
				<Route path="/" component={Home} exact></Route>
				<Route path="/:userName" component={Profile} exact></Route>
				<Route component={NotFound}></Route>
			</Switch>
		</Layout>
	</BrowserRouter>
);

export default MainRouter;

import React, {Fragment, useState} from "react";
import {Route, Link} from "react-router-dom";
import {ROUTE_USER} from "constants";
import PanelFeed from "../components/PanelFeed.js";

// Attach class names and append the `--selected` modifier if
// the tab represents the currently opened page.
const classSelected = (page, name) => (
	`nav__link nav__link-${name}${page === name ? " nav__link--current" : ""}`
);

const ProfileFeedPicker = ({username, page}) => {
	return (
		<div className="content__panel panel-picker">
			<nav className="picker card nav">
				<Link
					className={classSelected(page, ":username")}
					to={`/${username}`}
				>Posts</Link>
				<Link
					className={classSelected(page, "likes")}
					to={`/${username}/likes`}
				>Likes</Link>
				<Link
					className={classSelected(page, "followers")}
					to={`/${username}/followers`}
				>Followers</Link>
				<Link
					className={classSelected(page, "following")}
					to={`/${username}/following`}
				>Following</Link>
			</nav>
			<Route
				path={ROUTE_USER}
				render={() => (
					<PanelFeed
						withForm={false}
						query={{
							authorname: username
						}}
					/>
				)}
				exact
			/>
			<Route
				path={`${ROUTE_USER}/likes`}
				render={() => (
					<PanelFeed
						withForm={false}
						param="liked"
						query={{
							username
						}}
					/>
				)}
				exact
			/>
		</div>
	);
}

export default ProfileFeedPicker;

import React from "react";
import {withUserContext} from "../contexts/user.context.js";
import {DEFAULT_AVATAR_URL, DEFAULT_BANNER_URL} from "constants";
import api from "api";
import extractErrors from "../helpers/extractErrors.js";
import LoadingIndicator from "./LoadingIndicator.js";
import ErrorList from "./ErrorList.js";

class FormSettings extends React.Component {
	state = {
		nick: "",
		name: "",
		email: "",
		avatarUrl: "",
		bannerUrl: "",
		errors: [],
		loading: false
	}

	componentDidMount() {
		const {user} = this.props.UserContext;

		if (!user) {
			return;
		}

		const {nick, name, email, avatarUrl, bannerUrl} = user;

		const initialValues = {
			nick,
			name,
			email
		};
		// If the users' avatarUrl or bannerUrl is the default
		// then display nothing.
		if (avatarUrl && avatarUrl !== DEFAULT_AVATAR_URL) {
			initialValues.avatarUrl = avatarUrl;
		} else {
			initialValues.avatarUrl = "";
		}
		if (bannerUrl && bannerUrl !== DEFAULT_BANNER_URL) {
			initialValues.bannerUrl = bannerUrl;
		} else {
			initialValues.bannerUrl = "";
		}

		this.setState(initialValues);
	}

	handleChange = ({target}) => {
		const {state} = {...this.state};

		this.setState({
			[target.name]: target.value
		});
	}

	handleSubmit = async (evt) => {
		evt.preventDefault();

		const {user, setUser} = this.props.UserContext;
		const {nick, name, email, avatarUrl, bannerUrl} = this.state;

		// Send newly edited profile settings if they are added,
		// they are not the default and they are different from
		// the existing settings
		const body = {};
		if (
			nick &&
			nick !== user.nick
		) {
			body.nick = nick;
		}
		if (
			name &&
			name !== user.name
		) {
			body.name = name;

			const confirmText = `You are changing your unique username to "${name}".\n\nBy continuing your settings will be updated and you will be logged out and have to log back in with your new username.`;

			if (!confirm(confirmText)) {
				return;
			}
		}
		if (
			email &&
			email !== user.email
		) {
			body.email = email;
		}
		if (
			avatarUrl &&
			avatarUrl !== user.avatarUrl &&
			avatarUrl !== DEFAULT_AVATAR_URL
		) {
			body.avatarUrl = avatarUrl;
		}
		if (
			bannerUrl &&
			bannerUrl !== user.bannerUrl &&
			bannerUrl !== DEFAULT_BANNER_URL
		) {
			body.bannerUrl = bannerUrl;
		}

		// If no values have been updated abort the operation
		if (Object.keys(body).length === 0) {
			return;
		}

		this.setState({
			loading: true
		});

		const {data} = await api.put(`/user/${user._id}`, body);

		this.setState({
			loading: false
		});

		if (data.success) {
			// If the username changed log out
			if (name !== data.user.name) {
				setUser(null);
				return;
			}
			const {nick, name, email, avatarUrl, bannerUrl} = data.user;
			setUser({
				...user,
				nick,
				name,
				email,
				avatarUrl,
				bannerUrl
			});
		} else {
			this.setState({
				errors: extractErrors(data)
			});
		}
	}

	render() {
		const {user} = this.props.UserContext;

		if (!user) {
			return null;
		}

		return (
			<form
				className="form-settings"
				onSubmit={this.handleSubmit}
			>
				<h1 className="form-settings__header">Profile Settings</h1>
				<label className="input-label">
					Nickname
					<input
						className="input-text form-settings__input-text form-settings__nick"
						type="text"
						name="nick"
						placeholder="Nickname"
						autoCorrect="off"
						autoCapitalize="none"
						value={this.state.nick}
						onChange={this.handleChange}
					/>
				</label>
				<label className="input-label">
					Username
					<input
						className="input-text form-settings__input-text form-settings__name"
						type="text"
						name="name"
						placeholder="Username"
						autoCorrect="off"
						autoCapitalize="none"
						value={this.state.name}
						onChange={this.handleChange}
					/>
				</label>
				<label className="input-label">
					Email Address
					<input
						className="input-text form-settings__input-text form-settings__email"
						type="text"
						name="email"
						placeholder="Email Address"
						autoCorrect="off"
						autoCapitalize="none"
						value={this.state.email}
						onChange={this.handleChange}
					/>
				</label>
				<label className="input-label">
					Avatar URL
					<input
						className="input-text form-settings__input-text form-settings__avatar"
						type="text"
						name="avatarUrl"
						placeholder="Avatar URL"
						autoCorrect="off"
						autoCapitalize="none"
						value={this.state.avatarUrl}
						onChange={this.handleChange}
					/>
				</label>
				<label className="input-label">
					Banner URL
					<input
						className="input-text form-settings__input-text form-settings__banner"
						type="text"
						name="bannerUrl"
						placeholder="Banner URL"
						autoCorrect="off"
						autoCapitalize="none"
						value={this.state.bannerUrl}
						onChange={this.handleChange}
					/>
				</label>
				<ErrorList errors={this.state.errors} />
				<input
					className="button button--primary"
					type="submit"
					value="Save Settings"
				/>
				{this.state.loading && <LoadingIndicator className="form-settings__loading" />}
			</form>
		);
	}
}

export default withUserContext(FormSettings);

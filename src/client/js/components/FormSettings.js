import React from "react";
import {withUserContext} from "../contexts/user.context.js";
import api from "api";
import extractErrors from "../helpers/extractErrors.js";
import ErrorList from "./ErrorList.js";
import {DEFAULT_AVATAR_URL, DEFAULT_BANNER_URL} from "constants";

class SettingsForm extends React.Component {
	state = {
		nick: "",
		avatarUrl: "",
		bannerUrl: "",
		errors: []
	}

	componentDidMount() {
		const {user} = this.props.UserContext;

		if (!user) {
			return;
		}

		this.setState({
			nick: user.nick,
			avatarUrl: user.avatarUrl || "",
			bannerUrl: user.bannerUrl || ""
		});
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
		const {nick, avatarUrl, bannerUrl} = this.state;

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
			avatarUrl &&
			avatarUrl !== DEFAULT_AVATAR_URL &&
			avatarUrl !== user.avatarUrl
		) {
			body.avatarUrl = avatarUrl;
		}
		if (
			bannerUrl &&
			bannerUrl !== DEFAULT_BANNER_URL &&
			bannerUrl !== user.bannerUrl
		) {
			body.bannerUrl = bannerUrl;
		}

		// If no values have been updated abort the operation
		if (Object.keys(body).length === 0) {
			return;
		}

		const {data} = await api.put(`/user/${user._id}`, body);

		if (data.success) {
			setUser(data.user);
		} else {
			this.setState({
				errors: extractErrors(data)
			});
		}
	}

	render() {
		return (
			<form
				className="settings-form"
				onSubmit={this.handleSubmit}
			>
				<label className="input-label">
					Nickname
					<input
						className="input-text settings-form__input-text settings-form__nick"
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
					Avatar URL
					<input
						className="input-text settings-form__input-text settings-form__avatar"
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
						className="input-text settings-form__input-text settings-form__banner"
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
			</form>
		);
	}
}

export default withUserContext(SettingsForm);

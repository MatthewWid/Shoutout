import React from "react";
import {withUserContext} from "../contexts/user.context.js";

class SettingsForm extends React.Component {
	state = {
		nick: "",
		avatarUrl: "",
		bannerUrl: ""
	}

	componentDidMount() {
		const {user} = this.props.UserContext;

		if (!user) {
			return;
		}

		this.setState({
			nick: user.nick
		});
	}

	handleChange = ({target}) => {
		const {state} = {...this.state};

		this.setState({
			[target.name]: [target.value]
		});
	}

	handleSubmit = async (evt) => {
		evt.preventDefault();
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
						className="input-text settings-form__input-text"
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
						className="input-text settings-form__input-text"
						type="text"
						name="bannerUrl"
						placeholder="Banner URL"
						autoCorrect="off"
						autoCapitalize="none"
						value={this.state.bannerUrl}
						onChange={this.handleChange}
					/>
				</label>
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

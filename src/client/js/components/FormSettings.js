import React from "react";
import {withUserContext} from "../contexts/user.context.js";
import {IMAGE_MAX_SIZE, IMAGE_ALLOWED_TYPES} from "constants";
import api from "api";
import getFileContents from "../helpers/getFileContents.js";
import extractErrors from "../helpers/extractErrors.js";
import Avatar from "./Avatar.js";
import Banner from "./Banner.js";
import LoadingIndicator from "./LoadingIndicator.js";
import ErrorList from "./ErrorList.js";

class FormSettings extends React.Component {
	state = {
		nick: "",
		name: "",
		email: "",
		avatar: "",
		banner: "",
		errors: [],
		loading: false
	}

	componentDidMount() {
		const {user} = this.props.UserContext;

		if (!user) {
			return;
		}

		const initialValues = {
			nick: user.nick,
			name: user.name,
			email: user.email
		};

		this.setState(initialValues);
	}

	handleTextChange = ({target}) => {
		const {state} = {...this.state};

		this.setState({
			[target.name]: target.value
		});
	}

	handleFileChange = async ({target}) => {
		const [file] = target.files;
		if (!file) {
			this.setState({
				[target.name]: "",
				errors: []
			});
			return;
		}

		const {name} = target;
		// Ensure valid file size
		if (file.size > IMAGE_MAX_SIZE) {
			this.setState({
				[name]: "",
				errors: [`${name.charAt(0).toUpperCase() + name.slice(1)} image cannot be more than 5MB.`]
			});
			target.value = "";
			return;
		}

		// Ensure valid file type
		if (!IMAGE_ALLOWED_TYPES.includes(file.type)) {
			this.setState({
				[name]: "",
				errors: [`${name.charAt(0).toUpperCase() + name.slice(1)} must be a JPEG or PNG image.`]
			});
			target.value = "";
			return;
		}

		const contents = await getFileContents(file);
		
		this.setState({
			[name]: contents,
			errors: []
		});
	}

	handleSubmit = async (evt) => {
		evt.preventDefault();

		const {user, setUser} = this.props.UserContext;
		const {nick, name, email, avatar, banner} = this.state;

		const body = {
			nick: nick !== user.nick ? nick : null,
			name: name !== user.name ? name : null,
			email: email !== user.email ? email : null,
			avatar: avatar || null,
			banner: banner || null
		};
		if (body.name && !confirm(`You are changing your unique username to "${name}".\n\nBy continuing your settings will be updated and you will be logged out and have to log back in with your new username.`)) {
			return;
		}

		// If no values have been updated abort the operation
		if (Object.values(body).every((e) => e === null)) {
			return;
		}

		this.setState({
			errors: [],
			loading: true
		});

		const {data} = await api.put(`/user/${user._id}`, body);

		this.setState({
			loading: false
		});

		if (data.success) {
			// If the username changed then log out as the session
			// will be cancelled because of a failed auth
			if (body.name !== null && body.name !== data.user.name) {
				setUser(null);
				return;
			}
			setUser({
				...user,
				nick: data.user.nick,
				name: data.user.name,
				email: data.user.email
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
						onChange={this.handleTextChange}
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
						onChange={this.handleTextChange}
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
						onChange={this.handleTextChange}
					/>
				</label>

				<label className="input-label">
					Avatar Image (Recommended 256x256)
					<input
						className="input-file"
						type="file"
						name="avatar"
						onChange={this.handleFileChange}
					/>
				</label>
				{
					this.state.avatar &&
					<div className="form-settings__preview form-settings__preview--avatar">
						<p className="form-settings__preview-text">Avatar Preview</p>
						<Avatar
							withLink={false}
							user={{
								avatarUrl: this.state.avatar,
								nick: this.state.nick
							}}
						/>
					</div>
				}

				<label className="input-label">
					Banner Image (Recommended 1500x500)
					<input
						className="input-file"
						type="file"
						name="banner"
						onChange={this.handleFileChange}
					/>
				</label>
				{
					this.state.banner &&
					<div className="form-settings__preview form-settings__preview--banner">
						<p className="form-settings__preview-text">Banner Preview</p>
						<Banner
							user={{
								bannerUrl: this.state.banner,
								nick: this.state.nick
							}}
						/>
					</div>
				}

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

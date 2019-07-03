import React from "react";

const defaultState = {
	nick: "",
	username: "",
	email: "",
	password: ""
};

class SignupForm extends React.Component {
	state = {
		...defaultState
	}

	handleChange = ({target}) => {
		const state = {...this.state};

		this.setState({
			[target.name]: target.value
		});
	}

	handleSubmit = (evt) => {
		evt.preventDefault();

		this.props.signup({
			nick: this.state.nick,
			username: this.state.username,
			email: this.state.email,
			password: this.state.password
		});

		this.setState({
			...defaultState
		});
	}

	render() {
		return (
			<form
				className="signup-form"
				onSubmit={this.handleSubmit}
			>
				<p>Create an account</p>
				<input
					className="user-entry__input signup-form__nick"
					type="text"
					name="nick"
					placeholder="Nickname (Optional)"
					value={this.state.nick}
					onChange={this.handleChange}
				/>
				<div className="signup-form__username-container">
					<input
						className="user-entry__input signup-form__username"
						type="text"
						name="username"
						required
						placeholder="Username"
						value={this.state.username}
						onChange={this.handleChange}
					/>
				</div>
				<input
					className="user-entry__input signup-form__email"
					type="text"
					name="email"
					required
					placeholder="Email Address"
					value={this.state.email}
					onChange={this.handleChange}
				/>
				<input
					className="user-entry__input signup-form__password"
					type="password"
					name="password"
					required
					placeholder="Password"
					value={this.state.password}
					onChange={this.handleChange}
				/>
				<input
					className="user-entry__submit button button--primary"
					type="submit"
					value="Sign Up"
				/>
			</form>
		);
	}
}

export default SignupForm;

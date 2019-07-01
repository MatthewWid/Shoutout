import React from "react";

class SignupForm extends React.Component {
	render() {
		return (
			<form className="signup-form">
				<p>Create an account</p>
				<div className="signup-form__username-container">
					<input
						className="user-entry__input signup-form__username"
						type="text"
						name="username"
						required
						placeholder="Username"
					/>
				</div>
				<input
					className="user-entry__input signup-form__email"
					type="text"
					name="email"
					required
					placeholder="Email Address"
				/>
				<input
					className="user-entry__input signup-form__password"
					type="password"
					name="password"
					required
					placeholder="Password"
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

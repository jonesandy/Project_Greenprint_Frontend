import React, { Component } from "react";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
      message: ""
    };
  }

  onChange = e => {
    const state = this.state;
    state[e.target.name] = e.target.value;
    this.setState(state);
  };

  onSubmit = e => {
    e.preventDefault();

    const data = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify(data);
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };
    fetch(
      "https://cors-anywhere.herokuapp.com/https://project-greenprint-backend.herokuapp.com/user/register",
      requestOptions
    )
      .then(response => response.text())
      .then(result => {
        if (
          result.password === "Password must be at least 6 characters" ||
          result.password2 === "Passwords must match"
        ) {
          this.setState({
            message: "Passwords must be at least 6 characters and must match"
          });
        }
        this.props.history.push("/login");
      })
      .catch(error => console.log("error", error));
  };

  render() {
    const { name, email, password, password2 } = this.state;
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          {this.state.message !== "" && (
            <div class="alert alert-warning alert-dismissible" role="alert">
              {this.state.message}
            </div>
          )}
          <h2>Register</h2>

          <label>Username</label>
          <input
            type="text"
            placeholder="User Name"
            name="name"
            value={name}
            onChange={this.onChange}
            required
          />
          <br />
          <label>Email</label>
          <input
            type="email"
            placeholder="Email address"
            name="email"
            value={email}
            onChange={this.onChange}
            required
          />
          <br />
          <label>Password</label>
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={this.onChange}
            required
          />
          <br />
          <label>Password</label>
          <input
            type="password"
            placeholder="Repeat Your Password"
            name="password2"
            value={password2}
            onChange={this.onChange}
            required
          />
          <br />
          <button type="submit">Register</button>
        </form>
      </div>
    );
  }
}

export default Register;

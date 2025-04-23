import React from "react";

export default class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      emailError: "",
      passwordError: "",
    };
  }

  handleInputChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
      emailError: "",
      passwordError: "",
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const { email, password } = this.state;
    let emailError = "";
    let passwordError = "";

    const validEmail = "user@example.com";
    const validPassword = "123456";

    if (!email && !password) {
      emailError = "Email belum diisi";
      passwordError = "Password belum diisi";
    } else if (!email) {
      emailError = "Email belum diisi";
    } else if (!password) {
      passwordError = "Password belum diisi";
    } else if (email !== validEmail && password !== validPassword) {
      emailError = "Email belum terdaftar";
    } else if (email !== validEmail) {
      emailError = "Email belum terdaftar";
    } else if (password !== validPassword) {
      passwordError = "Password salah";
    }

    if (emailError || passwordError) {
      this.setState({ emailError, passwordError });
      return;
    }

    console.log("Login berhasil!");
    this.setState({
      emailError: "",
      passwordError: "",
    });

    // Tambahkan navigasi ke dashboard jika perlu
  };

  render() {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
        <div className="flex flex-col bg-white shadow-md px-6 py-8 rounded-3xl w-50 max-w-md">
          <div className="font-medium self-center text-xl sm:text-3xl text-gray-800">
            Welcome Back
          </div>
          <div className="mt-4 self-center text-sm text-gray-800">
            Enter your credentials to access your account
          </div>

          <div className="mt-6">
            <form onSubmit={this.handleSubmit}>
              {/* Email Input */}
              <div className="flex flex-col mb-3">
                <label htmlFor="email" className="mb-1 text-xs text-gray-600">
                  E-Mail Address:
                </label>
                <div className="relative">
                  <div className="absolute left-0 top-0 h-full w-10 flex items-center justify-center text-red-500">
                    <i className="fas fa-at" />
                  </div>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    className={`pl-10 pr-4 py-2 border rounded-2xl w-full text-sm placeholder-gray-500 focus:outline-none ${
                      this.state.emailError
                        ? "border-red-400"
                        : "border-gray-400"
                    }`}
                    placeholder="Enter your email"
                    value={this.state.email}
                    onChange={this.handleInputChange}
                  />
                </div>
                {this.state.emailError && (
                  <span className="text-sm text-red-500 mt-1 ml-2">
                    {this.state.emailError}
                  </span>
                )}
              </div>

              {/* Password Input */}
              <div className="flex flex-col mb-4">
                <label htmlFor="password" className="mb-1 text-xs text-gray-600">
                  Password:
                </label>
                <div className="relative">
                  <div className="absolute left-0 top-0 h-full w-10 flex items-center justify-center text-red-500">
                    <i className="fas fa-lock" />
                  </div>
                  <input
                    id="password"
                    type="password"
                    name="password"
                    className={`pl-10 pr-4 py-2 border rounded-2xl w-full text-sm placeholder-gray-500 focus:outline-none ${
                      this.state.passwordError
                        ? "border-red-400"
                        : "border-gray-400"
                    }`}
                    placeholder="Enter your password"
                    value={this.state.password}
                    onChange={this.handleInputChange}
                  />
                </div>
                {this.state.passwordError && (
                  <span className="text-sm text-red-500 mt-1 ml-2">
                    {this.state.passwordError}
                  </span>
                )}
              </div>

              {/* Submit Button */}
              <div className="flex w-full">
                <button
                  type="submit"
                  className="w-full py-2 rounded-2xl bg-red-500 hover:bg-red-600 text-white text-sm uppercase font-semibold transition"
                >
                  Log In
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Register Link */}
        <div className="mt-6 text-gray-700 text-sm">
          Don't have an account?
          <a href="#" className="text-red-500 font-semibold ml-1">
            Register now
          </a>
        </div>
      </div>
    );
  }
}

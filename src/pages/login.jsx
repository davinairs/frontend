import React from "react";

export default class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
    };
  }

  handleInputChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    // Add login logic here, for example:
    console.log("Email:", this.state.email);
    console.log("Password:", this.state.password);
  };

  render() {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
        <div className="flex flex-col bg-white shadow-md px-4 sm:px-6 md:px-8 lg:px-10 py-8 rounded-3xl w-50 max-w-md">
          <div className="font-medium self-center text-xl sm:text-3xl text-gray-800">
            Welcome Back
          </div>
          <div className="mt-4 self-center text-xl sm:text-sm text-gray-800">
            Enter your credentials to access your account
          </div>

          <div className="mt-10">
            <form onSubmit={this.handleSubmit}>
              {/* Email Input */}
              <div className="flex flex-col mb-5">
                <label htmlFor="email" className="mb-1 text-xs tracking-wide text-gray-600">
                  E-Mail Address:
                </label>
                <div className="relative">
                  <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                    <i className="fas fa-at text-red-500"></i>
                  </div>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    className="text-sm placeholder-gray-500 pl-10 pr-4 rounded-2xl border border-gray-400 w-full py-2 focus:outline-none focus:border-red-400"
                    placeholder="Enter your email"
                    value={this.state.email}
                    onChange={this.handleInputChange}
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="flex flex-col mb-6">
                <label htmlFor="password" className="mb-1 text-xs sm:text-sm tracking-wide text-gray-600">
                  Password:
                </label>
                <div className="relative">
                  <div className="inline-flex items-center justify-center absolute left-0 top-0 h-full w-10 text-gray-400">
                    <span>
                      <i className="fas fa-lock text-red-500"></i>
                    </span>
                  </div>
                  <input
                    id="password"
                    type="password"
                    name="password"
                    className="text-sm placeholder-gray-500 pl-10 pr-4 rounded-2xl border border-gray-400 w-full py-2 focus:outline-none focus:border-red-400"
                    placeholder="Enter your password"
                    value={this.state.password}
                    onChange={this.handleInputChange}
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex w-full">
                <button
                  type="submit"
                  className="flex mt-2 items-center justify-center focus:outline-none text-white text-sm sm:text-base bg-red-500 hover:bg-red-600 rounded-2xl py-2 w-full transition duration-150 ease-in"
                >
                  <span className="mr-2 uppercase">Sign In</span>
                  <span>
                    <svg
                      className="h-6 w-6"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Register Link */}
        <div className="flex justify-center items-center mt-6">
          <a href="#" target="_blank" className="inline-flex items-center text-gray-700 font-medium text-xs text-center">
            <span className="ml-2">
              You don't have an account?
              <a href="#" className="text-xs ml-2 text-red-500 font-semibold">
                Register now
              </a>
            </span>
          </a>
        </div>
      </div>
    );
  }
}

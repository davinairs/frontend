import React from "react";

export default class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      error: "", // untuk pesan error
    };
  }

  handleInputChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
      error: "", // reset error saat mengetik
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const { email, password } = this.state;

    // Validasi input kosong
    if (!email && !password) {
      this.setState({ error: "Email dan password belum diisi" });
      return;
    } else if (!email) {
      this.setState({ error: "Email belum diisi" });
      return;
    } else if (!password) {
      this.setState({ error: "Password belum diisi" });
      return;
    }

    // Simulasi validasi login
    const validEmail = "user@example.com";
    const validPassword = "123456";

    if (email === validEmail && password === validPassword) {
      console.log("Login berhasil!");
      this.setState({ error: "" });
      // Tambahkan navigasi ke halaman dashboard di sini
    } else if (email !== validEmail && password !== validPassword) {
      this.setState({ error: "Email dan password salah." });
    } else if (email !== validEmail) {
      this.setState({ error: "Email salah." });
    } else if (password !== validPassword) {
      this.setState({ error: "Password salah." });
    }
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

          {/* Tampilkan pesan error jika ada */}
          {this.state.error && (
            <div className="mt-4 bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded text-sm">
              {this.state.error}
            </div>
          )}

          <div className="mt-6">
            <form onSubmit={this.handleSubmit}>
              {/* Email Input */}
              <div className="flex flex-col mb-5">
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
                    className="pl-10 pr-4 py-2 border rounded-2xl w-full text-sm placeholder-gray-500 border-gray-400 focus:outline-none focus:border-red-400"
                    placeholder="Enter your email"
                    value={this.state.email}
                    onChange={this.handleInputChange}
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="flex flex-col mb-6">
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
                    className="pl-10 pr-4 py-2 border rounded-2xl w-full text-sm placeholder-gray-500 border-gray-400 focus:outline-none focus:border-red-400"
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
                  className="w-full py-2 rounded-2xl bg-red-500 hover:bg-red-600 text-white text-sm uppercase font-semibold transition"
                >
                  Sign In
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

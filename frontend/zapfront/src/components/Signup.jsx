import { useState } from 'react';

export default function Signup() {
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleSubmit(event) {
    event.preventDefault(); // Prevent the default form submission behavior

    try {
      // Send a POST request to the server with the form data
      const response = await fetch('http://localhost:8000/zapapp/register/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, first_name:firstName, last_name:lastName, email, password })
      });

      // Handle the response from the server
      if (response.ok) {
        // Redirect to the home page or do something else
      } else {
        // Handle the error
      }
    } catch (error) {
      // Handle the error
    }
  }

  return (
    <div className="flex flex-col h-screen justify-center items-center">
      <div className="max-w-sm mx-auto md:px-10 p-4 w-full">
        <div>
          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              className="!w-full"
              id="username"
              name="username"
              type="text"
              autoFocus
              placeholder="Username"
              required
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
            <div className="flex gap-3">
              <div className="w-1/2">
                <input
                  className="w-full"
                  id="firstname"
                  name="firstname"
                  type="text"
                  autoFocus
                  placeholder="First name"
                  required
                  value={firstName}
                  onChange={(event) => setFirstName(event.target.value)}
                />
              </div>
              <div className="w-1/2">
                <input
                  className="w-full"
                  id="lastname"
                  name="lastname"
                  type="text"
                  autoFocus
                  placeholder="Last name"
                  required
                  value={lastName}
                  onChange={(event) => setLastName(event.target.value)}
                />
              </div>
            </div>
            <input
              className="!w-full"
              id="email"
              name="email"
              type="email"
              autoFocus
              placeholder="Email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            <input
              className="!w-full"
              id="password"
              name="password"
              type="password"
              autoFocus
              placeholder="Password"
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            <a href="#" className="hidden">
              <div className="text-sm text-right text-gray-400 py-4">
                {" "}
                Forget password{" "}
              </div>
            </a>
            <button
              type="submit"
              className="font-medium w-full rounded-lg bg-slate-900 py-1.5 px-4 text-white h-[38px] active:scale-[0.97] transition-all duration-150"
            >
              {" "}
              <span>Get Started</span>{" "}
            </button>
            <div className="space-x-2 text-sm text-center text-slate-400 dark:text-white/70">
              <span> i have account? </span>
              <span>—</span>
              <a
                href="form-login.html"
                className="text-gray-600 hover:text-gray-500"
              >
                Login
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
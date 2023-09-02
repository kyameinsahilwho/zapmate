import { useState } from "react";
function Login(){
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const onchangeUsername = (event) => {
    console.log(event.target.value);
    setUsername(event.target.value);
  }
  const onchangePassword = (event) => {
    console.log(event.target.value);
    setPassword(event.target.value);
  }
  async function handleSubmit (event) {
    event.preventDefault(); // Prevent the default form submission behavior
    
    await fetch('http://localhost:8000/zapapp/api/token/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username,password })
    })
      .then(response => {
        console.log(response)
        if (response.ok) {
          console.log(response)
        } else {
          console.log(response)
        }
      })
      .catch(error => {
          console.log(error)
      });
  };

return (
  <div class="flex flex-col h-screen justify-center items-center">
  <div class="max-w-sm mx-auto md:px-10 p-4 w-full">
    <div uk >

      <form onSubmit={handleSubmit} action="#" className="space-y-3" uk-scrollspy="target: > *; cls: uk-animation-scale-up; delay: 100 ;repeat: true">
        <input className="!w-full" id="username" name="username" type="text" onChange={onchangeUsername} autofocus placeholder="Username" required /> 
        <input className="!w-full" id="password" name="password" type="password" onChange={onchangePassword} autofocus placeholder="Password" required /> 
        <a href="#" className="hidden">
          <div className="text-sm text-right text-gray-400 py-4"> Forget password </div>
        </a>
        <button type="submit" className="font-medium w-full rounded-lg bg-slate-900 py-1.5 px-4 text-white h-[38px] active:scale-[0.97] transition-all duration-150"> <span>Sign in</span> </button>
        <div className="text-white mt-8 font-bold font-sans text-md subpixel-antialiased">OR</div>
        <button type="button" className="font-medium w-full rounded-lg bg-white py-1.5 px-4 text-slate-900 h-[38px] active:scale-[0.97] transition-all duration-150"> <span>New? Sign Up</span> </button>

      </form>
    </div>
    </div>
    </div>
  )
};
export default Login;

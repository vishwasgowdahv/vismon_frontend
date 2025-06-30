import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
export default function Login() {
  const baseUrl = "https://vismon-backend.onrender.com";
  //   const baseUrl = "https://7957-195-12-232-246.ngrok-free.app";
  //   const baseUrl = "http://localhost:3000";
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });
  const [togglePass, setTogglePass] = useState(true);
  useEffect(() => {
    if (localStorage.getItem("authtoken")) {
      navigate("/dashboard");
    }
  }, []);
  const navigate = useNavigate();
  const handleOnChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const apires = await fetch(`${baseUrl}/v1/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        email: userInfo.email,
        password: userInfo.password,
      }),
    });
    const jsonres = await apires.json();
    if (jsonres.sucess) {
      if (jsonres.authtoken) {
        localStorage.setItem("authtoken", jsonres.authtoken);
      } else {
        alert(jsonres);
      }
      setUserInfo({ email: "", password: "" });
      navigate("/dashboard");
    } else {
      alert(jsonres.error);
    }
  };
  return (
    <>
      <div className=" flex min-h-full flex-1 flex-col justify-center px-6 py-3 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl/9 font-medium tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSubmit} method="POST" className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm/6 font-medium text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  value={userInfo.email}
                  onChange={handleOnChange}
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Password
                </label>
                <div className="text-sm">
                  <a
                    href="#"
                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <div className="flex">
                <input
                  value={userInfo.password}
                  onChange={handleOnChange}
                  id="password"
                  name="password"
                  type={togglePass ? "password" : "text"}
                  required
                  autoComplete="current-password"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
                <img className="mx-[5px] h-[35px] w-[35px] border border-gray-300 rounded-md " src="src/assets/eye.png" onClick={()=>{setTogglePass(!togglePass)}}/>
                </div>
                
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm/6 text-gray-500">
            New Here ?{" "}
            <Link
              to="/signup"
              className="font-semibold text-indigo-600 hover:text-indigo-500"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}

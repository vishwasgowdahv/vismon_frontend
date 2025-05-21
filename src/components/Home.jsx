import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import logopng from "/assets/hero.png";
import { useEffect } from "react";

export default function Home() {
  const navigate = useNavigate();
  useEffect(()=>{
    if (localStorage.getItem("authtoken")) {
    navigate("/dashboard");
  }
  },[])
  return (
    <>
      <section className="bg-white sm:mt-[90px]">
        <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
          <div className="mr-auto place-self-center lg:col-span-7">
            <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl ">
              Manage your work days with your fingertips
            </h1>
            <p className="max-w-2xl mb-6 font-light text-gray-900 lg:mb-8 md:text-lg lg:text-xl ">
              Get your Detailed Overview of the worked days with proper Visuals
              and Structured Graphs
            </p>
            <Link
              to="/signup"
              className="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-white rounded-lg bg-black hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 "
            >
              Register Now
              <svg
                className="w-5 h-5 ml-2 -mr-1"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </Link>
            <Link
              to="/login"
              className="inline-flex items-center justify-center px-5 py-3 text-base font-bold text-center text-black border border-black rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 "
            >
              Login
            </Link>
          </div>
          <div className="order-first sm:order-last lg:mt-0 lg:col-span-5 m-4">
            <img src={logopng} alt="mockup" />
          </div>
        </div>
      </section>
    </>
  );
}

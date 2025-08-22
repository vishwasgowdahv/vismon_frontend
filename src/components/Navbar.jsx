import { Links, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import logopng from "/assets/vismon.png";
import profilelogo from "/assets/profile.jpg";
import workContext from "../contexts/works/workContext";
import MonthsOverview from "./MonthsOverview";

export default function Navbar() {
  const [toggleMenu, setToggleMenu] = useState(false);
  const context = useContext(workContext);
  const { userData } = context;

  const navigate = useNavigate();
  const logout = () => {
    localStorage.setItem("authtoken", "");
    navigate("/login");
  };
  const handleClick = () => {
    if (localStorage.getItem("authtoken")) {
      navigate("/dashboard");
    } else {
      navigate("/");
    }
  };
  return (
    <div className=" my-[20px] mx-[15px] sm:mx-[20px] flex justify-between items-center">
      <div className="" onClick={handleClick}>
        <img className=" h-15" src={logopng} alt="" />
      </div>

      {localStorage.getItem("authtoken") === "" ? (
        <div></div>
      ) : (
        <div className=" relative inline-block text-left">
          <div className="">
            <button
              onClick={() => {
                setToggleMenu(!toggleMenu);
              }}
              type="button"
              className="inline-flex w-full "
              id="menu-button"
              aria-expanded="true"
              aria-haspopup="true"
            >
              <img
                className=" cursor-pointer w-[40px] h-[40px]"
                src={profilelogo}
                alt=""
              />
            </button>
          </div>
          <div
            id="menuContents"
            className={`${
              toggleMenu ? "" : "hidden"
            } absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-hidden`}
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="menu-button"
            tabIndex="-1"
          >
            <div
              className="py-1 gap-1 flex-col flex items-center justify-center"
              role="none"
            >
              <p className="w-full border-b-1 rounded-md p-[10px] text-center">
                {userData.name}
              </p>
              <p className=" w-full border-b-1 rounded-md p-[10px] text-center">
                {userData.email}
              </p>
              <Link
                onClick={() => {
                  setToggleMenu(!toggleMenu);
                }}
                to="/lists"
              >
                Lists
              </Link>
              <button
                className="cursor-pointer p-[10px] my-[15px] text-center bg-amber-300 font-semiBold rounded-lg"
                onClick={() => {
                  const logoutConfirm = confirm(
                    "are you sure want to logout ?"
                  );
                  logoutConfirm ? logout() : "";
                }}
              >
                Logout &#10132;
                {/* &#9999; */}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

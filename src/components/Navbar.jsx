import { useNavigate } from "react-router-dom";
import logopng from "/assets/vismon.png";

export default function Navbar() {
  const navigate = useNavigate();
  const handleClick = () => {
    if (localStorage.getItem("authtoken")) {
      navigate("/dashboard");
    } else {
      navigate("/");
    }
  };
  return (
    <div onClick={handleClick} className="my-[20px] mx-[15px] sm:mx-[20px]">
      <img className=" h-15" src={logopng} alt="" />
    </div>
  );
}

import { useContext, useEffect, useState } from "react";
import WorkItem from "./WorkItem";
import { Link, useNavigate } from "react-router-dom";
import workContext from "../contexts/works/workContext";
import AddWork from "./AddWork";
import Loading from "./Loading";

export default function Dashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const context = useContext(workContext);
  const { fetchedWorks, fetchallworks } = context;
  const navigate = useNavigate();
  const [totalHours, setTotalHours] = useState(0);
  let tempiHour = 0;

  const [closeAddWorkModal, setCloseAddWorkModal] = useState(false);
  const handleCloseAddWorkModal = () => {
    setCloseAddWorkModal(true);
  };

  fetchedWorks.map((work) => {
    let workedDate = work.workStartDate.toString();
    workedDate.slice(0, 11);
    workedDate = new Date(workedDate);
    const startHour = Number(work.startTime.toString().slice(0, 2)) * 60;
    const endHour = Number(work.endTime.toString().slice(0, 2)) * 60;
    const startMinute = Number(work.startTime.toString().slice(3, 5));
    const endMinute = Number(work.endTime.toString().slice(3, 5));

    let workedHour;

    if (startHour > endHour) {
      // 1440 is the minutes in one day (24 * 60)
      let minutes = 1440 - (startHour + startMinute) + (endHour + endMinute);
      workedHour = Number(minutes / 60);
    } else {
      let minutes = endHour + endMinute - (startHour + startMinute);
      workedHour = Number(minutes / 60);
    }
    tempiHour += workedHour;
  });
  useEffect(() => {
    if (!localStorage.getItem("authtoken")) {
      navigate("/login");
    }
  }, []);
  useEffect(() => {
    fetchallworks().then(setIsLoading(false));
  }, []);
  const logout = () => {
    localStorage.setItem("authtoken", "");
    navigate("/login");
  };
  return (
    <div className="m-[20px]">
      <div className="flex justify-between mx-2 my-9 sm:m-8 ">
        <button
          onClick={handleCloseAddWorkModal}
          className="cursor-pointer border p-1.5 sm:p-3 font-semiBold rounded-lg"
        >
          ADD +
        </button>
        <button
          className="cursor-pointer  font-semiBold rounded-lg"
          onClick={() => {
            const logoutConfirm = confirm("are you sure want to logout ?");
            logoutConfirm ? logout() : "";
          }}
        >
          Logout &#10132;
          {/* &#9999; */}
        </button>
      </div>
      <h1 className="text-center m-[10px] sm:m-[30px] p-[10px] font-semiBold text-xl sm:text-5xl font font-semiBold rounded-xl">
        Overview of your Works Here
      </h1>

      <h1 className="text-center mx-[10px] my-[10px] p-[10px] sm:text-3xl font font-semiBold rounded-xl">
        You worked For{" "}
        <span className="rounded-4xl border bg-[#E7C22A] px-3 py-0.5">
          {(tempiHour / 24).toFixed(1)}
        </span>{" "}
        Days this Year
      </h1>

      <div className={closeAddWorkModal ? "" : "hidden"}>
        <AddWork setCloseAddWorkModal={setCloseAddWorkModal} />
      </div>

      <div className="mt-10 h-[70vh] no-scrollbar overflow-y-scroll w-full max-w-full p-4 bg-white border border-gray-300 rounded-lg shadow-sm sm:p-8 ">
        <div className="flex items-center justify-between mb-4">
          <h5 className="text-2xl font-bold leading-none text-gray-900 ">
            Your Activity
          </h5>
        </div>
        <div className="flow-root">
          <ul role="list" className="divide-y divide-gray-200 ">
            {isLoading ? (
              <Loading />
            ) : (
              fetchedWorks.map((work) => {
                let workedDate = work.workStartDate.toString();
                workedDate.slice(0, 11);
                workedDate = new Date(workedDate);

                const calculateWorkingHours = () => {
                  const startHour =
                    Number(work.startTime.toString().slice(0, 2)) * 60;
                  const endHour =
                    Number(work.endTime.toString().slice(0, 2)) * 60;
                  const startMinute = Number(
                    work.startTime.toString().slice(3, 5)
                  );
                  const endMinute = Number(work.endTime.toString().slice(3, 5));

                  let workedHour;

                  if (startHour > endHour) {
                    // 1440 is the minutes in one day (24 * 60)
                    let minutes =
                      1440 - (startHour + startMinute) + (endHour + endMinute);
                    workedHour = Number(minutes / 60);
                  } else {
                    let minutes =
                      endHour + endMinute - (startHour + startMinute);
                    workedHour = Number(minutes / 60);
                  }

                  // setTotalHours(totalHours + workedHour);
                  return workedHour;
                };
                //   const calcTotalHours = () => {
                //     setTotalHours(totalHours + calculateWorkingHours());
                //   };
                //   calcTotalHours();
                return (
                  <div
                    key={work._id}
                    className="border-b rounded-sm border-black my-[15px] p-[4px]"
                  >
                    <Link className="" to={`/work/${work._id}`}>
                      <WorkItem
                        totalHours={totalHours}
                        setTotalHours={setTotalHours}
                        calculateWorkingHours={calculateWorkingHours}
                        workedDate={workedDate}
                        companyName={work.companyName}
                        workStartDate={work.workStartDate}
                        startTime={work.startTime}
                        endTime={work.endTime}
                        wagePerHour={work.wagePerHour}
                        breakTaken={work.breakTaken}
                      />
                    </Link>
                  </div>
                );
              })
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

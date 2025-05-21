import { useState, useContext } from "react";
import workContext from "../contexts/works/workContext";

export default function AddWork(props) {
  const { setCloseAddWorkModal } = props;
  const context = useContext(workContext);
  const { addWork } = context;

  const [workInfo, setWorkInfo] = useState({
    companyName: "",
    workStartDate: "",
    workEndDate: "",
    startTime: "",
    endTime: "",
    tookVehicleToGo: "",
    tookVehicleToComeBack: "",
    wagePerHour: "",
    breakTaken: "0",
  });

  const handleOnChange = (e) => {
    setWorkInfo({ ...workInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    let tempi = false;

    for (const key in workInfo) {
      if (workInfo[key] == "") {
        tempi = true;
        break;
      }
    }

    if (tempi) {
      console.log("All Fields Are Mandatory");
      alert("All Fields Are Mandatory");
      return;
    } else {
      addWork(workInfo);
      setWorkInfo({
        companyName: "",
        workStartDate: "",
        workEndDate: "",
        startTime: "",
        endTime: "",
        tookVehicleToGo: "",
        tookVehicleToComeBack: "",
        wagePerHour: "",
        breakTaken: "",
      });
      setCloseAddWorkModal(false);
    }
  };
  return (
    <div>
      <div
        className="relative z-10"
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
      >
        <div
          className="fixed inset-0 bg-gray-500/75 transition-opacity"
          aria-hidden="true"
        ></div>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-xl">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3
                      className="text-2xl my-4 font-semibold text-gray-900"
                      id="modal-title"
                    >
                      Add Work Here
                    </h3>
                    <div className="mt-2 flex flex-col gap-4">
                      <div>
                        <label htmlFor="companyName"> Company Name : </label>
                        <input
                          value={workInfo.companyName}
                          onChange={handleOnChange}
                          className="border border-gray-300 p-1 rounded-lg"
                          type="text"
                          placeholder="Enter Company Name"
                          name="companyName"
                          id="companyName"
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <label htmlFor="workStartDate">From : </label>
                        <input
                          value={workInfo.workStartDate}
                          onChange={handleOnChange}
                          className="w-32 border border-gray-300 p-1 rounded-lg"
                          type="Date"
                          placeholder="Enter Date"
                          name="workStartDate"
                          id="workStartDate"
                        />

                        <label htmlFor="startTime">From :</label>
                        <input
                          value={workInfo.startTime}
                          onChange={handleOnChange}
                          className="w-16 sm:w-21 border border-gray-300 p-1 rounded-lg"
                          type="time"
                          placeholder="Enter From Time"
                          name="startTime"
                          id="startTime"
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <label htmlFor="workEndDate">To : </label>
                        <input
                          value={workInfo.workEndDate}
                          onChange={handleOnChange}
                          className="w-32 border border-gray-300 p-1 rounded-lg"
                          type="Date"
                          placeholder="Enter Date"
                          name="workEndDate"
                          id="workEndDate"
                        />

                        <label htmlFor="endTime"> To : </label>
                        <input
                          value={workInfo.endTime}
                          onChange={handleOnChange}
                          className="w-21 border border-gray-300 p-1 rounded-lg"
                          type="time"
                          placeholder="Enter Time"
                          name="endTime"
                          id="endTime"
                        />
                      </div>

                      <div>
                        <label htmlFor="tookVehicleToGo">
                          {" "}
                          Took a Cab to Go ? :{" "}
                        </label>
                        <select
                          value={workInfo.tookVehicleToGo}
                          onChange={handleOnChange}
                          className="w-20 border border-gray-300 p-1 rounded-lg"
                          name="tookVehicleToGo"
                          id="tookVehicleToGo"
                        >
                          <option value="">Select</option>
                          <option value="true">Yes</option>
                          <option value="false">No</option>
                        </select>
                      </div>

                      <div>
                        <label htmlFor="tookVehicleToComeBack">
                          {" "}
                          Took a Cab to Comeback ? :{" "}
                        </label>
                        <select
                          value={workInfo.tookVehicleToComeBack}
                          onChange={handleOnChange}
                          className="w-20 border border-gray-300 p-1 rounded-lg"
                          name="tookVehicleToComeBack"
                          id="tookVehicleToComeBack"
                        >
                          <option value="">Select</option>
                          <option value="true">Yes</option>
                          <option value="false">No</option>
                        </select>
                      </div>

                      <div>
                        <label htmlFor="wagePerHour"> Wage/Hour : </label>
                        <input
                          value={workInfo.wagePerHour}
                          onChange={handleOnChange}
                          className="border border-gray-300 p-1 rounded-lg"
                          type="text"
                          placeholder="Enter Wage Per Hour"
                          name="wagePerHour"
                          id="wagePerHour"
                        />
                      </div>
                      <div>
                        <label htmlFor="breakTaken"> Took a Break ? : </label>
                        <input
                          value={workInfo.breakTaken}
                          onChange={handleOnChange}
                          className="border border-gray-300 p-1 rounded-lg"
                          type="text"
                          placeholder="Took a Break ? "
                          name="breakTaken"
                          id="breakTaken"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                  onClick={handleSubmit}
                  type="button"
                  className="inline-flex w-full justify-center rounded-md bg-[#86f143] px-3 py-2 text-sm font-semibold text-black shadow-xs hover:bg-[#a3e977] sm:ml-3 sm:w-auto"
                >
                  Add Work
                </button>
                <button
                  onClick={() => {
                    setCloseAddWorkModal(false);
                  }}
                  type="button"
                  className=" cursor-pointer mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50 sm:mt-0 sm:w-auto"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

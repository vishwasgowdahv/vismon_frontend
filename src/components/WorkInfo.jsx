import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import workContext from "../contexts/works/workContext";
import UpdateWork from "./UpdateWork";
import Loading from "./Loading";

export default function WorkInfo() {
  const { id } = useParams();
  const context = useContext(workContext);
  const navigate = useNavigate();

  const { fetchWork, workInfo, deleteWork, deleteJsonres } = context;

  useEffect(() => {
    fetchWork(id);
  }, [id]);

  const handleDelete = () => {
    const confirmDelete = confirm("Are you Sure Want to delete this work ?");
    if (confirmDelete) {
      deleteWork(id);
      navigate("/dashboard");
    }
  };

  const [closeAddWorkModal, setCloseAddWorkModal] = useState(false);
  const handleCloseAddWorkModal = () => {
    setCloseAddWorkModal(true);
  };
  return !workInfo.companyName ? (
    <Loading />
  ) : (
    <div className="m-2 p-8 sm:p-10">
      <div>
        <div className="px-4 sm:px-0">
          <h3 className="text-base/7 font-semibold text-gray-900">
            Work OverView
          </h3>
        </div>
        <div className="mt-6 border-t border-gray-100">
          <dl className="divide-y divide-gray-100">
            <div className="px-4 py-2 sm:py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm/6 font-medium text-gray-900">Company</dt>
              <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                {workInfo.companyName}
              </dd>
            </div>
            <div className="px-4 py-2 sm:py-4  sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm/6 font-medium text-gray-900">
                Work Started
              </dt>
              <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                {`${workInfo.workStartDate.toString()} |  ${
                  workInfo.startTime
                }`}
              </dd>
            </div>
            <div className="px-4 py-2 sm:py-4  sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm/6 font-medium text-gray-900">
                Work Ended
              </dt>
              <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                {`${workInfo.workEndDate} | ${workInfo.endTime}`}
              </dd>
            </div>
            <div className="px-4 py-2 sm:py-4  sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm/6 font-medium text-gray-900">
                Cab Took to go to work
              </dt>
              <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                {workInfo.tookVehicleToGo ? "YES" : "NO"}
              </dd>
            </div>
            <div className="px-4 py-2 sm:py-4  sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm/6 font-medium text-gray-900">
                Cab Took to come back from work
              </dt>
              <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                {workInfo.tookVehicleToComeBack ? "YES" : "NO"}
              </dd>
            </div>
            <div className="px-4 py-2 sm:py-4  sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm/6 font-medium text-gray-900">
                Wage Per Hour
              </dt>
              <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                {workInfo.wagePerHour}
              </dd>
            </div>
            <div className="px-4 py-2 sm:py-4  sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm/6 font-medium text-gray-900">
                Break Taken
              </dt>
              <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                {workInfo.breakTaken}
              </dd>
            </div>

            <div className="flex justify-center gap-6 sm:gap-20 m-6">
              <button
                onClick={handleCloseAddWorkModal}
                className="cursor-pointer bg-[#80E142] p-3 font-semiBold rounded-lg"
              >
                Update
              </button>
              <button
                onClick={handleDelete}
                className="cursor-pointer bg-[#d32323] p-3 font-semiBold rounded-lg"
              >
                Delete
              </button>
            </div>
          </dl>
        </div>
      </div>

      <div className={closeAddWorkModal ? "" : "hidden"}>
        <UpdateWork
          id={id}
          workInfoFromProps={workInfo}
          setCloseAddWorkModal={setCloseAddWorkModal}
        />
      </div>
    </div>
  );
}

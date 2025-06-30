import WorkContext from "./workContext";
import { useState } from "react";
export default function WorkState(props) {
  const [fetchedWorks, setFetchedWorks] = useState([]);
  const [userData, setUserData] = useState([]);

  const baseUrl = "https://vismon-backend.onrender.com";
  //   const baseUrl = "https://7957-195-12-232-246.ngrok-free.app";
  //   const baseUrl = "http://localhost:3000";

  const fetchallworks = async () => {
    const apires = await fetch(`${baseUrl}/v1/api/work/fetchallworks`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authtoken: localStorage.getItem("authtoken"),
        "ngrok-skip-browser-warning": "69420",
        "Access-Control-Allow-Origin": "*",
      },
    });
    const jsonres = await apires.json();
    setFetchedWorks(jsonres.works);
  }; 

  ////////  fetch single work

  const [workInfo, setWorkInfo] = useState([]);
  const fetchWork = async (id) => {
    const apires = await fetch(`${baseUrl}/v1/api/work/fetchwork/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authtoken: localStorage.getItem("authtoken"),
        "Access-Control-Allow-Origin": "*",
        "ngrok-skip-browser-warning": "69420",
      },
    });
    const jsonres = await apires.json();
    if (jsonres.sucess) {
      setWorkInfo(jsonres.works);
    } else {
      alert(jsonres.error);
    }
  };

  //////   Add Work

  const addWork = async (workInfo) => {
    const apires = await fetch(`${baseUrl}/v1/api/work/addwork`, {
      method: "POST",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
        authtoken: localStorage.getItem("authtoken"),
        "Access-Control-Allow-Origin": "*",
        "ngrok-skip-browser-warning": "69420",
      },
      body: JSON.stringify({
        companyName: workInfo.companyName,
        workStartDate: workInfo.workStartDate,
        workEndDate: workInfo.workEndDate,
        startTime: workInfo.startTime,
        endTime: workInfo.endTime,
        tookVehicleToGo: workInfo.tookVehicleToGo,
        tookVehicleToComeBack: workInfo.tookVehicleToComeBack,
        wagePerHour: workInfo.wagePerHour,
        breakTaken: workInfo.breakTaken,
      }),
    });
    const jsonres = await apires.json();
    if (jsonres.sucess) {
      fetchallworks();
    } else {
      alert(jsonres.error[0].msg);
    }
  };

  //////   Update Work

  const updateWork = async (workInfo, id) => {
    console.log(workInfo);
    const apires = await fetch(`${baseUrl}/v1/api/work/updatework/${id}`, {
      method: "POST",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
        authtoken: localStorage.getItem("authtoken"),
        "Access-Control-Allow-Origin": "*",
        "ngrok-skip-browser-warning": "69420",
      },
      body: JSON.stringify({
        companyName: workInfo.companyName,
        workStartDate: workInfo.workStartDate,
        workEndDate: workInfo.workEndDate,
        startTime: workInfo.startTime,
        endTime: workInfo.endTime,
        tookVehicleToGo: workInfo.tookVehicleToGo,
        tookVehicleToComeBack: workInfo.tookVehicleToComeBack,
        wagePerHour: workInfo.wagePerHour,
        breakTaken: workInfo.breakTaken,
      }),
    });

    const jsonres = await apires.json();
    console.log(jsonres.sucess);

    if (jsonres.sucess) {
      fetchWork(id);
    } else {
      alert(jsonres.error[0].msg);
    }
  };

  //// delete Work
  const deleteWork = async (id) => {
    const apires = await fetch(`${baseUrl}/v1/api/work/deletework/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authtoken: localStorage.getItem("authtoken"),
        "Access-Control-Allow-Origin":"*",
        "ngrok-skip-browser-warning": "69420",
      },
    });
    const jsonres = await apires.json();
    if (jsonres.sucess) {
      fetchallworks();
    } else {
      alert(jsonres.error);
    }
  };











  ///*******    fetch user      ***** */

  const fetchUsers = async () => {
    const apires = await fetch(`${baseUrl}/v1/api/auth/fetchuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authtoken: localStorage.getItem("authtoken"),
        "ngrok-skip-browser-warning": "69420",
        "Access-Control-Allow-Origin": "*",
      },
    });
    const jsonres = await apires.json();
    setUserData(jsonres.user);
  }; 









  return (
    <WorkContext.Provider
      value={{
        updateWork,
        fetchedWorks,
        fetchallworks,
        fetchWork,
        workInfo,
        addWork,
        deleteWork,
        fetchUsers,
        userData
      }}
    >
      {props.children}
    </WorkContext.Provider>
  );
}

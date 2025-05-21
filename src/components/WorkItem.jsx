
export default function WorkItem(props) {
  const {
    calculateWorkingHours,
    workedDate,
    companyName,
    workStartDate,
    startTime,
    endTime,
    wagePerHour,
    breakTaken,
  } = props;
//   let workedDate = workStartDate.toString();
//   workedDate.slice(0, 11);
//   workedDate = new Date(workedDate);

//   const calculateWorkingHours = () => {
//     const startHour = Number(startTime.toString().slice(0, 2)) * 60;
//     const endHour = Number(endTime.toString().slice(0, 2)) * 60;
//     const startMinute = Number(startTime.toString().slice(3, 5));
//     const endMinute = Number(endTime.toString().slice(3, 5));

//     let workedHour;

//     if (startHour > endHour) {
//       // 1440 is the minutes in one day (24 * 60)
//       let minutes = 1440 - (startHour + startMinute) + (endHour + endMinute);
//       workedHour = Number(minutes / 60);
//     } else {
//       let minutes = endHour + endMinute - (startHour + startMinute);
//       workedHour = Number(minutes / 60);
//     }

//     // setTotalHours((prev) => prev + workedHour);
//     return workedHour;
//   };

//   useEffect(() => {
    // setTotalHours( totalHours + workTempi);
//   });

  return (
    <li className=" px-3 py-1 sm:py-2">
      <div className="flex items-center">
        <div className="flex-1">
          <p className="text-lg font-semibold text-black truncate ">
            {companyName.toUpperCase()}
          </p>
          <div className=" flex text-[13px] sm:text-sm items-center  gap-2">
            <p>
              {` ${workedDate.getDate()} - ${
                workedDate.getMonth() + 1
              } - ${workedDate.getFullYear()} `}
            </p>

            <p className="text-[9px] sm:text-[11px] w-16 sm:w-20 h-4 flex rounded-2xl border border-gray-400 font-semiBold text-black justify-center items-center">
              {`${startTime.toString().slice(0, 2)}:${startTime
                .toString()
                .slice(3, 5)} - ${endTime.toString().slice(0, 2)}:${endTime
                .toString()
                .slice(3, 5)}`}
            </p>
          </div>
        </div>
        <div className="inline-flex flex-col items-center text-base font-semibold text-gray-900 ">
          <p className="bg-[#80E142] border text-[12px] sm:text-lg px-[12px] py-[2px] rounded-2xl">
            {" "}
            € {(wagePerHour * calculateWorkingHours()).toFixed(2)}
          </p>
        </div>
      </div>
    </li>
  );
}

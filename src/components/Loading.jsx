import loader from "/assets/loader1.gif";

export default function Loading() {
  return (
    <div className="h-[60vh] flex items-center justify-center">
      <img className="w-[30vw] h-[10vh]" src={loader} alt="" />
    </div>
  );
}

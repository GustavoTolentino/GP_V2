export default function LoadingPage() {
  return (
    <div className="flex justify-center items-center w-full h-full absolute top-0 left-0  bg-opacity-50  z-50">
      <div className="spinner">
        <div className="rect1"></div>
        <div className="rect2"></div>
        <div className="rect3"></div>
        <div className="rect4"></div>
        <div className="rect5"></div>
      </div>
    </div>
  );
}

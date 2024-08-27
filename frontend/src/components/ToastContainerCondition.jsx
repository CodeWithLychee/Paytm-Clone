import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ToastContainerCondition = () => {
  const isMobile = window.innerWidth <= 600;
  const toastPositon = isMobile ? "bottom-center" : "top-right";

  return (
    <ToastContainer
      className={"fs-5 mt-4"}
      position={toastPositon}
      autoClose={5000}
      hideProgressBar={false}
      closeOnClick
    />
  );
};

export default ToastContainerCondition;

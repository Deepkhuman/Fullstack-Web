import { toast } from "react-toastify";

const handlesuccess = (msg) => {
  toast.success(msg, {
    position: "top-right",
    autoClose: 1000,
  });
};

const handleerror = (msg) => {
  toast.error(msg, {
    position: "top-right",
    autoClose: 1000,
  });
};

export { handlesuccess, handleerror };

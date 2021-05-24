import defaultAxios from "axios";
import { useState, useEffect } from "react";

// axios에 대한 hooks
const useAxios = (opts, axiosInstance = defaultAxios) => {
  const [state, setState] = useState({
    loading: true,
    data: null,
  });
  useEffect(() => {
    axiosInstance(opts)
      .then((data) => {
        setState({
          ...state,
          loading: false,
          data,
        });
      })
      .catch((err) => {
        setState({ ...state, loading: false, err });
      });
  }, []);
  if (!opts.url) {
    return;
  }
  return { ...state };
};

export default useAxios;

import { useState } from "react";
import useAxios from "./useAxios";

const defaultOptions: O = {
  withCredentials: true,
  headers: {
    Accept: "application/json",
  },
};

export const useRequest = (
  url: string,
  opts?: O
): {
  loading: boolean;
  result: any;
  [propname: string]: any;
} => {
  const { onData, axiosOptions, handleResponseData, ...useAxiosOptions }: any =
    opts || {};
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const customHandler = (error, _data) => {
    // result has been extracted by response interceptor
    if (!error && _data) {
      const _result = handleResponseData?.(_data) ?? _data;
      setResult(_result);
      onData?.(_result);
    } else if (error) {
      setError(error);
    }
  };

  const { loading } = useAxios({
    url,
    method: "GET",
    options: { ...defaultOptions, ...axiosOptions },
    trigger: "only once by default",
    ...useAxiosOptions,
    customHandler,
  });

  if (!url) return { loading: false, result: null };

  return { loading, result, error };
};

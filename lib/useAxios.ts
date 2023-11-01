/* eslint-disable max-len */
import { useEffect, useReducer } from "react";
import axios from "axios";

// import { initialResponse, responseReducer } from './reducers';

interface StateProps {
  response;
  error;
  loading: boolean;
}
interface ActionProps {
  type;
  payload;
}
export const initialResponse: StateProps = {
  response: null,
  error: null,
  loading: false,
};

export function responseReducer(
  state: StateProps,
  action: ActionProps
): StateProps {
  switch (action.type) {
    case "init":
      return { response: null, error: null, loading: true };
    case "success":
      return { response: action.payload, error: null, loading: false };
    case "fail":
      return { response: null, error: action.payload, loading: false };
    default:
      return { ...state, ...initialResponse };
  }
}

/**
 * Params
 * @param  {string} url - The request URL
 * @param  {('GET'|'POST'|'PUT'|'DELETE'|'HEAD'|'OPTIONS'|'PATCH')} method - The request method
 * @param  {object} [options={}] - (optional) The config options of Axios.js (https://goo.gl/UPLqaK)
 * @param  {object|string} trigger - (optional) The conditions for AUTO RUN, refer the concepts of [conditions](https://reactjs.org/docs/hooks-reference.html#conditionally-firing-an-effect) of useEffect, but ONLY support string and plain object. If the value is a constant, it'll trigger ONLY once at the begining
 * @param  {function} [forceDispatchEffect=() => true] - (optional) Trigger filter function, only AUTO RUN when get `true`, leave it unset unless you don't want AUTU RUN by all updates of trigger
 * @param  {function} [customHandler=(error, response) => {}] - (optional) Custom handler callback, NOTE: `error` and `response` will be set to `null` before request
 */

/**
 * Returns
 * @param  {object} response - The response of Axios.js (https://goo.gl/dJ6QcV)
 * @param  {object} error - HTTP error
 * @param  {boolean} loading - The loading status
 * @param  {function} reFetch - MANUAL RUN trigger function for making a request manually
 */

const { CancelToken } = axios;

interface Props {
  url;
  method;
  options;
  trigger;
  forceDispatchEffect;
  customHandler;
}

export default function useAxios({
  url,
  method = "get",
  options,
  trigger,
  forceDispatchEffect,
  customHandler,
}: Props): StateProps & { [propname: string]: any } {
  const [results, dispatch]: any = useReducer(responseReducer, initialResponse);
  const outerTrigger = trigger && JSON.stringify(trigger);
  const source = CancelToken.source();
  const dispatchEffect = forceDispatchEffect || (() => true);

  const onFetch = async () => {
    dispatch({ type: "init" });
    try {
      const response = await axios({
        url,
        method,
        ...options,
        cancelToken: source.token,
      });
      dispatch({ type: "success", payload: response });
      customHandler?.(null, response);
    } catch (error) {
      customHandler?.(error, null);
      if (!axios.isCancel(error)) {
        dispatch({ type: "fail", payload: error });
      }
    }
  };

  useEffect(() => {
    if (!url || !dispatchEffect()) return;
    // ONLY trigger by query
    if (typeof outerTrigger === "undefined") return;

    // Send Request
    onFetch();

    return () => source.cancel();
  }, [outerTrigger]);

  return results;
}

import { useState } from 'react';
import useAxios from './useAxios';
import axios from 'axios';
import Qs from 'qs';

const defaultOptions: O = {
  withCredentials: true,
  headers: {
    Accept: 'application/json',
  },
};

const isFormData = (v) => Object.prototype.toString.call(v) === '[object FormData]';

function _transformUrl(origin_url, data = {}, rmEnd) {
  const reg = /:[\w_\-.]+/g;
  // const reg = new RegExp(':[\\w_\\-.]+', 'g');
  let copiedUrl = origin_url;
  const copiedData = JSON.parse(JSON.stringify(data));

  const matched = copiedUrl.match(reg);
  /**
   * 判断目标字符串是否以指定字符串结尾
   * @param {*} endStr
   */
  String.prototype.endsWith = function (endStr) {
    const d = this.length - endStr.length;
    return d >= 0 && this.lastIndexOf(endStr) === d;
  };
  // 处理指定参数
  if (matched && matched.length) {
    matched.forEach((item) => {
      const key = item.replace(/:/, '');
      let value = '';
      if (copiedData[key] !== undefined) {
        value = copiedData[key];
        delete copiedData[key];
      }
      // 原有判断冗余，且影响url query添加变量
      copiedUrl = copiedUrl.replace(item, value);
    });
  }
  // 去除重复冗余的/
  copiedUrl = copiedUrl.replace(/\/\//g, '/');
  // 去除末尾冗余的/，可选
  if (rmEnd && copiedUrl.match(/.+\/$/)) copiedUrl = copiedUrl.substr(0, copiedUrl.length - 1);

  return {
    url: copiedUrl,
    data: copiedData,
  };
}

export const interceptRequest = (handleConfig: (...p) => void | any): void => {
  // Global response handler
  axios.interceptors.request.use(
    (config) => handleConfig?.(config),
    (error) => Promise.reject(error),
  );
};

interface Props {
  handleUnauthorized?;
  handleSuccess?;
  handleError?;
}

export const interceptResponse = ({ handleUnauthorized, handleSuccess, handleError }: Props): void => {
  // Global response handler
  axios.interceptors.response.use(handleSuccess, (error) => {
    if (error && error.response && error.response.status === 401) {
      handleUnauthorized?.();
      return Promise.reject();
    }
    if (typeof handleError === 'function') {
      handleError?.(error);
      return Promise.reject(error);
    }

    return Promise.reject(error);
  });
};

export const get = (apiUrl: string, params?: O, options = defaultOptions, rmEnd = false): any => {
  const { url, data } = _transformUrl(apiUrl, params, rmEnd);
  return axios({
    url,
    method: 'get',
    params: data,
    paramsSerializer: (params) => Qs.stringify(params),
    ...defaultOptions,
    ...options,
  });
};

export const post = (apiUrl: string, params?: O, options = defaultOptions, rmEnd = false): any => {
  const { url, data = {} } = _transformUrl(apiUrl, params, rmEnd);
  return axios({
    url,
    method: 'post',
    data: isFormData(params) ? params : data,
    ...defaultOptions,
    ...options,
  });
};

export const put = (apiUrl: string, params?: O, options = defaultOptions, rmEnd = false): any => {
  const { url, data = {} } = _transformUrl(apiUrl, params, rmEnd);

  return axios({
    url,
    method: 'put',
    data: isFormData(params) ? params : data,
    ...defaultOptions,
    ...options,
  });
};

export const patch = (apiUrl: string, params?: O, options = defaultOptions, rmEnd = false): any => {
  const { url, data = {} } = _transformUrl(apiUrl, params, rmEnd);

  return axios({
    ...defaultOptions,
    ...options,
    url,
    method: 'patch',
    data,
  });
};

export const del = (apiUrl: string, params?: O, options = defaultOptions, rmEnd = false): any => {
  const { url, data = {} } = _transformUrl(apiUrl, params, rmEnd);

  return axios({
    ...defaultOptions,
    ...options,
    url,
    method: 'delete',
    data,
  });
};

export const useRequest = (
  url: string,
  opts?: O,
): {
  loading: boolean;
  result: any;
  [propname: string]: any;
} => {
  const { onData, axiosOptions, handleResponseData, ...useAxiosOptions }: any = opts || {};
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
    method: 'GET',
    options: { ...defaultOptions, ...axiosOptions },
    trigger: 'only once by default',
    ...useAxiosOptions,
    customHandler,
  });

  if (!url) return { loading: false, result: null };

  return { loading, result, error };
};

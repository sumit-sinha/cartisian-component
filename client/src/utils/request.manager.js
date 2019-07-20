import { employees } from '../mocks/employees';

const MethodType = {
  GET: 'GET',
  POST: 'POST',
  DELETE: 'DELETE',
  PUT: 'PUT',
};

const makeServerRequest = async (params) => {
  const { body, headers: paramHeaders, method, url } = params;
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/x-www-form-urlencoded',
    ...paramHeaders,
  };

  const response = await fetch(url, {
    body,
    credentials: 'same-origin',
    headers,
    method: method || MethodType.GET,
  });

  return response.json();
};

export const isAPIAvailable = false;

const getUser = (userName) => {
  return employees.find((employee) => employee.userName === userName);
};

export const getMyInformation = (userName) =>
  isAPIAvailable
    ? makeServerRequest({
        method: MethodType.GET,
        url: `/me/${userName}`,
      })
    : new Promise((resolve) => resolve(getUser(userName)));

export const setBusy = (userName) =>
  makeServerRequest({
    body: { time: new Date().getTime() },
    method: MethodType.POST,
    url: `/me/${userName}/busy`,
  });

export const setAvailable = (userName) =>
  makeServerRequest({
    method: MethodType.POST,
    url: `/me/${userName}/available`,
  });


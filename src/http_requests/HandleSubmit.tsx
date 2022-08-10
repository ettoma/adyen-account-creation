import { FormEvent } from "react";

const HandleFormSubmit = (
  e: FormEvent,
  data: object,
  setJsonData: Function
) => {
  e.preventDefault();

  setJsonData(JSON.stringify(data));
};

const HandlePostRequest = (
  data: string,
  setJsonResponse: Function,
  setIsSuccess: Function,
  setNextPageOk: Function
) => {
  fetch("http://localhost:8080/create-account-holder", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: data,
  }).then((res) =>
    HandleResponseDisplay(res, setJsonResponse, setIsSuccess, setNextPageOk)
  );
};

const HandleResponseDisplay = (
  res: Response,
  setJsonResponse: Function,
  setIsSuccess: Function,
  setNextPageOk: Function
) => {
  res.json().then((res) => {
    setJsonResponse(res);
    if (res.status != 200) {
      setIsSuccess(false);
      setNextPageOk(false);
    } else {
      setIsSuccess(true);
      setNextPageOk(true);
    }
  });
};

export { HandleFormSubmit, HandlePostRequest };

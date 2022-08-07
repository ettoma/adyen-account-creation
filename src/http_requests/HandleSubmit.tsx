import { FormEvent } from "react";

const HandleFormSubmit = (
  e: FormEvent,
  setIsDialogOpen: Function,
  data: object,
  setJsonData: Function
) => {
  e.preventDefault();
  setJsonData(JSON.stringify(data));
  setIsDialogOpen(true);
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
    HandleResponseDisplay(
      res,
      res.status,
      setJsonResponse,
      setIsSuccess,
      setNextPageOk
    )
  );
};

const HandleResponseDisplay = (
  res: Response,
  status: number,
  setJsonResponse: Function,
  setIsSuccess: Function,
  setNextPageOk: Function
) => {
  res.json().then((res) => {
    setJsonResponse(res);
    if (status != 200) {
      setIsSuccess(false);
      setNextPageOk(false);
    } else {
      setIsSuccess(true);
      setNextPageOk(true);
    }
  });
};

export { HandleFormSubmit, HandlePostRequest };

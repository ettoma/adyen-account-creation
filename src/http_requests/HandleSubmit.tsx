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

const HandlePostRequest = (data: string) => {
  fetch("http://localhost:8080/create-account-holder", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: data,
  }).then((res) => console.log(res));
};

export { HandleFormSubmit, HandlePostRequest };

// import { FormEvent } from "react";

// class HandleSubmit {
//   jsonData: string = "";
//   isSuccess: boolean = false;

//   handlePreview(e: FormEvent, data: any) {
//     e.preventDefault();

//     this.jsonData = JSON.stringify(data);
//   }

//   handleSendRequest() {
//     fetch("http://localhost:8080/create-account-holder", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: this.jsonData,
//     }).then((res) => this.handleResponseDisplay(res, res.status));
//   }

//   handleResponseDisplay(res: Response, status: number) {
//     res.json().then((res) => {
//       if (status != 200) {
//         this.isSuccess = true;
//       }
//     });
//     //   res.json().then((res) => {
//     //     setJsonResponse(res);
//     //     setIsOpen(true);
//     //     if (status === 200) {
//     //       setIsSuccess(true);
//     //     } else {
//     //       setIsSuccess(false);
//     //     }
//     //   });
//   }

//   handleSuccess() {
//     console.log("success");
//     return this.isSuccess;
//   }
// }

// export default HandleSubmit;

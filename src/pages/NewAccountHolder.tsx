import { useState } from "react";
import JSONPretty from "react-json-pretty";

import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";

import "./styles/NewAccountHolder.scss";
import {
  FormControl,
  FormLabel,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";

const NewAccountHolder = () => {
  const [accountHolderCode, setAccountHolderCode] = useState("");
  const [country, setCountry] = useState("");
  const [doingBusinessAs, setDoingBusinessAs] = useState("");
  const [legalBusinessName, setLegalBusinessName] = useState("");
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [shareholderType, setShareholderType] = useState("Controller");
  const [jobTitle, setJobTitle] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("Male");
  const [addressCountry, setAddressCountry] = useState("");
  const [shareholderEmail, setShareholderEmail] = useState("");
  const [email, setEmail] = useState("");
  const [webAddress, setWebAddress] = useState("");

  const [jsonData, setJsonData] = useState("");
  const [isHidden, setIsHidden] = useState(true);

  const [jsonResponse, setJsonResponse] = useState("");

  const data = {
    accountHolderCode: accountHolderCode,
    countryAccount: country,
    doingBusinessAs: doingBusinessAs,
    legalBusinessName: legalBusinessName,
    registrationNumber: registrationNumber,
    shareholderType: shareholderType,
    jobTitle: jobTitle,
    firstName: firstName,
    gender: gender,
    lastName: lastName,
    addressCountry: addressCountry,
    shareholderEmail: shareholderEmail,
    email: email,
    webAddress: webAddress,
    legalEntity: "Business",
    processingTier: 1,
  };

  function handlePreview(e: any) {
    e.preventDefault();

    const jsonData = JSON.stringify(data);

    setJsonData(jsonData);
    setIsHidden(false);
  }

  function handleSendRequest() {
    fetch("http://localhost:8080/createAccountHolder", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: jsonData,
    }).then((res) => handleResponseDisplay(res));
  }

  function handleResponseDisplay(res: Response) {
    res.json().then((res) => {
      setJsonResponse(res);
    });
  }

  return (
    <div className="main-container">
      <div>
        <h3>New Account Holder</h3>
        <form onSubmit={(e) => handlePreview(e)}>
          <FormControl fullWidth>
            <FormLabel>Account holder code</FormLabel>
            <TextField
              label="Account holder code"
              type="text"
              value={accountHolderCode}
              onChange={(e) => setAccountHolderCode(e.target.value)}
              placeholder="widget slug"
            />
          </FormControl>
          <InputLabel>Country</InputLabel>
          <TextField
            type="text"
            placeholder="country as ISO code"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            // maxLength={2}
          />
          <InputLabel>Doing business as</InputLabel>
          <TextField
            type="text"
            value={doingBusinessAs}
            onChange={(e) => setDoingBusinessAs(e.target.value)}
            placeholder="Normally the name of the company"
          />
          <InputLabel>Legal business name</InputLabel>
          <TextField
            type="text"
            value={legalBusinessName}
            onChange={(e) => setLegalBusinessName(e.target.value)}
            placeholder="Legal name of the company"
          />
          <InputLabel>Registration number</InputLabel>
          <TextField
            type="text"
            value={registrationNumber}
            onChange={(e) => setRegistrationNumber(e.target.value)}
            placeholder="Company registration number"
          />
          <InputLabel>Shareholder type</InputLabel>
          <Select
            onChange={(e) => setShareholderType(e.target.value)}
            value={shareholderType}
          >
            <MenuItem value="Controller">Controller</MenuItem>
            <MenuItem value="Owner">Owner</MenuItem>
          </Select>
          <InputLabel>Job title</InputLabel>
          <TextField
            type="text"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
            placeholder="COO or similar"
          />
          <InputLabel>First name</InputLabel>
          <TextField
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <InputLabel>Last name</InputLabel>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <InputLabel>Gender</InputLabel>
          <select onChange={(e) => setGender(e.target.value)} value={gender}>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
          <InputLabel>Shareholder email address</InputLabel>
          <input
            type="text"
            value={shareholderEmail}
            onChange={(e) => setShareholderEmail(e.target.value)}
          />

          <InputLabel>Shareholder address country</InputLabel>
          <input
            type="text"
            value={addressCountry}
            onChange={(e) => setAddressCountry(e.target.value)}
            placeholder="country as ISO code"
            maxLength={2}
          />
          <InputLabel>Email address</InputLabel>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Customer service email address"
          />
          <InputLabel>Web address</InputLabel>
          <input
            type="text"
            value={webAddress}
            onChange={(e) => setWebAddress(e.target.value)}
            placeholder="Partner's website"
          />

          <Button type="submit">Preview</Button>
        </form>
      </div>
      <div hidden={isHidden}>
        <JSONPretty data={jsonData}></JSONPretty>
        <Button onClick={() => handleSendRequest()} endIcon={<SendIcon />}>
          Send
        </Button>
      </div>
      <div hidden={jsonResponse != "" ? false : true}>
        <JSONPretty data={jsonResponse}></JSONPretty>
      </div>
    </div>
  );
};

export default NewAccountHolder;

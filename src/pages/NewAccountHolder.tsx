import { useState } from "react";
import JSONPretty from "react-json-pretty";

import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";

import "./styles/NewAccountHolder.scss";
import {
  Alert,
  Dialog,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
  TextField,
  Typography,
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
  const [isOpen, setIsOpen] = useState(false);

  const [isSuccess, setIsSuccess] = useState<Boolean>();

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
    }).then((res) => handleResponseDisplay(res, res.status));
  }

  function handleResponseDisplay(res: Response, status: number) {
    res.json().then((res) => {
      setJsonResponse(res);
      setIsOpen(true);
      if (status === 200) {
        setIsSuccess(true);
      } else {
        setIsSuccess(false);
      }
    });
  }

  return (
    <div className="main-container">
      <div>
        <Typography component="h1">Create Account Holder</Typography>
        <form onSubmit={(e) => handlePreview(e)}>
          <FormControl fullWidth>
            <TextField
              label="Account holder code"
              type="text"
              value={accountHolderCode}
              onChange={(e) => setAccountHolderCode(e.target.value)}
              placeholder="widget slug"
            />
          </FormControl>
          <FormControl fullWidth>
            <TextField
              label="Country of account"
              type="text"
              placeholder="country as ISO code"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              // maxLength={2}
            />
            <FormHelperText>Check the country codes here</FormHelperText>
          </FormControl>
          <TextField
            label="Doing business as"
            type="text"
            value={doingBusinessAs}
            onChange={(e) => setDoingBusinessAs(e.target.value)}
            placeholder="Normally the name of the company"
          />
          <TextField
            label="Legal business name"
            type="text"
            value={legalBusinessName}
            onChange={(e) => setLegalBusinessName(e.target.value)}
            placeholder="Legal name of the company"
          />
          <TextField
            label="Registration number"
            type="text"
            value={registrationNumber}
            onChange={(e) => setRegistrationNumber(e.target.value)}
            placeholder="Company registration number"
          />
          <InputLabel id="demo-simple-select-label">
            Shareholder type
          </InputLabel>
          <Select
            label="Shareholder type"
            onChange={(e) => setShareholderType(e.target.value)}
            value={shareholderType}
          >
            <MenuItem value="Controller">Controller</MenuItem>
            <MenuItem value="Owner">Owner</MenuItem>
          </Select>
          <TextField
            label="Job title"
            type="text"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
            placeholder="COO or similar"
          />
          <TextField
            label="First name"
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <TextField
            label="Last name"
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <Select onChange={(e) => setGender(e.target.value)} value={gender}>
            <MenuItem value="Male">Male</MenuItem>
            <MenuItem value="Female">Female</MenuItem>
          </Select>
          <TextField
            label="Shareholder email"
            type="text"
            value={shareholderEmail}
            onChange={(e) => setShareholderEmail(e.target.value)}
          />

          <TextField
            label="Account holder address country"
            type="text"
            value={addressCountry}
            onChange={(e) => setAddressCountry(e.target.value)}
            placeholder="country as ISO code"
            // maxLength={2}
          />
          <TextField
            label="General venue email address"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Customer service email address"
          />
          <TextField
            label="Web address"
            type="text"
            value={webAddress}
            onChange={(e) => setWebAddress(e.target.value)}
            placeholder="Partner's website"
          />

          <Button type="submit">Preview</Button>
        </form>
      </div>
      <Dialog open={!isHidden}>
        <JSONPretty data={jsonResponse ? jsonResponse : jsonData}></JSONPretty>
        <Button onClick={() => handleSendRequest()} endIcon={<SendIcon />}>
          Send
        </Button>
      </Dialog>
      <div hidden={jsonResponse != "" ? false : true}>
        <JSONPretty data={jsonResponse}></JSONPretty>
      </div>
      <div>
        <Snackbar
          open={isOpen}
          autoHideDuration={6000}
          onClose={() => {
            setIsOpen(false), setIsHidden(true);
          }}
        >
          <Alert
            severity={isSuccess ? "success" : "error"}
            sx={{ width: "100%" }}
          >
            {isSuccess ? "Success " : "Error"}
          </Alert>
        </Snackbar>
      </div>
    </div>
  );
};

export default NewAccountHolder;

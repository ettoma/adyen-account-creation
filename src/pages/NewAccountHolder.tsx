import { useState } from "react";
import { Link } from "react-router-dom";

import {
  HandleFormSubmit,
  HandlePostRequest,
} from "../http_requests/HandleSubmit";

import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";

import "./styles/NewAccountHolder.scss";
import {
  Alert,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  MenuItem,
  Select,
  Snackbar,
  TextField,
} from "@mui/material";
import { Delete } from "@mui/icons-material";

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

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);

  const [isSuccess, setIsSuccess] = useState<Boolean>();

  const [jsonResponse, setJsonResponse] = useState();
  const [jsonData, setJsonData] = useState("");

  const [nextPageOk, setNextPageOk] = useState(false);

  const data: object = {
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

  return (
    <div className="main-container">
      <h2>Create Account Holder</h2>
      <div>
        <form
          onSubmit={(e) => {
            HandleFormSubmit(e, setIsDialogOpen, data, setJsonData);
          }}
        >
          <FormControl className="main-container__form-field" fullWidth>
            <TextField
              label="Account holder code"
              type="text"
              value={accountHolderCode}
              onChange={(e) => setAccountHolderCode(e.target.value)}
              helperText="The widget slug"
              variant="outlined"
            />
          </FormControl>
          <FormControl className="main-container__form-field" fullWidth>
            <TextField
              label="Country of account"
              type="text"
              placeholder="country as ISO code"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              // maxLength={2}
            />
          </FormControl>
          <FormControl className="main-container__form-field" fullWidth>
            <TextField
              label="Doing business as"
              type="text"
              value={doingBusinessAs}
              onChange={(e) => setDoingBusinessAs(e.target.value)}
              placeholder="Normally the name of the company"
            />
          </FormControl>
          <FormControl className="main-container__form-field" fullWidth>
            <TextField
              label="Legal business name"
              type="text"
              value={legalBusinessName}
              onChange={(e) => setLegalBusinessName(e.target.value)}
              placeholder="Legal name of the company"
            />
          </FormControl>
          <FormControl className="main-container__form-field" fullWidth>
            <TextField
              label="Registration number"
              type="text"
              value={registrationNumber}
              onChange={(e) => setRegistrationNumber(e.target.value)}
              placeholder="Company registration number"
            />
          </FormControl>
          <FormControl className="main-container__form-field" fullWidth>
            <Select
              label="Shareholder type"
              onChange={(e) => setShareholderType(e.target.value)}
              value={shareholderType}
            >
              <MenuItem value="Controller">Controller</MenuItem>
              <MenuItem value="Owner">Owner</MenuItem>
            </Select>
          </FormControl>
          <FormControl className="main-container__form-field" fullWidth>
            <TextField
              label="Job title"
              type="text"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              placeholder="COO or similar"
            />
          </FormControl>
          <FormControl className="main-container__form-field" fullWidth>
            <TextField
              label="First name"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </FormControl>
          <FormControl className="main-container__form-field" fullWidth>
            <TextField
              label="Last name"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </FormControl>
          <FormControl className="main-container__form-field" fullWidth>
            <Select onChange={(e) => setGender(e.target.value)} value={gender}>
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
            </Select>
          </FormControl>
          <FormControl className="main-container__form-field" fullWidth>
            <TextField
              label="Shareholder email"
              type="text"
              value={shareholderEmail}
              onChange={(e) => setShareholderEmail(e.target.value)}
            />
          </FormControl>
          <FormControl className="main-container__form-field" fullWidth>
            <TextField
              label="Account holder address country"
              type="text"
              value={addressCountry}
              onChange={(e) => setAddressCountry(e.target.value)}
              placeholder="country as ISO code"
              // maxLength={2}
            />
          </FormControl>
          <FormControl className="main-container__form-field" fullWidth>
            <TextField
              label="General venue email address"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Customer service email address"
            />
          </FormControl>
          <FormControl className="main-container__form-field" fullWidth>
            <TextField
              label="Web address"
              type="text"
              value={webAddress}
              onChange={(e) => setWebAddress(e.target.value)}
              placeholder="Partner's website"
            />
          </FormControl>
          <Button type="submit">Preview</Button>
        </form>
        <Dialog open={isDialogOpen} className="dialog">
          <DialogTitle>{jsonResponse ? "Result" : "To be sent"}</DialogTitle>
          <DialogContent>
            {jsonResponse ? (
              <pre>{JSON.stringify(jsonResponse, null, 2)}</pre>
            ) : (
              <pre>{JSON.stringify(data, null, 2)}</pre>
            )}
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                setIsDialogOpen(false);
                setJsonResponse(undefined);
              }}
              endIcon={<Delete />}
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                HandlePostRequest(
                  jsonData,
                  setJsonResponse,
                  setIsSuccess,
                  setNextPageOk
                );
                setIsSnackbarOpen(true);
              }}
              endIcon={<SendIcon />}
            >
              Send
            </Button>
          </DialogActions>
        </Dialog>

        <Snackbar
          open={isSnackbarOpen}
          autoHideDuration={6000}
          onClose={() => {
            setIsSnackbarOpen(false);
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
      //TODO hide button when no psp reference is available
      <Button disabled={!nextPageOk}>
        <Link to="/create-store">Next step</Link>
      </Button>
    </div>
  );
};

export default NewAccountHolder;

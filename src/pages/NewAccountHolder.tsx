import { useState } from "react";
import JSONPretty from "react-json-pretty";
// import * as dotenv from "dotenv";

// const env =
//   dotenv.config({
//     path: "/Users/jinsettore/Desktop/Python course/React Jest/code/adyen_fe/src/pages/.env",
//   }).parsed?.API_KEY || "";

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

  function handlePreview(e: any) {
    e.preventDefault();

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

    const jsonData = JSON.stringify(data);

    setJsonData(jsonData);
    setIsHidden(false);
  }

  function handleSendRequest() {
    fetch("http://localhost:8080/createAccountHolder", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: jsonData,
    }).then((res) => {
      handleResponseDisplay(res);
    });
  }

  function handleResponseDisplay(response: Response) {
    console.log(response);
  }

  return (
    <div>
      <h3>New Account Holder</h3>
      <form
        onSubmit={(e) => handlePreview(e)}
        style={{ display: "flex", flexDirection: "column", width: 240 }}
      >
        <label>Account holder code</label>
        <input
          type="text"
          value={accountHolderCode}
          onChange={(e) => setAccountHolderCode(e.target.value)}
          placeholder="widget slug"
        />
        <label>Country</label>
        <input
          type="text"
          placeholder="country as ISO code"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          maxLength={2}
        />
        <label>Doing business as</label>
        <input
          type="text"
          value={doingBusinessAs}
          onChange={(e) => setDoingBusinessAs(e.target.value)}
          placeholder="Normally the name of the company"
        />
        <label>Legal business name</label>
        <input
          type="text"
          value={legalBusinessName}
          onChange={(e) => setLegalBusinessName(e.target.value)}
          placeholder="Legal name of the company"
        />
        <label>Registration number</label>
        <input
          type="text"
          value={registrationNumber}
          onChange={(e) => setRegistrationNumber(e.target.value)}
          placeholder="Company registration number"
        />
        <label>Shareholder type</label>
        <select
          onChange={(e) => setShareholderType(e.target.value)}
          value={shareholderType}
        >
          <option value="Controller">Controller</option>
          <option value="Owner">Owner</option>
        </select>
        <label>Job title</label>
        <input
          type="text"
          value={jobTitle}
          onChange={(e) => setJobTitle(e.target.value)}
          placeholder="COO or similar"
        />
        <label>First name</label>
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <label>Last name</label>
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <label>Gender</label>
        <select onChange={(e) => setGender(e.target.value)} value={gender}>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        <label>Shareholder email address</label>
        <input
          type="text"
          value={shareholderEmail}
          onChange={(e) => setShareholderEmail(e.target.value)}
        />

        <label>Shareholder address country</label>
        <input
          type="text"
          value={addressCountry}
          onChange={(e) => setAddressCountry(e.target.value)}
          placeholder="country as ISO code"
          maxLength={2}
        />
        <label>Email address</label>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Customer service email address"
        />
        <label>Web address</label>
        <input
          type="text"
          value={webAddress}
          onChange={(e) => setWebAddress(e.target.value)}
          placeholder="Partner's website"
        />
        <button type="submit">Preview</button>
      </form>
      <div hidden={isHidden}>
        <JSONPretty data={jsonData}></JSONPretty>
        <button onClick={() => handleSendRequest()}>Send</button>
      </div>
    </div>
  );
};

export default NewAccountHolder;

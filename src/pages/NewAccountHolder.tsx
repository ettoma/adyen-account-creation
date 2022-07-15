import { useState } from "react";
import JSONPretty from "react-json-pretty";
// import * as dotenv from "dotenv";

// const env = dotenv.config({ path: "../.env" });
// const apiKey = env.parsed?.API_KEY as string;

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
  const [email, setEmail] = useState("");
  const [webaddress, setWebAddress] = useState("");

  const [jsonData, setJsonData] = useState("");
  const [isHidden, setIsHidden] = useState(true);

  function handlePreview(e: any) {
    e.preventDefault();

    const data = {
      accountHolderCode: accountHolderCode,
      accountHolderDetails: {
        address: {
          country: country,
        },
        businessDetails: {
          doingBusinessAs: doingBusinessAs,
          legalBusinessName: legalBusinessName,
          registrationNumber: registrationNumber,
          shareholders: [
            {
              shareholderType: shareholderType,
              jobTitle: jobTitle,
              name: {
                firstName: firstName,
                gender: gender,
                lastName: lastName,
              },
              address: {
                country: addressCountry,
              },
              email: email,
            },
          ],
        },
        email: email,
        webAddress: webaddress,
      },
      legalEntity: "Business",
      processingTier: 1,
    };

    const jsonData = JSON.stringify(data);

    setJsonData(jsonData);
    setIsHidden(false);
  }

  function handleSendRequest() {
    fetch(
      "http://www.whateverorigin.org/get?url=https://cal-test.adyen.com/cal/services/Account/v6/createAccountHolder",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "x-API-Key":
            "AQEuhmfxL4/MbxdHw0exgG89s9SXSYhIQ7BFVnNfyW24+/F+wIOIQ7gnf8VWD1vJWhDBXVsNvuR83LVYjEgiTGAH-2AdH4tSncBxsC783RTZmdPffgDzWF1zEY1gIeq2OPt8=-u#,?AxwaWJJC&Dw7",
          "Content-Type": "application/json",
        },
        body: jsonData,
      }
    ).then((res) => {
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
          placeholder="Account holder email address"
        />
        <label>Web address</label>
        <input
          type="text"
          value={webaddress}
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

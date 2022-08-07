import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      <main>
        <h1>Adyen Merchant creation</h1>
        <h3>Follow the steps in order</h3>
        <ol>
          <li>
            Create a new account holder{" "}
            <Link to={"/create-account-holder"}>{">"}</Link>
          </li>
          <li>
            Create a new store
            <Link to={"/create-store"}>{">"}</Link>
          </li>
          {/* <li>
            Assign the store to the merchant
            <Link to={"/assign_store"}>{">"}</Link>
          </li> */}
        </ol>
      </main>
    </>
  );
}

export default Home;

import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      <div>
        <h1>Adyen Merchant creation</h1>
        <h3>Follow the steps in order</h3>
        <ol>
          <li>
            Create a new merchant account{" "}
            <Link to={"NewMerchant.tsx"}>{">"}</Link>
          </li>
          <li>Create a new store</li>
          <li>Assign the store to the merchant</li>
        </ol>
      </div>
    </>
  );
}

export default Home;

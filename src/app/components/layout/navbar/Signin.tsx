import { client } from "../../../client";
import { ConnectButton } from "thirdweb/react";

const Signin = () => {
  return (
    <div className=" mr-20">
      <ConnectButton
        client={client}
        appMetadata={{
          name: "Example App",
          url: "https://example.com",
        }}
      />
    </div>
  );
};

export default Signin;

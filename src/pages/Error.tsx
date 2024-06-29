import { Link } from "react-router-dom";
import { Button } from "../components";

const Error = () => {
  return (
    <div className="grid h-full text-center place-content-center">
      <div>
        <h2 className="font-bold text-9xl text-mainColor">404</h2>
        <p className="text-3xl font-bold text-mainColor">
          Sorry, the page you tried cannot be found
        </p>
        <Button className="mt-8">
          <Link to={"/"}>Back to login</Link>
        </Button>
      </div>
    </div>
  );
};

export default Error;

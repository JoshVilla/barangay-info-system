import { LoaderCircle } from "lucide-react";
import React from "react";

const Loader = () => {
  return (
    <div className="w-full text-center  my-10">
      <LoaderCircle className="animate-spin mx-auto" />
      <p>Fetching Data</p>
    </div>
  );
};

export default Loader;

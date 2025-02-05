import React from "react";
import SelectProjectComponent from "../components/SelectProjectComponent";
import AuthGuard from "../guards/AuthGuard";

const SelectProjectPage = () => {
  return (
    <AuthGuard>
      <SelectProjectComponent />
    </AuthGuard>
  );
};

export default SelectProjectPage;

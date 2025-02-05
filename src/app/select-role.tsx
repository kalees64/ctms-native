import React from "react";
import AuthGuard from "../guards/AuthGuard";
import SelectRoleComponent from "../components/SelectRoleComponent";

const SelectRolePage = () => {
  return (
    <AuthGuard>
      <SelectRoleComponent />
    </AuthGuard>
  );
};

export default SelectRolePage;

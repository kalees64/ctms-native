import React from "react";
import AuthGuard from "../guards/AuthGuard";
import DashboardComponent from "../components/AllReportsComponent";
import SelectRoleComponent from "../components/SelectRoleComponent";

const IndexPage = () => {
  return (
    <AuthGuard>
      {/* <DashboardComponent /> */}
      <SelectRoleComponent />
    </AuthGuard>
  );
};

export default IndexPage;

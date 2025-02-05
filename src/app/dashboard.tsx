import React from "react";
import AuthGuard from "../guards/AuthGuard";
import DashboardComponent from "../components/DashboardComponent";

const IndexPage = () => {
  return (
    <AuthGuard>
      <DashboardComponent />
    </AuthGuard>
  );
};

export default IndexPage;

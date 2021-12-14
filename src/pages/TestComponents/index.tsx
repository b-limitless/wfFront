import React, { useEffect } from "react";
import TestComponentGroup from "components/PagesSpecific/TestComponents";
import { history } from "config";

const TestComponents = () => {
  useEffect(() => {
    if (process.env.NODE_ENV !== "development") {
      history.push("/");
    }
  }, []);
  return <TestComponentGroup />;
};

export default TestComponents;

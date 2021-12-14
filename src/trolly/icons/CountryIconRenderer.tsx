import React from "react";

const CountryIcon: React.FC<{ countryCode: string }> = ({ countryCode }) => {
  const ImportedIcon = React.lazy(
    () => import(`./countries/${countryCode.toLowerCase() || "ae"}.tsx`)
  );
  return (
    <React.Suspense fallback={<div>Loading</div>}>
      <ImportedIcon />
    </React.Suspense>
  );
};

export default CountryIcon;

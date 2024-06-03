import React from "react";
import { IconButton } from "@mui/material";
import "flag-icons/css/flag-icons.min.css";

type LanguageSwitcherProps = {
  onLocaleChange: (newLocale: string) => void;
};

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ onLocaleChange }) => {
  const [locale, setLocale] = React.useState("es");

  const handleLocaleChange = (newLocale: string) => {
    setLocale(newLocale);
    onLocaleChange(newLocale);
  };

  return (
    <div>
      {locale === "en" ? (
        <IconButton onClick={() => handleLocaleChange("es")}>
          <span className="fi fi-gb" style={{ width: "1em", height: "1.5em", borderRadius: "50%", display: "inline-block" }}></span>
        </IconButton>
      ) : (
        <IconButton onClick={() => handleLocaleChange("en")}>
          <span className="fi fi-es" style={{ width: "1em", height: "1.5em", borderRadius: "50%", display: "inline-block" }}></span>
        </IconButton>
      )}
    </div>
  );
};

export default LanguageSwitcher;

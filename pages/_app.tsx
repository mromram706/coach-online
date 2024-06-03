import React, { useEffect, useRef, useState } from "react";
import { AppProps } from "next/app";
import { useRouter } from "next/router";
import { IntlProvider } from "react-intl";
import { ThemeProvider, CssBaseline } from "@mui/material";
import Footer from "../src/components/Footer";
import Header from "../src/components/Header";
import ErrorPopup from "../src/components/ErrorPopup";
import PageContent from "../src/components/PageContent";
import CookieConsent from "../src/components/CookieConsent";
import { useStore } from "../src/store/store";
import { initializeAuth } from "../src/lib/auth";
import { GoogleMapsProvider } from "../src/context/GoogleMapsContext";
import "../src/styles/globals.css";
import theme from "../src/theme/theme";
import { loadMessages } from "../src/utils/translations";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const headerRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);
  const headerHeight = useStore((state) => state.headerHeight);
  const setHeaderHeight = useStore((state) => state.setHeaderHeight);
  const [locale, setLocale] = useState("es");

  useEffect(() => {
    initializeAuth();
    if (headerRef.current) setHeaderHeight(headerRef.current.offsetHeight);
  }, [headerHeight, setHeaderHeight]);

  const handleLocaleChange = (newLocale: string) => {
    setLocale(newLocale);
  };

  const messages = loadMessages(locale);

  return (
    <GoogleMapsProvider>
      <ThemeProvider theme={theme}>
        <IntlProvider locale={locale} messages={messages}>
          <CssBaseline />
          <Header ref={headerRef} onLocaleChange={handleLocaleChange} />
          <PageContent headerHeight={headerHeight.toString()} footerHeight="auto">
            <Component {...pageProps} />
            <ErrorPopup />
          </PageContent>
          {router.pathname !== "/" && <Footer footerRef={footerRef} />}
          <CookieConsent />
        </IntlProvider>
      </ThemeProvider>
    </GoogleMapsProvider>
  );
}

export default MyApp;

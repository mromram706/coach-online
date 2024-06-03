import footerHeaderMessagesEs from "../../public/locales/es/footerHeader.json";
import navigationMessagesEs from "../../public/locales/es/navigation.json";
import indexMessagesEs from "../../public/locales/es/index.json";
import conocenosMessagesEs from "../../public/locales/es/conocenos.json";
import contactanosMessagesEs from "../../public/locales/es/contactanos.json";
import profileMessagesEs from "../../public/locales/es/profile.json";
import subscripcionEs from "../../public/locales/es/subscripcion.json";
import loginEs from "../../public/locales/es/login.json";
import cookiesEs from "../../public/locales/es/cookies-policy.json";
import cookiesPolicyEs from "../../public/locales/es/cookies.json";
import privacyEs from "../../public/locales/es/privacy-policy.json";
import termsEs from "../../public/locales/es/terms.json";

import footerHeaderMessagesEn from "../../public/locales/en/footerHeader.json";
import navigationMessagesEn from "../../public/locales/en/navigation.json";
import indexMessagesEn from "../../public/locales/en/index.json";
import conocenosMessagesEn from "../../public/locales/en/conocenos.json";
import contactanosMessagesEn from "../../public/locales/en/contactanos.json";
import profileMessagesEn from "../../public/locales/en/profile.json";
import subscripcionEn from "../../public/locales/en/subscripcion.json";
import loginEn from "../../public/locales/en/login.json";
import cookiesPolicyEn from "../../public/locales/en/cookies-policy.json";
import privacyEn from "../../public/locales/en/privacy-policy.json";
import termsEn from "../../public/locales/en/terms.json";
import cookiesEn from "../../public/locales/en/cookies.json";

const messagesEs = {
  ...indexMessagesEs,
  ...footerHeaderMessagesEs,
  ...navigationMessagesEs,
  ...conocenosMessagesEs,
  ...contactanosMessagesEs,
  ...profileMessagesEs,
  ...subscripcionEs,
  ...loginEs,
  ...cookiesEs,
  ...cookiesPolicyEs,
  ...privacyEs,
  ...termsEs,
};

const messagesEn = {
  ...indexMessagesEn,
  ...footerHeaderMessagesEn,
  ...navigationMessagesEn,
  ...conocenosMessagesEn,
  ...contactanosMessagesEn,
  ...profileMessagesEn,
  ...subscripcionEn,
  ...loginEn,
  ...cookiesEn,
  ...cookiesPolicyEn,
  ...privacyEn,
  ...termsEn,
};

export function loadMessages(locale: string) {
  return locale === "es" ? messagesEs : messagesEn;
}

import React from "react";
import { Menu } from "antd";
import moment from "moment";
import { useTranslation } from "react-i18next";
import i18n from '../../i18n';
export default function ChangeLanguage() {
  const onChangeLanguage = (lang: string) => {
    localStorage.setItem("lang", lang);
    const momentLocale = lang === "la" ? "lo" : "en-gb";
    i18n.changeLanguage(lang)
    moment.locale(momentLocale);
  };
  const { t } = useTranslation("setting");
  return (
    <Menu mode="vertical">
      <Menu.Item key="en_lang" onClick={() => onChangeLanguage("en")}>
        <span role="img" aria-label="english" style={{ marginRight: "8px" }}>
          EN
        </span>
        {t("english")}
      </Menu.Item>
      <Menu.Item key="la_lang" onClick={() => onChangeLanguage("la")}>
        <span role="img" aria-label="lao" style={{ marginRight: "8px" }}>
          LA
        </span>
        {t("lao")}
      </Menu.Item>
    </Menu>
  );
}

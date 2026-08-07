import { useTranslate } from "../context/I18nContext";

function Footer() {
  const { t, locale } = useTranslate();

  return (
    <footer className="footer">
      <div className="footer-inner" key={locale}>
        <div className="footer-bottom">
          <span>© 2021-{new Date().getFullYear()} Nighty3098</span>
          <span>{t("footer.rights")}</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
import styles from "../styles/Footer.module.css";

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <a
        href="https://developer.mozilla.org/ja/docs/Web/HTTP/Status"
        className={styles.link}
        target={"_blank"}
        rel={"noopener noreferrer"}
      >
        参照コンテンツ
      </a>
      <span>は</span>
      <a
        href="https://developer.mozilla.org/ja/docs/Web/HTTP/Status/contributors.txt"
        className={styles.link}
        target={"_blank"}
        rel={"noopener noreferrer"}
      >
        Mozilla Contributors
      </a>
      <span className={styles.span}>によって</span>
      <a
        href="https://creativecommons.org/licenses/by-sa/2.5/"
        className={styles.link}
        target={"_blank"}
        rel={"noopener noreferrer"}
      >
        CC-BY-SA 2.5
      </a>
      <span className={styles.span}>の元でライセンスされています。</span>
    </footer>
  );
};

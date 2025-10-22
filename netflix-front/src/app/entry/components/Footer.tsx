import styles from '../../../../styles/entry.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerLinks}>
        <a href="#">FAQ</a>
        <a href="#">Terms of Use</a>
        <a href="#">Privacy</a>
        <a href="#">Cookie Preferences</a>
        <a href="#">Help Center</a>
      </div>
      <div className={styles.languageSelector}>
        <button>English</button>
      </div>
    </footer>
  );
}

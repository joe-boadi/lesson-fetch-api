import styles from '@/styles/Footer.module.css';

export default function Footer () {
    return (
        <footer className={`${styles.footer}`}>
            <small>
                &copy; 2024 Random Products. All rights reserved.
            </small>
        </footer>
    )
}
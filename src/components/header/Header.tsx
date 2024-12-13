import styles from './Header.module.css';

const Header: React.FC = () => {
    return <header className={styles.header}>
        <h1>Stash</h1>
        <nav className={styles.navigation}>
            <div>Profile</div>
            <div>Sign Out</div>
        </nav>
    </header>
}

export default Header;
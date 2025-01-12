import { useNavigate } from 'react-router-dom';
import Button from '../button/Button';
import styles from './Header.module.css';

const Header: React.FC = () => {
    const navigate = useNavigate();

    const handleSignOut = () => {
        localStorage.removeItem("stash_user_token");
        navigate('/login');
    }

    return <header className={styles.header}>
        <h1>Stash</h1>
        <nav className={styles.navigation}>
            <div></div>
            <Button handleClick={handleSignOut}>Sign Out</Button>
        </nav>
    </header>
}

export default Header;
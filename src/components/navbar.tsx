// import { buttonVariants } from "@/components/ui/button"
import styles from '@/styles/Navbar.module.css';
import Button from '@/styles/Button.module.css';
import { FaShopify } from "react-icons/fa";
import { IoLogInSharp } from 'react-icons/io5';
import { FaCartShopping } from 'react-icons/fa6';

export default function Navbar () {
    return (
        <nav className={`${styles.Navbar}`}>
            <div>
                <ul className={`${styles.Navbar}`}>
                    <li><a href="/"> <FaShopify className={`${styles.HomeIcon}`}/> </a></li>
                    <li><a href="/cart"><FaCartShopping className={`${styles.cartIcon}`}/></a></li>
                </ul>
            </div>
            {/* buttonVariants({ variant: "outline" }) */}
            <button name='Login' className={`${Button.button}`}><IoLogInSharp />Login</button> 
        </nav>
    )
};
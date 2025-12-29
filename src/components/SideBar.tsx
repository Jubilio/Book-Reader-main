"use client"
import '@fortawesome/fontawesome-free/css/all.min.css';
import { motion } from "framer-motion" 
import styles from './SideBar.module.css'
import Link from 'next/link';

export default function SideBar() {

    const MenuList = [
        {
          title: "Home",
          icon: "fa-home",
          href: "/"
        },
        {
          title: "Discover",
          icon: "fa-compass",
          href: "/discover"
        },
        {
          title: "My Library",
          icon: "fa-book",
          href: "/library"
        },
        {
          title: "Authors",
          icon: "fa-pen-nib",
          href: "/authors"
        },
        {
          title: "Settings",
          icon: "fa-cog",
          href: "/settings"
        },
        {
            title: "Support",
            icon: "fa-circle-question",
            href: "/support"
        }
    ]

  return (
    <nav className={styles.sidebar}>
        <div className={styles.logo}>Reader</div>
        <ul className={styles.list}>
        {
            MenuList.map((item, i) => (
                <li key={i} className={styles.listItem}>
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                    >
                        <Link href={item.href} className={styles.link}>
                            <i className={`fa ${item.icon} ${styles.icon}`}></i>
                            <span>{item.title}</span>
                        </Link>
                    </motion.div>
                </li>
            ))
        }
        </ul>
    </nav>
  )
}
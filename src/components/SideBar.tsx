"use client"
import Image from 'next/image';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { motion } from "framer-motion" 
import styles from './SideBar.module.css'
import Link from 'next/link';
import { useSidebar } from '@/context/SidebarContext';

export default function SideBar() {
    const { isOpen, closeSidebar } = useSidebar();

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
        },
        {
          title: "Admin",
          icon: "fa-user-shield",
          href: "/admin"
        }
    ]

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className={styles.overlay} 
          onClick={closeSidebar}
          aria-hidden="true"
        />
      )}
      <nav className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
          <div className={styles.logo}>
            <Link href="/" onClick={closeSidebar}>
              <Image 
                src="/favicon.png" 
                alt="Logo" 
                className={styles.logoImage} 
                width={120} 
                height={120} 
                priority
              />
            </Link>
          </div>
          <ul className={styles.list}>
          {
              MenuList.map((item, i) => (
                  <li key={i} className={styles.listItem}>
                      <motion.div
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1 }}
                      >
                          <Link href={item.href} className={styles.link} onClick={closeSidebar}>
                              <i className={`fa ${item.icon} ${styles.icon}`}></i>
                              <span>{item.title}</span>
                          </Link>
                      </motion.div>
                  </li>
              ))
          }
          </ul>
      </nav>
    </>
  )
}
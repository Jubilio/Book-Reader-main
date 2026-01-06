"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import styles from "./Header.module.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { useUser } from "@/context/UserContext";
import { useSidebar } from "@/context/SidebarContext";
import { useTheme } from "@/context/ThemeContext";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { useSearch } from "@/context/SearchContext";

export default function Header() {
  const { user } = useUser();
  const { toggleSidebar } = useSidebar();
  const { theme, toggleTheme } = useTheme();
  const { searchQuery, setSearchQuery } = useSearch();

  const themeIcon = theme === "dark" ? "fa-moon" : theme === "sepia" ? "fa-palette" : "fa-sun";

  return (
    <header className={styles.header}>
      <motion.div
        className={styles.leftContainer}
        transition={{ type: "spring", damping: 18, mass: 0.75 }}
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <div className={styles.bookTitle}>
          <button 
            className={styles.menuButton} 
            onClick={toggleSidebar}
            aria-label="Toggle menu"
          >
            <i className="fas fa-bars"></i>
          </button>
          <span>App de Livros</span>
        </div>

        <div className={styles.searchContainer}>
          <i className={`fas fa-search ${styles.searchIcon}`}></i>
          <motion.input
            type="text"
            placeholder="Encontre sua próxima história..."
            className={styles.searchInput}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </motion.div>

      <motion.div
        className={styles.rightContainer}
        transition={{ type: "spring", damping: 18, mass: 0.75 }}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <motion.button
          className={styles.themeButton}
          onClick={toggleTheme}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Toggle theme"
          title={`Tema: ${theme}`}
        >
          <i className={`fas ${themeIcon}`}></i>
        </motion.button>
        <Link href="/profile" className={styles.avatarLink}>
          <motion.div whileHover={{ scale: 1.05 }}>
             <Image
                src={user.image}
                alt={user.name}
                className={styles.avatar}
                width={50}
                height={50}
                unoptimized={user.image.startsWith('data:')}
                priority
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "https://ui-avatars.com/api/?name=" + encodeURIComponent(user.name) + "&background=a67c52&color=fff";
                }}
             />
          </motion.div>
        </Link>
      </motion.div>
    </header>
  );
}

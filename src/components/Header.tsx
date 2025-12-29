"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import styles from "./Header.module.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { useUser } from "@/context/UserContext";
import { useSearchParams } from "next/navigation";
import Image from "next/image";

export default function Header() {
  const { user } = useUser();
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";

  return (
    <header className={styles.header}>
      <motion.div
        className={styles.leftContainer}
        transition={{ type: "spring", damping: 18, mass: 0.75 }}
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <h1 className={styles.bookTitle}>Book App</h1>

        <div className={styles.searchContainer}>
          <i className={`fas fa-search ${styles.searchIcon}`}></i>
          <motion.input
            type="text"
            placeholder="Find your next story..."
            className={styles.searchInput}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            defaultValue={initialQuery}
            onChange={(e) => {
               const query = e.target.value;
               const url = new URL(window.location.href);
               if (query) {
                 url.searchParams.set('q', query);
               } else {
                 url.searchParams.delete('q');
               }
               window.history.replaceState({ ...window.history.state, as: url.href, url: url.href }, '', url.href);
               // Also dispatch a custom event to notify other components without full refresh
               window.dispatchEvent(new Event('searchChange'));
            }}
          />
        </div>
      </motion.div>

      <motion.div
        className={styles.rightContainer}
        transition={{ type: "spring", damping: 18, mass: 0.75 }}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <Link href="/profile" className={styles.avatarLink}>
          <motion.div whileHover={{ scale: 1.05 }}>
             <Image
                src={user.image}
                alt={user.name}
                className={styles.avatar}
                width={50}
                height={50}
                unoptimized={user.image.startsWith('data:')}
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

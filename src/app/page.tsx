"use client"
import Header from "@/components/Header";
import styles from "./page.module.css";
import SideBar from "@/components/SideBar";
import { books } from '@/constants/mockData.mjs'
import { motion } from 'framer-motion'
import BookCard from "@/components/BookCard";

export default function Home() {
  return (
    <main className={styles.main}>
      <div>
        <Header />

        <div className={styles.containerStyle}>

          <section className="styles.content">

            <SideBar />

          </section>

          <div className={styles.grouper}>
            <h1 className={styles.title}>ALL BOOKS</h1>
            <ul className={styles.ulGroupStyle}>
              {
                books.map((book, i) =>
                  <motion.li
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ type: 'spring', damping: 50, mass: 0.75 }}
                    initial={{ opacity: 0, x: 200 * (i + 1) }}
                    animate={{ opacity: 1, x: 0 }}
                    key={book.id}>
                    <BookCard
                      title={book.title}
                      coverImage={book.image}
                      description={book.description}
                      onClick={() => { window.location.href = `/book/${book.id}`; }}
                    />
                  </motion.li>
                )
              }
            </ul>
          </div>

        </div>

      </div>
    </main>
  );
}

"use client"
import SideBar from "@/components/SideBar";
import styles from "../page.module.css";
import { motion } from "framer-motion";
import { books } from "@/constants/mockData.mjs";
import BookCard from "@/components/BookCard";
import Link from "next/link";
import '@fortawesome/fontawesome-free/css/all.min.css';

export default function Library() {
    // In a real app, this would filter by user's saved books
    // For now, let's just show all books as "Available in Library"
    
  return (
    <main className={styles.main}>
      <SideBar />
      <div className={styles.layout}>
        <div className={styles.contentWrapper}>
            <div className={styles.container}>
                <section>
                    <h1 className={styles.sectionTitle}>Minha Biblioteca</h1>
                    
                    <motion.div 
                        className={styles.bookGrid}
                        initial="hidden"
                        animate="show"
                        variants={{
                            hidden: { opacity: 0 },
                            show: {
                                opacity: 1,
                                transition: {
                                    staggerChildren: 0.1
                                }
                            }
                        }}
                    >
                    {
                        books.map((book) => (
                            <Link href={`/book/${book.id}`} key={book.id} className={styles.link}>
                                <motion.div variants={{
                                    hidden: { opacity: 0, y: 30 },
                                    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
                                }}>
                                    <BookCard
                                        title={book.title}
                                        coverImage={book.image}
                                        description={book.description}
                                    />
                                </motion.div>
                            </Link>
                        ))
                    }
                    </motion.div>
                </section>
            </div>
        </div>
      </div>
    </main>
  );
}

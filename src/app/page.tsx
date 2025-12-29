"use client"
import Header from "@/components/Header";
import styles from "./page.module.css";
import SideBar from "@/components/SideBar";
import { books } from '@/constants/mockData.mjs'
import { motion } from 'framer-motion'
import BookCard from "@/components/BookCard";
import { useSearchParams } from "next/navigation";
import { useMemo, useState, useEffect, Suspense } from "react";
import Link from "next/link";

function BookGrid() {
  const searchParams = useSearchParams();
  const search = searchParams.get("q") || "";
  
  const [, setUpdate] = useState(0);
  
  useEffect(() => {
    const handleSearch = () => setUpdate(u => u + 1);
    window.addEventListener('searchChange', handleSearch);
    return () => window.removeEventListener('searchChange', handleSearch);
  }, []);

  const filteredBooks = useMemo(() => {
    return books.filter(book => 
        book.title.toLowerCase().includes(search.toLowerCase()) ||
        book.author.toLowerCase().includes(search.toLowerCase()) ||
        book.description.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  return (
    <section>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
            <h1 className={styles.sectionTitle}>Library Collection</h1>
            {search && (
                <span style={{ color: 'var(--text-secondary)', fontStyle: 'italic' }}>
                    Searching for: &quot;{search}&quot;
                </span>
            )}
        </div>
        
        <motion.div 
            className={styles.bookGrid}
            initial="hidden"
            animate="show"
            key={search} 
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
            filteredBooks.length > 0 ? (
                filteredBooks.map((book) => (
                    <Link href={`/book/${book.id}`} key={book.id} style={{textDecoration: 'none'}}>
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
            ) : (
                <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '4rem 0', color: 'var(--text-secondary)' }}>
                    <i className="fas fa-search" style={{ fontSize: '3rem', marginBottom: '1rem', opacity: 0.2 }}></i>
                    <p>No books found matching your search.</p>
                </div>
            )
        }
        </motion.div>
    </section>
  );
}

export default function Home() {
  return (
    <main className={styles.main}>
      <SideBar />
      
      <div className={styles.layout}>
        <div className={styles.contentWrapper}>
            <div className={styles.container}>
                <Suspense fallback={
                    <div style={{ textAlign: 'center', padding: '4rem' }}>
                        <i className="fas fa-spinner fa-spin" style={{ fontSize: '2rem', color: 'var(--text-secondary)' }}></i>
                    </div>
                }>
                    <Header />
                    <BookGrid />
                </Suspense>
            </div>
        </div>
      </div>
    </main>
  );
}

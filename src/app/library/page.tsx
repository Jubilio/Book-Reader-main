"use client"
import SideBar from "@/components/SideBar";
import styles from "../page.module.css";
import { motion } from "framer-motion";
import { books } from "@/constants/mockData.mjs";
import BookCard from "@/components/BookCard";
import Link from "next/link";
import '@fortawesome/fontawesome-free/css/all.min.css';

import { useSearchParams } from "next/navigation";
import { useMemo, useState, useEffect, Suspense } from "react";

import Header from "@/components/Header";

import { useSearch } from "@/context/SearchContext";

function LibraryContent() {
    // In a real app, this would filter by user's saved books
    // For now, let's just show all books as "Available in Library"
    const { searchQuery: search } = useSearch();

    const filteredBooks = useMemo(() => {
        return books.filter(book => 
            book.title.toLowerCase().includes(search.toLowerCase()) ||
            book.author.toLowerCase().includes(search.toLowerCase()) ||
            book.description.toLowerCase().includes(search.toLowerCase())
        );
    }, [search]);

    return (
        <section>
            <div className={styles.gridHeader}>
                <h1 className={styles.sectionTitle}>Minha Biblioteca</h1>
                {search && (
                    <span className={styles.searchInfo}>
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
                    filteredBooks.map((book, index) => (
                        <Link href={`/book/${book.id}`} key={book.id} className={styles.link}>
                            <motion.div variants={{
                                hidden: { opacity: 0, y: 30 },
                                show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
                            }}>
                                <BookCard
                                    title={book.title}
                                    coverImage={book.image}
                                    description={book.description}
                                    priority={index < 6}
                                />
                            </motion.div>
                        </Link>
                    ))
                ) : (
                <div className={styles.emptyState}>
                    <i className={`fas fa-search ${styles.emptyStateIcon}`}></i>
                    <p>No books found matching your search.</p>
                </div>
                )
            }
            </motion.div>
        </section>
    );
}

export default function Library() {
  return (
    <main className={styles.main}>
      <SideBar />
      <div className={styles.layout}>
        <div className={styles.contentWrapper}>
            <div className={styles.container}>
                <Suspense fallback={
                    <div className={styles.loadingWrapper}>
                        <i className={`fas fa-spinner fa-spin ${styles.loadingIcon}`}></i>
                    </div>
                }>
                    <Header />
                    <LibraryContent />
                </Suspense>
            </div>
        </div>
      </div>
    </main>
  );
}

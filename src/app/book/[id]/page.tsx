"use client"

import { books } from "@/constants/mockData.mjs"
import { useParams, useRouter } from "next/navigation"
import { motion } from "framer-motion"
import styles from './book.module.css'
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Editor, useDomValue } from "reactjs-editor"
import { useEffect, useState } from "react"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function BookPage() {
    const { id } = useParams()
    const router = useRouter()
    
    // Safety check for ID
    const bookId = Array.isArray(id) ? id[0] : id;

    const { dom, setDom } = useDomValue();
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const selectedBook = books.find((book) => String(book.id) === bookId);

    const notify = () => toast.success("Your changes have been saved!", {
        position: "bottom-center",
        autoClose: 2000,
        theme: "light"
    });

    const handleSave = () => {
        if (!selectedBook) return;
        
        const updatedDomValue  = {
            key: dom?.key,
            props: dom?.props,
            ref: dom?.ref,
            type: dom?.type,
        }

        localStorage.setItem(`dom${selectedBook.id}`, JSON.stringify(updatedDomValue))
        notify()
    }

    useEffect(() => {
        if (selectedBook && isClient) {
            const savedDom = localStorage.getItem(`dom${selectedBook.id}`)
            if(savedDom) {
                try {
                    setDom(JSON.parse(savedDom))
                } catch (e) {
                    console.error("Failed to parse saved DOM", e)
                }
            }
        }
    }, [isClient, selectedBook, setDom])

    if (!isClient) return null; // Avoid hydration mismatch
    
    if (!selectedBook) {
        return (
            <div className={styles.pageWrapper}>
                <div className={styles.main}>
                    <p>Book not found</p>
                    <button onClick={() => router.back()} className={styles.backButton}>Go Back</button>
                </div>
            </div>
        )
    }

    return (
        <motion.div 
            className={styles.pageWrapper}
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <div className={styles.main}>
                <motion.header 
                    className={styles.topBar}
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    <button onClick={() => router.push('/')} className={styles.backButton}>
                        <i className="fas fa-arrow-left"></i> Back to Library
                    </button>
                    
                    <div className={styles.actions}>
                        <button className={styles.iconButton} title="Share"><i className="fas fa-share-alt"></i></button>
                        <button className={styles.iconButton} title="Settings"><i className="fas fa-cog"></i></button>
                        <button className={styles.saveButton} onClick={handleSave}>Save Changes</button>
                    </div>
                </motion.header>

                <motion.div 
                    className={styles.readerContainer}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                >
                     <Editor
                        key={selectedBook.id}
                        htmlContent={`
                            <div class="reader-content-wrapper">
                                <div style="text-align: center; margin-bottom: 3rem;">
                                    <h1 style="font-family: 'Lora', serif; font-size: 2.5rem; margin-bottom: 0.5rem; color: #2D2A26;">${selectedBook.title}</h1>
                                    <span style="font-size: 1.1rem; color: #635C53; font-style: italic;">By ${selectedBook.author}</span>
                                </div>
                                <div style="font-size: 1.15rem; line-height: 1.8; color: #2D2A26; font-family: 'Lora', serif;">
                                    ${selectedBook.content}
                                </div>
                            </div>
                        `}
                    />
                </motion.div>
            </div>
            <ToastContainer />
        </motion.div>
    )
}
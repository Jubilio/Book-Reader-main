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
import { useSettings } from "@/context/SettingsContext"

export default function BookPage() {
    const { id } = useParams()
    const router = useRouter()
    const { settings } = useSettings();
    
    // Safety check for ID
    const bookId = Array.isArray(id) ? id[0] : id;

    const { dom, setDom } = useDomValue();
    const [isClient, setIsClient] = useState(false);
    const [fetchedContent, setFetchedContent] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Dynamic styles based on settings
    const readerStyles = {
        fontFamily: settings.fontFamily === 'serif' ? '"Lora", serif' : '"Inter", sans-serif',
        fontSize: `${settings.fontSize}px`,
        lineHeight: settings.lineHeight === 'normal' ? '1.4' : settings.lineHeight === 'comfortable' ? '1.8' : '2.2',
        textAlign: settings.textAlign as any,
    };

    const containerMaxWidth = settings.textWidth === 'narrow' ? '650px' : settings.textWidth === 'medium' ? '850px' : '1100px';

    useEffect(() => {
        setIsClient(true);
    }, []);

    const selectedBook = books.find((book) => String(book.id) === bookId);

    // Fetch content from external file
    useEffect(() => {
        if (selectedBook && isClient) {
            setLoading(true);
            setError(null);
            fetch(`/content/${selectedBook.id}.html`)
                .then(res => {
                    if (!res.ok) throw new Error("Content not found");
                    return res.text();
                })
                .then(text => {
                    setFetchedContent(text);
                    setLoading(false);
                })
                .catch(err => {
                    console.error("Fetch error:", err);
                    setError("Não foi possível carregar o conteúdo deste livro.");
                    setLoading(false);
                });
        }
    }, [selectedBook, isClient]);

    const notify = () => toast.success("Suas alterações foram salvas!", {
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
            } else {
                setDom(null)
            }
        }
    }, [isClient, selectedBook, setDom])

    if (!isClient) return null; // Avoid hydration mismatch
    
    if (!selectedBook) {
        return (
            <div className={styles.pageWrapper}>
                <div className={styles.main}>
                    <p>Livro não encontrado</p>
                    <button onClick={() => router.back()} className={styles.backButton}>Voltar</button>
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
                        <i className="fas fa-arrow-left"></i> Voltar para a Biblioteca
                    </button>
                    
                    <div className={styles.actions}>
                        <button className={styles.iconButton} title="Compartilhar"><i className="fas fa-share-alt"></i></button>
                        <button className={styles.iconButton} title="Configurações" onClick={() => router.push('/settings')}><i className="fas fa-cog"></i></button>
                        <button className={styles.saveButton} onClick={handleSave}>Salvar Alterações</button>
                    </div>
                </motion.header>

                <motion.div 
                    className={styles.readerContainer}
                    style={{ maxWidth: containerMaxWidth }}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                >
                    {loading ? (
                        <div className={styles.loader}>
                            <i className={`fas fa-spinner fa-spin ${styles.loaderIcon}`}></i>
                            <p>Carregando conteúdo...</p>
                        </div>
                    ) : error ? (
                        <div className={styles.errorContainer}>
                            <i className={`fas fa-exclamation-circle ${styles.errorIcon}`}></i>
                            <p>{error}</p>
                            <button onClick={() => window.location.reload()} className={`${styles.backButton} ${styles.errorButton}`}>Tentar Novamente</button>
                        </div>
                    ) : (
                        <Editor
                            key={selectedBook.id}
                            htmlContent={`
                                <div class="reader-content-wrapper">
                                    <div style="text-align: center; margin-bottom: 3rem;">
                                        <h1 style="font-family: 'Lora', serif; font-size: 2.5rem; margin-bottom: 0.5rem; color: var(--text-primary); transition: color 0.3s ease;">${selectedBook.title}</h1>
                                        <span style="font-size: 1.1rem; color: var(--text-secondary); font-style: italic; transition: color 0.3s ease;">Por ${selectedBook.author}</span>
                                    </div>
                                    <div style="font-size: ${readerStyles.fontSize}; line-height: ${readerStyles.lineHeight}; color: var(--text-primary); font-family: ${readerStyles.fontFamily}; text-align: ${readerStyles.textAlign}; transition: all 0.3s ease;">
                                        ${fetchedContent}
                                    </div>
                                </div>
                            `}
                        />
                    )}
                </motion.div>
            </div>
            <ToastContainer />
        </motion.div>
    )
}
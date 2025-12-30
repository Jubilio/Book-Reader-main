"use client";
import SideBar from "@/components/SideBar";
import layoutStyles from "../page.module.css"; 
import styles from "./Profile.module.css";
import { motion } from "framer-motion";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { useUser } from "@/context/UserContext";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { AnimatePresence } from "framer-motion";

export default function Profile() {
  const { user } = useUser();

  return (
    <main className={layoutStyles.main}>
      <SideBar />
      <div className={layoutStyles.layout}>
        <div className={layoutStyles.contentWrapper}>
            <div className={layoutStyles.container}>
                <section>
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className={styles.profileHeader}
                    >
                        <div className={styles.banner}></div>
                        
                        <div className={styles.profileContent}>
                            <div className={styles.headerRow}>
                                <div className={styles.avatarContainer}>
                                    <Image 
                                        src={user.image} 
                                        alt={user.name} 
                                        className={styles.avatar}
                                        width={150}
                                        height={150}
                                    />
                                </div>
                                
                                <div className={styles.userInfo}>
                                    <h1 className={styles.userName}>{user.name}</h1>
                                    <p className={styles.userRole}>{user.role}</p>
                                </div>
                            </div>

                            <div className={styles.gridLayout}>
                                <div>
                                    <h2 className={styles.sectionTitle}>Minha Missão</h2>
                                    <p className={styles.textDisplay}>{user.mission}</p>

                                    <h2 className={styles.sectionTitle}>Testemunho</h2>
                                    <p className={styles.textDisplay}>{user.testimony}</p>
                                </div>

                                <div>
                                    <div className={styles.statsCard}>
                                        <h3 className={styles.statsTitle}>Estatísticas Atuais</h3>
                                        <ul className={styles.statsList}>
                                            <li className={styles.statsItem}>
                                                <span className={styles.statsLabel}><i className={`fa fa-book ${styles.statsIcon}`}></i> Livros Escritos</span>
                                                <span className={styles.statsValue}>{user.stats.booksWritten}</span>
                                            </li>
                                            <li className={styles.statsItem}>
                                                <span className={styles.statsLabel}><i className={`fa fa-heart ${styles.statsIcon}`}></i> Almas Alcançadas</span>
                                                <span className={styles.statsValue}>{user.stats.livesImpacted}</span>
                                            </li>
                                            <li className={styles.statsItem}>
                                                <span className={styles.statsLabel}><i className={`fa fa-calendar-check ${styles.statsIcon}`}></i> Perseverança</span>
                                                <span className={styles.statsValue}>{user.stats.daysPraying}</span>
                                            </li>
                                        </ul>
                                    </div>
                                    
                                    <div className={styles.readerView}>
                                        <p className={styles.readerNote}>Obrigado por acompanhar minha jornada espiritual.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </section>
            </div>
        </div>
      </div>
    </main>
  );
}

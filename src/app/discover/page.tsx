"use client"
import SideBar from "@/components/SideBar";
import layoutStyles from "../page.module.css";
import styles from "./Discover.module.css";
import { motion } from "framer-motion";
import '@fortawesome/fontawesome-free/css/all.min.css';
import Image from "next/image";

export default function Discover() {
  return (
    <main className={layoutStyles.main}>
      <SideBar />
      <div className={layoutStyles.layout}>
        <div className={layoutStyles.contentWrapper}>
            <div className={layoutStyles.container}>
                <section>
                    <h1 className={styles.sectionTitle}>Descobrir</h1>
                    
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className={styles.featuredCard}
                    >
                        <div className={styles.cardHeader}>
                            <h2 className={styles.bookTitle}>Retornando às raízes em Deus</h2>
                            <span className={styles.authorName}>por Jubílio Maússe</span>
                        </div>

                        <div className={styles.quoteContainer}>
                            <p className={styles.quoteText}>
                                &quot;Lembra-te, pois, de onde caíste, e arrepende-te, e pratica as primeiras obras; quando não, brevemente a ti virei, e tirarei do seu lugar o teu castiçal, se não te arrependeres.&quot;
                            </p>
                            <span className={styles.scriptureRef}>- Apocalipse 2:5</span>
                        </div>

                        <div className={styles.contentSection}>
                            <p className={styles.contentParagraph}>
                                É interessante que a lembrança traz consigo um entendimento. Quando nos lembramos do passado, podemos espelhá-lo no presente. O filho pródigo, ao lembrar-se de como era na casa do pai e ao comparar com a situação em que se encontrava, teve o entendimento de que precisava voltar.
                            </p>
                            <p className={styles.contentParagraph}>
                                Muitas vezes, em nossa caminhada cristã, nos perdemos em meio às distrações e esquecemos do nosso primeiro amor. Este texto é um convite para pararmos, refletirmos e buscarmos a reconexão profunda com o Pai.
                            </p>
                            
                            <h3 className={styles.suggestionsTitle}>Pontos de Reflexão:</h3>
                            <ul className={styles.suggestionsList}>
                                <li className={styles.suggestionItem}>
                                    <i className={`fas fa-pray ${styles.suggestionIcon}`}></i>
                                    <span>Reserve um tempo diário para oração silenciosa.</span>
                                </li>
                                <li className={styles.suggestionItem}>
                                    <i className={`fas fa-book-open ${styles.suggestionIcon}`}></i>
                                    <span>Releia os evangelhos com um coração aberto.</span>
                                </li>
                                <li className={styles.suggestionItem}>
                                    <i className={`fas fa-heart ${styles.suggestionIcon}`}></i>
                                    <span>Pratique o perdão e a caridade como primeiras obras.</span>
                                </li>
                            </ul>
                        </div>
                    </motion.div>

                    <h2 className={styles.authorTitle}>Sobre o Autor</h2>
                    <motion.div 
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className={styles.authorCard}
                    >
                        <Image 
                            src="/profile.jpg" 
                            alt="Jubílio Maússe" 
                            className={styles.authorImage}
                            width={100}
                            height={100}
                            priority
                        />
                        <div className={styles.authorInfo}>
                            <h3>Jubílio Maússe</h3>
                            <p className={styles.authorRole}>Autor • Servo de Deus</p>
                            <p className={styles.authorBio}>
                                Dedicado a espalhar a mensagem de arrependimento e retorno à essência da fé cristã. Seu ministério foca em restaurar vidas através da palavra revelada.
                            </p>
                        </div>
                    </motion.div>

                </section>
            </div>
        </div>
      </div>
    </main>
  );
}

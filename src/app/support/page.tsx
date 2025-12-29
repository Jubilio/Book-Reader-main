"use client"
import SideBar from "@/components/SideBar";
import layoutStyles from "../page.module.css";
import styles from "./Support.module.css";
import { motion, AnimatePresence } from "framer-motion";
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useState } from "react";

export default function Support() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <main className={layoutStyles.main}>
      <SideBar />
      <div className={layoutStyles.layout}>
        <div className={layoutStyles.contentWrapper}>
            <div className={layoutStyles.container}>
                {/* Hero Section */}
                <header style={{ marginBottom: '4rem' }}>
                    <motion.h1 
                        className={styles.sectionTitle}
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        Você não está sozinho
                    </motion.h1>
                    <motion.p 
                        className={styles.heroSubtitle}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        Neste caminho de volta às raízes, há momentos em que precisamos de uma mão estendida, um ouvido atento ou uma oração sincera.
                    </motion.p>
                    <motion.p 
                        className={styles.verse}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 0.5 }}
                    >
                        &quot;Vinde a mim, todos os que estais cansados e oprimidos, e eu vos aliviarei.&quot; — Mateus 11:28
                    </motion.p>
                </header>

                {/* Service Cards */}
                <section className={styles.servicesGrid}>
                    <motion.div 
                        className={styles.serviceCard}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        <div className={styles.cardIconContainer}>
                            <i className="fas fa-hands-praying"></i>
                        </div>
                        <h3 className={styles.cardTitle}>Pedido de Oração</h3>
                        <p className={styles.cardDescription}>
                            Nossa equipe de intercessores está pronta para clamar por você e por suas necessidades.
                        </p>
                    </motion.div>

                    <motion.div 
                        className={styles.serviceCard}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                    >
                        <div className={styles.cardIconContainer}>
                            <i className="fas fa-heart"></i>
                        </div>
                        <h3 className={styles.cardTitle}>Aconselhamento</h3>
                        <p className={styles.cardDescription}>
                            Precisa de uma orientação espiritual? Estamos aqui para ouvir e caminhar junto com você.
                        </p>
                    </motion.div>

                    <motion.div 
                        className={styles.serviceCard}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                    >
                        <div className={styles.cardIconContainer}>
                            <i className="fas fa-comment-dots"></i>
                        </div>
                        <h3 className={styles.cardTitle}>Testemunhos</h3>
                        <p className={styles.cardDescription}>
                            Compartilhe como o retorno às Escrituras tem transformado sua vida e edifique a outros.
                        </p>
                    </motion.div>
                </section>
                
                <div className={styles.gridLayout}>
                    {/* Contact Info */}
                    <motion.div 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h2 className={styles.subTitle}>Estamos à disposição</h2>
                        <p className={styles.description}>
                            Seja por uma dúvida, um desabafo ou um pedido urgente, escolha o canal que for mais confortável para você.
                        </p>

                        <div className={styles.contactList}>
                            <a href="mailto:contato@jubiliomausse.com" className={styles.contactItem}>
                                <div className={styles.iconContainer}>
                                    <i className="fa-solid fa-envelope"></i>
                                </div>
                                <div className={styles.contactText}>
                                    <h4>Email</h4>
                                    <p>contato@jubiliomausse.com</p>
                                </div>
                            </a>
                            
                            <a href="https://wa.me/258841234567" target="_blank" rel="noopener noreferrer" className={styles.contactItem}>
                                <div className={styles.iconContainer}>
                                    <i className="fa-brands fa-whatsapp"></i>
                                </div>
                                <div className={styles.contactText}>
                                    <h4>WhatsApp</h4>
                                    <p>Conversar agora via Chat</p>
                                </div>
                            </a>
                        </div>

                        <div className={styles.privacyNote}>
                            <i className="fas fa-shield-halved"></i>
                            <p>Sua privacidade e confidencialidade são sagradas para nós.</p>
                        </div>
                    </motion.div>

                    {/* Prayer Form */}
                    <AnimatePresence mode="wait">
                        {!submitted ? (
                            <motion.div 
                                key="form"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                                className={styles.formCard}
                            >
                                <h3 className={styles.formTitle}>Deixe seu pedido</h3>
                                <form className={styles.form} onSubmit={handleSubmit}>
                                    <div>
                                        <label htmlFor="name" className={styles.label}>
                                            Seu Nome <span className={styles.optional}>(Opcional)</span>
                                        </label>
                                        <input 
                                            id="name"
                                            type="text" 
                                            className={styles.input} 
                                            placeholder="Como gostaria de ser chamado?" 
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="reason" className={styles.label}>Sobre o que vamos orar?</label>
                                        <select 
                                            id="reason"
                                            className={styles.select}
                                            aria-label="Motivo da Oração"
                                        >
                                            <option>Crescimento Espiritual</option>
                                            <option>Restauração Familiar</option>
                                            <option>Saúde e Fortalecimento</option>
                                            <option>Gratidão e Testemunho</option>
                                            <option>Outro motivo particular</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label htmlFor="message" className={styles.label}>Sua mensagem</label>
                                        <textarea 
                                            id="message"
                                            rows={5} 
                                            className={styles.textarea} 
                                            placeholder="Sinta-se à vontade para compartilhar apenas o que desejar..."
                                            required
                                        ></textarea>
                                    </div>
                                    <button type="submit" className={styles.submitButton}>Enviar para Intercessão</button>
                                    <p className={styles.formFooter}>
                                        Ao enviar, sua mensagem será recebida com carinho por nossa equipe de oração e respondida assim que possível.
                                    </p>
                                </form>
                            </motion.div>
                        ) : (
                            <motion.div 
                                key="success"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className={styles.formCard}
                            >
                                <div className={styles.successMessage}>
                                    <i className={`fas fa-circle-check ${styles.successIcon}`}></i>
                                    <h3 className={styles.successTitle}>Recebemos seu pedido</h3>
                                    <p className={styles.successText}>
                                        Obrigado por confiar em nós. Sua mensagem já está aos cuidados de nossa equipe de oração. &quot;O Senhor te abençoe e te guarde.&quot;
                                    </p>
                                    <button 
                                        onClick={() => setSubmitted(false)} 
                                        className={styles.backBtn}
                                    >
                                        Enviar outro pedido
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
      </div>
    </main>
  );
}

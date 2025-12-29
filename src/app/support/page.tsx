"use client"
import SideBar from "@/components/SideBar";
import layoutStyles from "../page.module.css";
import styles from "./Support.module.css";
import { motion } from "framer-motion";
import '@fortawesome/fontawesome-free/css/all.min.css';

export default function Support() {
  return (
    <main className={layoutStyles.main}>
      <SideBar />
      <div className={layoutStyles.layout}>
        <div className={layoutStyles.contentWrapper}>
            <div className={layoutStyles.container}>
                <section>
                    <h1 className={styles.sectionTitle}>Comunhão & Suporte</h1>
                    
                    <div className={styles.gridLayout}>
                        {/* Contact Info */}
                        <motion.div 
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <h2 className={styles.subTitle}>Estamos aqui para você</h2>
                            <p className={styles.description}>
                                &quot;Perto está o Senhor de todos os que o invocam&quot;. Se você precisa de oração, aconselhamento ou quer compartilhar seu testemunho de retorno às raízes, entre em contato conosco.
                            </p>

                            <div className={styles.contactList}>
                                <div className={styles.contactItem}>
                                    <div className={styles.iconContainer}>
                                        <i className={`fa fa-envelope ${styles.icon}`}></i>
                                    </div>
                                    <div className={styles.contactText}>
                                        <h4>Email</h4>
                                        <p>contato@jubiliomausse.com</p>
                                    </div>
                                </div>
                                
                                <div className={styles.contactItem}>
                                    <div className={styles.iconContainer}>
                                        <i className={`fa fa-phone ${styles.icon}`}></i>
                                    </div>
                                    <div className={styles.contactText}>
                                        <h4>WhatsApp</h4>
                                        <p>+258 84 123 4567</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Prayer Form */}
                        <motion.div 
                             initial={{ opacity: 0, x: 20 }}
                             animate={{ opacity: 1, x: 0 }}
                             transition={{ duration: 0.5, delay: 0.2 }}
                             className={styles.formCard}
                        >
                            <h3 className={styles.formTitle}>Pedido de Oração</h3>
                            <form className={styles.form}>
                                <div>
                                    <label htmlFor="name" className={styles.label}>Seu Nome</label>
                                    <input 
                                        id="name"
                                        type="text" 
                                        className={styles.input} 
                                        placeholder="Isaque..." 
                                    />
                                </div>
                                <div>
                                    <label htmlFor="reason" className={styles.label}>Motivo</label>
                                    <select 
                                        id="reason"
                                        className={styles.select}
                                        aria-label="Motivo da Oração"
                                    >
                                        <option>Crescimento Espiritual</option>
                                        <option>Restauração Familiar</option>
                                        <option>Saúde</option>
                                        <option>Outros</option>
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="message" className={styles.label}>Mensagem</label>
                                    <textarea 
                                        id="message"
                                        rows={4} 
                                        className={styles.textarea} 
                                        placeholder="Como podemos orar por você?"
                                    ></textarea>
                                </div>
                                <button type="button" className={styles.submitButton}>Enviar Pedido</button>
                            </form>
                        </motion.div>
                    </div>

                </section>
            </div>
        </div>
      </div>
    </main>
  );
}

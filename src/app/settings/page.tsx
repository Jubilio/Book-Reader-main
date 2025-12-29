"use client"
import SideBar from "@/components/SideBar";
import layoutStyles from "../page.module.css";
import styles from "./Settings.module.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

export default function Settings() {
  return (
    <main className={layoutStyles.main}>
      <SideBar />
      <div className={layoutStyles.layout}>
        <div className={layoutStyles.contentWrapper}>
            <div className={layoutStyles.container}>
                <section>
                    <h1 className={styles.sectionTitle}>Configurações</h1>
                     <div className={styles.placeholder}>
                        <i className={`fas fa-cog ${styles.icon}`}></i>
                        <h2 className={styles.message}>Configurações em breve...</h2>
                        <p className={styles.description}>Estamos preparando opções personalizadas para você.</p>
                     </div>
                </section>
            </div>
        </div>
      </div>
    </main>
  );
}

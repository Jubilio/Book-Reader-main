"use client"
import SideBar from "@/components/SideBar";
import layoutStyles from "../page.module.css";
import styles from "./Authors.module.css";
import { motion } from "framer-motion";
import Link from "next/link";
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useUser } from "@/context/UserContext";
import Image from "next/image";

export default function Authors() {
    const { user } = useUser();

    // Use dynamic user data for the featured author
    const featuredAuthor = {
        name: user.name,
        role: "Autor Principal", // Keep this static or add to user context if needed
        bio: user.bio,
        image: user.image
    };

    const biblicalMentors = [
        {name: "Paulo de Tarso", role: "Apóstolo", desc: "Ensinamentos sobre a Graça e a Nova Criatura."},
        {name: "Davi", role: "Rei e Salmista", desc: "Exemplo de adoração e arrependimento sincero."},
        {name: "João", role: "O Discípulo Amado", desc: "Revelações sobre o amor de Deus e o fim dos tempos."}
    ];

  return (
    <main className={layoutStyles.main}>
      <SideBar />
      <div className={layoutStyles.layout}>
        <div className={layoutStyles.contentWrapper}>
            <div className={layoutStyles.container}>
                <section>
                    <h1 className={styles.sectionTitle}>Nossos Autores</h1>
                    
                    {/* Featured Author Card */}
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className={styles.featuredCard}
                    >
                        <Image 
                            src={featuredAuthor.image} 
                            alt={featuredAuthor.name} 
                            className={styles.featuredImage}
                            width={180}
                            height={180}
                            unoptimized={featuredAuthor.image.startsWith('data:')}
                            priority
                        />
                        <div>
                            <span className={styles.roleBadge}>
                                {featuredAuthor.role}
                            </span>
                            <h2 className={styles.authorName}>{featuredAuthor.name}</h2>
                            <p className={styles.authorBio}>
                                {featuredAuthor.bio}
                            </p>
                            <div className={styles.profileLinkWrapper}>
                                <Link href="/profile" className={styles.profileLink}>
                                    Ver Perfil Completo <i className={`fas fa-arrow-right ${styles.arrowIcon}`}></i>
                                </Link>
                            </div>
                        </div>
                    </motion.div>

                    
                    <h2 className={styles.inspirationTitle}>Inspirações Bíblicas</h2>
                    <div className={styles.grid}>
                        {biblicalMentors.map((mentor, i) => (
                             <motion.div 
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className={styles.inspirationCard}
                             >
                                 <h3 className={styles.inspirationName}>{mentor.name}</h3>
                                 <p className={styles.inspirationRole}>{mentor.role}</p>
                                 <p className={styles.inspirationDesc}>{mentor.desc}</p>
                             </motion.div>
                        ))}
                    </div>

                </section>
            </div>
        </div>
      </div>
    </main>
  );
}

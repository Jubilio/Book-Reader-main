"use client";
import SideBar from "@/components/SideBar";
import layoutStyles from "../page.module.css"; 
import styles from "./Profile.module.css";
import { motion } from "framer-motion";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { useUser } from "@/context/UserContext";
import { useState, useRef } from "react";
import Image from "next/image";

export default function Profile() {
  const { user, updateUser } = useUser();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(user);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleStatsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ 
        ...prev, 
        stats: { ...prev.stats, [name]: value } 
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, image: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    updateUser(formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData(user);
    setIsEditing(false);
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

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
                                        src={formData.image} 
                                        alt={formData.name} 
                                        className={styles.avatar}
                                        width={150}
                                        height={150}
                                        unoptimized={formData.image.startsWith('data:')}
                                    />
                                    {isEditing && (
                                        <button 
                                            onClick={triggerFileInput}
                                            className={styles.editButton}
                                            title="Mudar Foto"
                                            aria-label="Upload new profile photo"
                                        >
                                            <i className="fas fa-camera"></i>
                                        </button>
                                    )}
                                    <input 
                                        type="file" 
                                        ref={fileInputRef} 
                                        onChange={handleImageUpload} 
                                        className={styles.fileInput}
                                        accept="image/*"
                                        aria-label="File upload"
                                    />
                                </div>
                                
                                <div className={styles.userInfo}>
                                    {isEditing ? (
                                        <div className={styles.editInputs}>
                                            <input 
                                                type="text" 
                                                name="name" 
                                                value={formData.name} 
                                                onChange={handleInputChange} 
                                                className={styles.inputName}
                                                aria-label="Your Name"
                                                placeholder="Your Name"
                                            />
                                            <input 
                                                type="text" 
                                                name="role" 
                                                value={formData.role} 
                                                onChange={handleInputChange} 
                                                className={styles.inputRole}
                                                aria-label="Your Role"
                                                placeholder="Your Role"
                                            />
                                        </div>
                                    ) : (
                                        <>
                                            <h1 className={styles.userName}>{user.name}</h1>
                                            <p className={styles.userRole}>{user.role}</p>
                                        </>
                                    )}
                                </div>
                            </div>

                            <div className={styles.gridLayout}>
                                <div>
                                    <h2 className={styles.sectionTitle}>Minha Missão</h2>
                                    {isEditing ? (
                                        <textarea 
                                            name="mission" 
                                            value={formData.mission} 
                                            onChange={handleInputChange} 
                                            rows={4}
                                            className={styles.textArea}
                                            aria-label="Mission Statement"
                                        />
                                    ) : (
                                        <p className={styles.textDisplay}>{user.mission}</p>
                                    )}

                                    <h2 className={styles.sectionTitle}>Testemunho</h2>
                                    {isEditing ? (
                                        <textarea 
                                            name="testimony" 
                                            value={formData.testimony} 
                                            onChange={handleInputChange} 
                                            rows={6}
                                            className={styles.textArea}
                                            aria-label="Testimony"
                                        />
                                    ) : (
                                        <p className={styles.textDisplay}>{user.testimony}</p>
                                    )}
                                </div>

                                <div>
                                    <div className={styles.statsCard}>
                                        <h3 className={styles.statsTitle}>Estatísticas</h3>
                                        <ul className={styles.statsList}>
                                            <li className={styles.statsItem}>
                                                <span className={styles.statsLabel}><i className={`fa fa-book ${styles.statsIcon}`}></i> Livros Escritos</span>
                                                {isEditing ? (
                                                    <input 
                                                        type="number" 
                                                        name="booksWritten" 
                                                        value={formData.stats.booksWritten} 
                                                        onChange={handleStatsChange} 
                                                        className={styles.statsInput}
                                                        aria-label="Books Written Count"
                                                    />
                                                ) : (
                                                    <span className={styles.statsValue}>{user.stats.booksWritten}</span>
                                                )}
                                            </li>
                                            <li className={styles.statsItem}>
                                                <span className={styles.statsLabel}><i className={`fa fa-heart ${styles.statsIcon}`}></i> Vidas Impactadas</span>
                                                {isEditing ? (
                                                    <input 
                                                        type="text" 
                                                        name="livesImpacted" 
                                                        value={formData.stats.livesImpacted} 
                                                        onChange={handleStatsChange} 
                                                        className={styles.statsInput}
                                                        aria-label="Lives Impacted Count"
                                                    />
                                                ) : (
                                                    <span className={styles.statsValue}>{user.stats.livesImpacted}</span>
                                                )}
                                            </li>
                                            <li className={styles.statsItem}>
                                                <span className={styles.statsLabel}><i className={`fa fa-calendar-check ${styles.statsIcon}`}></i> Dias em Oração</span>
                                                {isEditing ? (
                                                    <input 
                                                        type="text" 
                                                        name="daysPraying" 
                                                        value={formData.stats.daysPraying} 
                                                        onChange={handleStatsChange} 
                                                        className={styles.statsInput}
                                                        aria-label="Days Praying Count"
                                                    />
                                                ) : (
                                                    <span className={styles.statsValue}>{user.stats.daysPraying}</span>
                                                )}
                                            </li>
                                        </ul>
                                    </div>
                                    
                                    {!isEditing ? (
                                        <button 
                                            onClick={() => setIsEditing(true)}
                                            className={styles.actionButton}
                                        >
                                            Editar Perfil
                                        </button>
                                    ) : (
                                        <div className={styles.buttonGroup}>
                                            <button 
                                                onClick={handleSave}
                                                className={styles.saveButton}
                                            >
                                                Salvar
                                            </button>
                                            <button 
                                                onClick={handleCancel}
                                                className={styles.cancelButton}
                                            >
                                                Cancelar
                                            </button>
                                        </div>
                                    )}
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

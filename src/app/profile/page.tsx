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
  const { user, updateUser, setAdmin } = useUser();
  const [isEditing, setIsEditing] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [formData, setFormData] = useState(user);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sync internal state when user context changes
  useEffect(() => {
    setFormData(user);
  }, [user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleStatsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({ 
        ...prev, 
        stats: { ...prev.stats, [name]: value } 
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev: any) => ({ ...prev, image: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    setError("");
    const result = await updateUser(formData, password);
    if (result.success) {
      setIsEditing(false);
    } else {
      setError(result.error || "Erro ao salvar alterações.");
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "admin123") { // Simplified for demo
        setAdmin(true);
        setShowLogin(false);
        setError("");
    } else {
        setError("Senha administrativa incorreta.");
    }
  };

  const handleLogout = () => {
    setAdmin(false);
    setIsEditing(false);
    setPassword("");
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
                                                aria-label="Seu Nome"
                                                placeholder="Seu Nome"
                                            />
                                            <input 
                                                type="text" 
                                                name="role" 
                                                value={formData.role} 
                                                onChange={handleInputChange} 
                                                className={styles.inputRole}
                                                aria-label="Seu Cargo/Título"
                                                placeholder="Seu Cargo/Título"
                                            />
                                        </div>
                                    ) : (
                                        <>
                                            <h1 className={styles.userName}>{user.name}</h1>
                                            <p className={styles.userRole}>{user.role} {user.isAdmin && <span className={styles.adminBadge}>Admin</span>}</p>
                                        </>
                                    )}
                                </div>
                            </div>

                            {error && <div className={styles.errorBanner}><i className="fas fa-exclamation-circle"></i> {error}</div>}

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
                                            aria-label="Missão"
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
                                            aria-label="Testemunho"
                                        />
                                    ) : (
                                        <p className={styles.textDisplay}>{user.testimony}</p>
                                    )}
                                </div>

                                <div>
                                    <div className={styles.statsCard}>
                                        <h3 className={styles.statsTitle}>Estatísticas Atuais</h3>
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
                                                        aria-label="Contagem de Livros"
                                                    />
                                                ) : (
                                                    <span className={styles.statsValue}>{user.stats.booksWritten}</span>
                                                )}
                                            </li>
                                            <li className={styles.statsItem}>
                                                <span className={styles.statsLabel}><i className={`fa fa-heart ${styles.statsIcon}`}></i> Almas Alcançadas</span>
                                                {isEditing ? (
                                                    <input 
                                                        type="text" 
                                                        name="livesImpacted" 
                                                        value={formData.stats.livesImpacted} 
                                                        onChange={handleStatsChange} 
                                                        className={styles.statsInput}
                                                        aria-label="Impacto"
                                                    />
                                                ) : (
                                                    <span className={styles.statsValue}>{user.stats.livesImpacted}</span>
                                                )}
                                            </li>
                                            <li className={styles.statsItem}>
                                                <span className={styles.statsLabel}><i className={`fa fa-calendar-check ${styles.statsIcon}`}></i> Perseverança</span>
                                                {isEditing ? (
                                                    <input 
                                                        type="text" 
                                                        name="daysPraying" 
                                                        value={formData.stats.daysPraying} 
                                                        onChange={handleStatsChange} 
                                                        className={styles.statsInput}
                                                        aria-label="Dias de Oração"
                                                    />
                                                ) : (
                                                    <span className={styles.statsValue}>{user.stats.daysPraying}</span>
                                                )}
                                            </li>
                                        </ul>
                                    </div>
                                    
                                    <div className={styles.adminControls}>
                                        {user.isAdmin ? (
                                            <>
                                                {!isEditing ? (
                                                    <div className={styles.buttonGroup}>
                                                        <button 
                                                            onClick={() => setIsEditing(true)}
                                                            className={styles.actionButton}
                                                        >
                                                            Editar Perfil
                                                        </button>
                                                        <button 
                                                            onClick={handleLogout}
                                                            className={styles.secondaryButton}
                                                        >
                                                            Sair do Modo Admin
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <div className={styles.buttonGroup}>
                                                        <button 
                                                            onClick={handleSave}
                                                            className={styles.saveButton}
                                                        >
                                                            Salvar no Backend
                                                        </button>
                                                        <button 
                                                            onClick={handleCancel}
                                                            className={styles.cancelButton}
                                                        >
                                                            Cancelar
                                                        </button>
                                                    </div>
                                                )}
                                            </>
                                        ) : (
                                            <div className={styles.readerView}>
                                                <p className={styles.readerNote}>Área exclusiva para administradores.</p>
                                                <button 
                                                    onClick={() => setShowLogin(true)}
                                                    className={styles.loginTrigger}
                                                >
                                                    Entrar como Administrador
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </section>
            </div>
        </div>
      </div>

      {/* Admin Login Modal */}
      <AnimatePresence>
        {showLogin && (
            <div className={styles.modalOverlay}>
                <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className={styles.loginModal}
                >
                    <h3>Acesso Restrito</h3>
                    <p>Insira a senha de administrador para autorizar mudanças no perfil.</p>
                    <form onSubmit={handleLogin}>
                        <input 
                            type="password" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Sua senha..."
                            className={styles.passwordInput}
                            autoFocus
                        />
                        <div className={styles.modalButtons}>
                            <button type="submit" className={styles.loginBtn}>Entrar</button>
                            <button type="button" onClick={() => setShowLogin(false)} className={styles.closeBtn}>Fechar</button>
                        </div>
                    </form>
                </motion.div>
            </div>
        )}
      </AnimatePresence>
    </main>
  );
}

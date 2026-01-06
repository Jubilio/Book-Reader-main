"use client";
import SideBar from "@/components/SideBar";
import layoutStyles from "../page.module.css";
import styles from "./Admin.module.css";
import { motion } from "framer-motion";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { useSession, signIn, signOut } from "next-auth/react";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";

export default function AdminPage() {
    const { data: session, status } = useSession();
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [formData, setFormData] = useState<any>(null);
    const [isSaving, setIsSaving] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Fetch profile data when authenticated
    useEffect(() => {
        if (status === "authenticated") {
            fetch('/api/profile')
                .then(res => res.json())
                .then(data => {
                    setFormData({
                        ...data,
                        stats: {
                            booksWritten: data.booksWritten,
                            livesImpacted: data.livesImpacted,
                            daysPraying: data.daysPraying
                        }
                    });
                })
                .catch(err => console.error("Error fetching profile:", err));
        }
    }, [status]);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        const result = await signIn("credentials", {
            redirect: false,
            email,
            password,
        });

        if (result?.error) {
            setError("Email ou senha incorretos.");
        }
    };

    const handleLogout = () => {
        signOut();
    };

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
        setIsSaving(true);
        setError("");
        try {
            const res = await fetch('/api/profile', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ profile: formData })
            });
            
            if (res.ok) {
                alert("Perfil atualizado com sucesso!");
            } else {
                const data = await res.json();
                setError(data.error || "Erro ao salvar alterações.");
            }
        } catch (e) {
            setError("Erro ao conectar com o servidor.");
        }
        setIsSaving(false);
    };

    if (status === "loading") {
        return <div className={styles.loading}>Carregando...</div>;
    }

    if (status === "unauthenticated") {
        return (
            <main className={layoutStyles.main}>
                <SideBar />
                <div className={layoutStyles.layout}>
                    <div className={layoutStyles.contentWrapper}>
                        <div className={styles.loginContainer}>
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                            >
                                <div className={styles.loginIcon}>
                                    <i className="fas fa-user-shield"></i>
                                </div>
                                <h1 className={styles.loginTitle}>Painel Admin</h1>
                                <p className={styles.loginDesc}>Identifique-se para gerenciar o conteúdo e perfil.</p>
                                
                                {error && (
                                    <div className={styles.errorBox}>
                                        <i className="fas fa-exclamation-triangle"></i>
                                        {error}
                                    </div>
                                )}
                                
                                <form onSubmit={handleLogin}>
                                    <div className={styles.inputGroup}>
                                        <label className={styles.label}>Email</label>
                                        <input 
                                            type="email" 
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className={styles.input}
                                            placeholder="admin@bookreader.com"
                                            autoFocus
                                            required
                                        />
                                    </div>
                                    <div className={styles.inputGroup}>
                                        <label className={styles.label}>Senha</label>
                                        <input 
                                            type="password" 
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className={styles.input}
                                            placeholder="Digite sua senha..."
                                            required
                                        />
                                    </div>
                                    <button type="submit" className={styles.loginButton}>
                                        Entrar no Painel
                                    </button>
                                </form>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </main>
        );
    }

    if (!formData) return <div className={styles.loading}>Carregando dados do perfil...</div>;

    return (
        <main className={layoutStyles.main}>
            <SideBar />
            <div className={layoutStyles.layout}>
                <div className={layoutStyles.contentWrapper}>
                    <div className={styles.container}>
                        <div className={styles.adminHeader}>
                            <h1 className={styles.title}>Gerenciar Perfil</h1>
                            <button onClick={handleLogout} className={styles.logoutBtn}>
                                <i className="fas fa-sign-out-alt"></i> Sair
                            </button>
                        </div>

                        {error && (
                            <div className={`${styles.errorBox} ${styles.errorMargin}`}>
                                <i className="fas fa-exclamation-triangle"></i>
                                {error}
                            </div>
                        )}

                        <div className={styles.dashboard}>
                            <section className={styles.card}>
                                <h2 className={styles.cardTitle}><i className="fas fa-user-circle"></i> Informações Básicas</h2>
                                <div className={styles.formGrid}>
                                    <div className={styles.avatarSection}>
                                        <Image 
                                            src={formData.image} 
                                            alt="Preview" 
                                            width={150} 
                                            height={150} 
                                            className={styles.avatar}
                                            unoptimized={formData.image.startsWith('data:')}
                                        />
                                        <button onClick={() => fileInputRef.current?.click()} className={styles.uploadBtn}>
                                            Trocar Foto
                                        </button>
                                        <input 
                                            type="file" 
                                            ref={fileInputRef} 
                                            onChange={handleImageUpload} 
                                            className={styles.fileInput} 
                                            accept="image/*" 
                                            aria-label="Upload de nova foto de perfil"
                                        />
                                    </div>
                                    <div className={styles.inputs}>
                                        <div className={styles.field}>
                                            <label htmlFor="name" className={styles.label}>Nome Completo</label>
                                            <input 
                                                id="name"
                                                type="text" 
                                                name="name" 
                                                value={formData.name} 
                                                onChange={handleInputChange} 
                                                className={styles.input} 
                                            />
                                        </div>
                                        <div className={styles.field}>
                                            <label htmlFor="role" className={styles.label}>Cargo / Título</label>
                                            <input 
                                                id="role"
                                                type="text" 
                                                name="role" 
                                                value={formData.role} 
                                                onChange={handleInputChange} 
                                                className={styles.input} 
                                            />
                                        </div>
                                    </div>
                                </div>
                            </section>

                            <section className={styles.card}>
                                <h2 className={styles.cardTitle}><i className="fas fa-scroll"></i> Conteúdo Bio</h2>
                                <div className={styles.inputs}>
                                    <div className={styles.field}>
                                        <label htmlFor="mission" className={styles.label}>Minha Missão</label>
                                        <textarea 
                                            id="mission"
                                            name="mission" 
                                            value={formData.mission} 
                                            onChange={handleInputChange} 
                                            className={styles.textarea}
                                        />
                                    </div>
                                    <div className={styles.field}>
                                        <label htmlFor="testimony" className={styles.label}>Testemunho</label>
                                        <textarea 
                                            id="testimony"
                                            name="testimony" 
                                            value={formData.testimony} 
                                            onChange={handleInputChange} 
                                            className={`${styles.textarea} ${styles.testimonyArea}`}
                                            placeholder="Descreve aqui sua jornada espiritual..."
                                            aria-label="Seu Testemunho"
                                        />
                                    </div>
                                </div>
                            </section>

                            <section className={styles.card}>
                                <h2 className={styles.cardTitle}><i className="fas fa-chart-line"></i> Estatísticas</h2>
                                <div className={styles.statsGrid}>
                                    <div className={styles.field}>
                                        <label htmlFor="booksWritten" className={styles.label}>Livros Escritos</label>
                                        <input 
                                            id="booksWritten"
                                            type="number" 
                                            name="booksWritten" 
                                            value={formData.stats.booksWritten} 
                                            onChange={handleStatsChange} 
                                            className={styles.input} 
                                        />
                                    </div>
                                    <div className={styles.field}>
                                        <label htmlFor="livesImpacted" className={styles.label}>Vidas Alcançadas</label>
                                        <input 
                                            id="livesImpacted"
                                            type="text" 
                                            name="livesImpacted" 
                                            value={formData.stats.livesImpacted} 
                                            onChange={handleStatsChange} 
                                            className={styles.input} 
                                        />
                                    </div>
                                    <div className={styles.field}>
                                        <label htmlFor="daysPraying" className={styles.label}>Dias de Perseverança</label>
                                        <input 
                                            id="daysPraying"
                                            type="text" 
                                            name="daysPraying" 
                                            value={formData.stats.daysPraying} 
                                            onChange={handleStatsChange} 
                                            className={styles.input} 
                                        />
                                    </div>
                                </div>
                            </section>
                        </div>

                        <div className={styles.actionRow}>
                            <p className={styles.saveStatus}>
                                {isSaving ? "Salvando mudanças..." : "Você tem alterações não salvas."}
                            </p>
                            <button 
                                onClick={handleSave} 
                                className={styles.saveBtn}
                                disabled={isSaving}
                            >
                                <i className={`fas ${isSaving ? 'fa-spinner fa-spin' : 'fa-save'}`}></i>
                                Salvar Alterações
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

"use client"
import SideBar from "@/components/SideBar";
import layoutStyles from "../page.module.css";
import styles from "./Settings.module.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { useSettings } from "@/context/SettingsContext";
import { motion } from "framer-motion";

export default function Settings() {
  const { settings, updateSettings, resetSettings } = useSettings();

  return (
    <main className={layoutStyles.main}>
      <SideBar />
      <div className={layoutStyles.layout}>
        <div className={layoutStyles.contentWrapper}>
            <div className={layoutStyles.container}>
                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <h1 className={styles.sectionTitle}>Experiência de Leitura</h1>
                    
                    <div className={styles.settingsGrid}>
                        {/* Card: Aparência */}
                        <div className={styles.card}>
                            <h2 className={styles.cardTitle}>
                                <i className="fas fa-palette"></i> Aparência
                            </h2>
                            
                            <div className={styles.settingGroup}>
                                <span className={styles.label}>Tema</span>
                                <div className={styles.themeOptions}>
                                    <button 
                                        className={`${styles.themeBtn} ${settings.theme === 'light' ? styles.active : ''}`}
                                        onClick={() => updateSettings({ theme: 'light' })}
                                    >
                                        <div className={`${styles.themeCircle} ${styles.lightCircle}`}></div>
                                        <span className={styles.themeLabel}>Claro</span>
                                    </button>
                                    <button 
                                        className={`${styles.themeBtn} ${settings.theme === 'dark' ? styles.active : ''}`}
                                        onClick={() => updateSettings({ theme: 'dark' })}
                                    >
                                        <div className={`${styles.themeCircle} ${styles.darkCircle}`}></div>
                                        <span className={styles.themeLabel}>Escuro</span>
                                    </button>
                                    <button 
                                        className={`${styles.themeBtn} ${settings.theme === 'sepia' ? styles.active : ''}`}
                                        onClick={() => updateSettings({ theme: 'sepia' })}
                                    >
                                        <div className={`${styles.themeCircle} ${styles.sepiaCircle}`}></div>
                                        <span className={styles.themeLabel}>Sépia</span>
                                    </button>
                                </div>
                            </div>

                            <div className={styles.settingGroup}>
                                <span className={styles.label}>Tipografia</span>
                                <div className={styles.choiceGrid}>
                                    <button 
                                        className={`${styles.choiceBtn} ${settings.fontFamily === 'serif' ? styles.active : ''}`}
                                        onClick={() => updateSettings({ fontFamily: 'serif' })}
                                    >
                                        Serifada (Lora)
                                    </button>
                                    <button 
                                        className={`${styles.choiceBtn} ${settings.fontFamily === 'sans' ? styles.active : ''}`}
                                        onClick={() => updateSettings({ fontFamily: 'sans' })}
                                    >
                                        Sem Serifa (Inter)
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Card: Tipografia Detalhada */}
                        <div className={styles.card}>
                            <h2 className={styles.cardTitle}>
                                <i className="fas fa-font"></i> Tamanho & Espaçamento
                            </h2>

                            <div className={styles.settingGroup}>
                                <span className={styles.label}>Tamanho da Fonte</span>
                                <div className={styles.sliderWrapper}>
                                    <input 
                                        type="range" 
                                        min="14" 
                                        max="32" 
                                        value={settings.fontSize}
                                        onChange={(e) => updateSettings({ fontSize: parseInt(e.target.value) })}
                                        className={styles.slider}
                                        title="Ajustar tamanho da fonte"
                                    />
                                    <span className={styles.valueDisplay}>{settings.fontSize}px</span>
                                </div>
                            </div>

                            <div className={styles.settingGroup}>
                                <span className={styles.label}>Altura da Linha</span>
                                <div className={styles.choiceGrid}>
                                    <button 
                                        className={`${styles.choiceBtn} ${settings.lineHeight === 'normal' ? styles.active : ''}`}
                                        onClick={() => updateSettings({ lineHeight: 'normal' })}
                                    >
                                        Padrão
                                    </button>
                                    <button 
                                        className={`${styles.choiceBtn} ${settings.lineHeight === 'comfortable' ? styles.active : ''}`}
                                        onClick={() => updateSettings({ lineHeight: 'comfortable' })}
                                    >
                                        Confortável
                                    </button>
                                    <button 
                                        className={`${styles.choiceBtn} ${settings.lineHeight === 'wide' ? styles.active : ''}`}
                                        onClick={() => updateSettings({ lineHeight: 'wide' })}
                                    >
                                        Ampla
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Card: Layout */}
                        <div className={styles.card}>
                            <h2 className={styles.cardTitle}>
                                <i className="fas fa-columns"></i> Layout
                            </h2>

                            <div className={styles.settingGroup}>
                                <span className={styles.label}>Largura do Texto</span>
                                <div className={styles.choiceGrid}>
                                    <button 
                                        className={`${styles.choiceBtn} ${settings.textWidth === 'narrow' ? styles.active : ''}`}
                                        onClick={() => updateSettings({ textWidth: 'narrow' })}
                                    >
                                        Estreita
                                    </button>
                                    <button 
                                        className={`${styles.choiceBtn} ${settings.textWidth === 'medium' ? styles.active : ''}`}
                                        onClick={() => updateSettings({ textWidth: 'medium' })}
                                    >
                                        Média
                                    </button>
                                    <button 
                                        className={`${styles.choiceBtn} ${settings.textWidth === 'wide' ? styles.active : ''}`}
                                        onClick={() => updateSettings({ textWidth: 'wide' })}
                                    >
                                        Larga
                                    </button>
                                </div>
                            </div>

                            <div className={styles.settingGroup}>
                                <span className={styles.label}>Alinhamento</span>
                                <div className={styles.choiceGrid}>
                                    <button 
                                        className={`${styles.choiceBtn} ${settings.textAlign === 'left' ? styles.active : ''}`}
                                        onClick={() => updateSettings({ textAlign: 'left' })}
                                    >
                                        <i className="fas fa-align-left"></i> Esquerda
                                    </button>
                                    <button 
                                        className={`${styles.choiceBtn} ${settings.textAlign === 'justify' ? styles.active : ''}`}
                                        onClick={() => updateSettings({ textAlign: 'justify' })}
                                    >
                                        <i className="fas fa-align-justify"></i> Justificado
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Card: Preview */}
                        <div className={styles.card}>
                            <h2 className={styles.cardTitle}>
                                <i className="fas fa-eye"></i> Visualização
                            </h2>
                            <div 
                                className={styles.previewContainer}
                                style={{
                                    '--preview-font': settings.fontFamily === 'serif' ? '"Lora", serif' : '"Inter", sans-serif',
                                    '--preview-size': `${settings.fontSize}px`,
                                    '--preview-line-height': settings.lineHeight === 'normal' ? '1.4' : settings.lineHeight === 'comfortable' ? '1.8' : '2.2',
                                    '--preview-align': settings.textAlign,
                                } as React.CSSProperties}
                            >
                                <p>Este é um exemplo de como o texto será exibido durante a sua leitura. Ajuste os controles acima para encontrar a configuração ideal para você.</p>
                            </div>
                        </div>
                    </div>

                    <div className={styles.footer}>
                        <button className={styles.resetBtn} onClick={resetSettings}>
                            <i className="fas fa-undo"></i> Restaurar Padrões
                        </button>
                    </div>
                </motion.section>
            </div>
        </div>
      </div>
    </main>
  );
}

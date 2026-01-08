"use client"

import { signIn } from "next-auth/react"
import { useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import styles from "./Signin.module.css"
import { motion } from "framer-motion"
import "@fortawesome/fontawesome-free/css/all.min.css"

export default function SignInPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const callbackUrl = searchParams.get("callbackUrl") || "/"
  const error = searchParams.get("error")

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [localError, setLocalError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setLocalError("")

    try {
      const res = await signIn("credentials", {
        email,
        password,
        callbackUrl,
        redirect: false,
      })

      if (res?.error) {
        setLocalError(res.error === "CredentialsSignin" ? "Email ou senha incorretos" : res.error)
      } else {
        router.push(callbackUrl)
      }
    } catch (err) {
      setLocalError("Ocorreu um erro inesperado")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={styles.container}>
      <motion.div 
        className={styles.card}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className={styles.logo}>
          <i className="fas fa-book-open"></i>
        </div>
        <h1 className={styles.title}>Bem-vindo de volta</h1>
        <p className={styles.subtitle}>Entre para continuar sua leitura</p>

        {(error || localError) && (
          <div className={styles.error}>
            {localError || "Falha na autenticação. Verifique suas credenciais."}
          </div>
        )}

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.field}>
            <label htmlFor="email" className={styles.label}>Email</label>
            <input
              id="email"
              type="email"
              className={styles.input}
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="password" className={styles.label}>Senha</label>
            <input
              id="password"
              type="password"
              className={styles.input}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button 
            type="submit" 
            className={styles.button}
            disabled={isLoading}
          >
            {isLoading ? "Entrando..." : "Entrar"}
          </button>
        </form>

        <div className={styles.footer}>
          Não tem uma conta? <a href="#" className={styles.link}>Fale com o administrador</a>
        </div>
      </motion.div>
    </div>
  )
}

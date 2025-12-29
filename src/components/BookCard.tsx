import React from 'react'
import styles from './BookCard.module.css'

interface BookCardProps {
    title: string;
    description: string;
    coverImage: string;
    onClick?: () => void;
}

export default function BookCard({ title, description, coverImage, onClick }: BookCardProps) {
    return (
        <div className={styles.card} onClick={onClick}>
            <div className={styles.imageContainer}>
                <img src={coverImage} alt={title} className={styles.image} />
            </div>

            <div className={styles.content}>
                <h3 className={styles.title}>{title}</h3>
                <p className={styles.description}>{description}</p>
            </div>

        </div>
    )
}
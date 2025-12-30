import Image from 'next/image'
import styles from './BookCard.module.css'

interface BookCardProps {
    title: string;
    description: string;
    coverImage: string;
    onClick?: () => void;
    priority?: boolean;
}

export default function BookCard({ title, description, coverImage, onClick, priority }: BookCardProps) {
    return (
        <div className={styles.card} onClick={onClick}>
            <div className={styles.imageContainer}>
                <Image 
                    src={coverImage} 
                    alt={title} 
                    className={styles.image} 
                    fill 
                    unoptimized
                    priority={priority}
                />
            </div>

            <div className={styles.content}>
                <h3 className={styles.title}>{title}</h3>
                <p className={styles.description}>{description}</p>
            </div>

        </div>
    )
}
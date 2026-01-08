"use client"

import styles from './Skeleton.module.css'

export function Skeleton({ className }: { className?: string }) {
    return (
        <div className={`${styles.skeleton} ${className}`} />
    )
}

export function BookCardSkeleton() {
    return (
        <div className={styles.cardSkeleton}>
            <Skeleton className={`${styles.h280} ${styles.roundedLg}`} />
            <div className={styles.content}>
                <Skeleton className={`${styles.h24} ${styles.w80} ${styles.margin} ${styles.roundedSm}`} />
                <Skeleton className={`${styles.h16} ${styles.w100} ${styles.margin} ${styles.roundedSm}`} />
                <Skeleton className={`${styles.h16} ${styles.w60} ${styles.roundedSm}`} />
            </div>
        </div>
    )
}

import Image from "next/image";

// ... inside the component
        <Link href="/profile" className={styles.avatarLink}>
          <motion.div whileHover={{ scale: 1.05 }}>
            <Image
                src={user.image}
                alt={user.name}
                className={styles.avatar}
                width={50}
                height={50}
                unoptimized={user.image.startsWith('data:')}
            />
          </motion.div>
        </Link>
    </header>
  );
}

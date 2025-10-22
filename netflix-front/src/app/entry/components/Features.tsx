import styles from '../../../../styles/entry.module.css'
import Image from 'next/image';
export default function Features() {
  const features = [
    { title: "Enjoy on your TV", desc: "Watch on Smart TVs, Playstation, Xbox, Chromecast, Apple TV, Blu-ray players, and more.", icon: "/television.svg" },
    { title: "Download your shows", desc: "Save your favorites easily and always have something to watch.", icon: "/download.png" },
    { title: "Watch everywhere", desc: "Stream unlimited movies and TV shows on your phone, tablet, laptop, and TV.", icon: "/watch.png" },
    { title: "Create profiles for kids", desc: "Send kids on adventures with their favorite characters in a space made just for them.", icon: "/profiles.png" },
  ];

  return (
    <div className={styles.featuresHeading}>
      More Reasons To Join
      <div className={styles.features}>
        {features.map((f, i) => (
          <div key={i} className={styles.featureCard}>
            <h3 className={styles.featuresTitle}>{f.title}</h3>
            <p>{f.desc}</p>
            <Image src={f.icon} alt="" width='71' height='72' className={styles.featuresIcon}></Image>
          </div>
        ))}
      </div>
    </div>
  );
}

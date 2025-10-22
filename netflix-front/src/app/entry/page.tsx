"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import styles from "../../../styles/entry.module.css";
import TrendingNow from "./components/TrendingNow";
import Features from "./components/Features";
import FAQ from "./components/FAQ";
import Footer from "./components/Footer";


export default function EntryPage() {
  const router = useRouter();
  return (
    <div className={styles.container}>
      <Image src="/background-image.jpeg" alt="" priority layout="fill" className={styles.overlay}></Image>
      <div className={styles.overlay}></div>

      <div className={styles.header}>
        <Image src="/netflix-logo.png" alt="" width={100} height={50} priority></Image>
        <button onClick={() => router.push("/login")} className={styles.button}> Sign In </button>

      </div>
      <div className={styles.enterance}>
        <h1 className={styles.heading}>Unlimited movies, TV shows, and more</h1>
        <h1 className={styles.membership}>Starts at $6.99. Cancel anytime.</h1>
        <h1 className={styles.lastInfo}>Ready to watch? Enter your email to create or restart your membership.</h1>
        <input
          name= "email"
          placeholder="Enter email"
          className={styles.input}
        ></input>
        <button className={styles.startButton}>Get Started   {">"}</button>
      </div>
      <div className={styles.components}>
        <div className={styles.movies}>
        <TrendingNow></TrendingNow>
        </div>
        <Features></Features>
        <FAQ></FAQ>
        <Footer></Footer>
      </div>
    </div>
  );
}

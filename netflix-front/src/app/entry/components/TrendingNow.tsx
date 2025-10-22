"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import styles from "../../../../styles/entry.module.css";
import { getTrendingMovies, getTrendingTVShows } from "../../../../lib/api";

type MovieOrTV = {
  id: number;
  title?: string;
  name?: string;
  poster_path: string;
};

export default function TrendingNow() {
  const [activeTab, setActiveTab] = useState<"movie" | "tv">("movie");
  const [items, setItems] = useState<MovieOrTV[]>([]);
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchData = async () => {
      const data =
        activeTab === "movie" ? await getTrendingMovies() : await getTrendingTVShows();
      setItems(data);
    };
    fetchData();
  }, [activeTab]);

  const scroll = (direction: "left" | "right") => {
    const container = carouselRef.current;
    if (!container) return;
    container.scrollBy({ left: direction === "left" ? -300 : 300, behavior: "smooth" });
  };

  return (
    <div className={styles.trendingSection}>
      <div style={{  alignItems: "center" }}>
        <h2 className={styles.trendingTitle}>Trending Now</h2>
        <select
          value={activeTab}
          onChange={(e) => setActiveTab(e.target.value as "movie" | "tv")}
          className={styles.choosebutton}
        >
          <option value="movie">Movies</option>
          <option value="tv">TV Shows</option>
        </select>
      </div>

      <div style={{ position: "relative" }}>
        <button
          onClick={() => scroll("left")}
          className={styles.carouselButton}
        >
          ◀
        </button>
        <div className={styles.carousel} ref={carouselRef}>
          {items.slice(0, 6).map((item) => (
            <div key={item.id} className={styles.carouselItem}>
              <Image
                src={`https://image.tmdb.org/t/p/w300${item.poster_path}`}
                alt={item.title || item.name || ""}
                width={150}
                height={225}
                className={styles.poster}
              />
            </div>
          ))}
        </div>
        <button
          onClick={() => scroll("right")}
          className={styles.carouselButton}
        >
          ▶
        </button>
      </div>
    </div>
  );
}

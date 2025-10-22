// src/app/[type]/[id]/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

const BASE_URL = "http://localhost:5001/api/v1";

type Trailer = {
  key: string;
  site: string;
  type: string;
  official: boolean;
};

type Detail = {
  title?: string;
  name?: string;
  overview: string;
  genres: { id: number; name: string }[];
  backdrop_path: string;
};

type SimilarItem = {
  id: number;
  title?: string;
  name?: string;
  poster_path: string;
};

export default function MediaDetailPage() {
  const { type, id } = useParams();
  const [detail, setDetail] = useState<Detail | null>(null);
  const [trailer, setTrailer] = useState<Trailer | null>(null);
  const [similar, setSimilar] = useState<SimilarItem[]>([]);

  useEffect(() => {
    async function fetchData() {
      const detailRes = await fetch(`${BASE_URL}/${type}/${id}/details`);
      const trailerRes = await fetch(`${BASE_URL}/${type}/${id}/trailers`);
      const similarRes = await fetch(`${BASE_URL}/${type}/${id}/similar`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          Accept: "application/json",
        },
      });

      const detailData = await detailRes.json();
      const trailerData = await trailerRes.json();
      const similarData = await similarRes.json();

      setDetail(detailData.content);

      const officialTrailer = trailerData.trailers.find(
        (vid: Trailer) =>
          vid.type === "Trailer" &&
          vid.site === "YouTube" &&
          vid.official
      );

      setTrailer(officialTrailer || trailerData.trailers[0]);
      setSimilar(similarData.similar || []);
    }

    fetchData();
  }, [type, id]);

  if (!detail) return <p>Loading...</p>;

  return (
    <div style={{ backgroundColor: "#111", color: "#fff", minHeight: "100vh" }}>
      {trailer && (
        <div style={{ width: "100%", aspectRatio: "16/9" }}>
          <iframe
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${trailer.key}`}
            title="Trailer"
            frameBorder="0"
            allowFullScreen
          />
        </div>
      )}

      <div style={{ padding: "20px" }}>
        <h1 style={{ fontSize: "2rem", marginBottom: "10px" }}>
          {detail.title || detail.name}
        </h1>

        <div style={{ marginBottom: "10px" }}>
          {detail.genres.map((g) => (
            <span
              key={g.id}
              style={{
                background: "#333",
                padding: "5px 10px",
                marginRight: "10px",
                borderRadius: "5px",
                fontSize: "0.8rem",
              }}
            >
              {g.name}
            </span>
          ))}
        </div>

        <p style={{ fontSize: "1rem", lineHeight: "1.5" }}>{detail.overview}</p>

        <h2 style={{ marginTop: "40px", fontSize: "1.5rem" }}>
          Similar {type === "movie" ? "Movies" : "TV Shows"}
        </h2>
        <div style={{ display: "flex", overflowX: "auto", gap: "10px", marginTop: "10px" }}>
          {similar.map((item) => (
            <a
              key={item.id}
              href={`/${type}/${item.id}`}
              style={{ display: "block", minWidth: "150px" }}
            >
              <img
                src={`https://image.tmdb.org/t/p/w300${item.poster_path}`}
                alt={item.title || item.name}
                style={{ borderRadius: "10px", width: "100%" }}
              />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

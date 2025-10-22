"use client";
import { useState } from "react";
import { login } from "../../../lib/api";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";
import Image from "next/image";
import styles from "../../../styles/login.module.css";

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const { setToken } = useAuth();
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    try {
      const data = await login(form);
      setToken(data.token);
      router.push("/home");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
    }
  };

  return (
    <div className={styles.container}>
      <Image
        src="/Background-image.jpeg"
        alt="Background"
        layout="fill"
        objectFit="cover"
        priority
      />

      <div className={styles.overlay}></div>

      <div className={styles.cardWrapper}>
        <div className={styles.card}>
          <h1 className={styles.heading}>Sign In</h1>
          {error && <p className="text-red-500 text-center">{error}</p>}

          <input
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className={styles.input}
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className={styles.input}
          />

          <button onClick={handleLogin} className={styles.button}>
            Sign In
          </button>

          <div className={styles.bottomText}>
            New to Netflix?{" "}
            <button
              onClick={() => router.push("/signup")}
              className={styles.linkButton}
            >
              Sign up now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
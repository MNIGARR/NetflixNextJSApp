"use client";
import { useState } from "react";
import { signup } from "../../../lib/api";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";
import Image from "next/image";
import styles from "../../../styles/signup.module.css";

export default function SignupPage() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const { setToken } = useAuth();
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      if (!form.email || !form.password || !form.username) {
        setError("Please fill in all fields");
        return;
      }

      const data = await signup(form);
      setToken(data.token);
      router.push("/login");
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
          <h1 className="text-3xl font-bold text-white text-left pt-8">Sign Up</h1>
          {error && <p className="text-red-500">{error}</p>}
          <input
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
            className={styles.input}
          />
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
          <button onClick={handleSubmit} className={styles.button}>
            Sign Up
          </button>
          <div className={styles.signInText}>
            Already Have an Account?{" "}
            <button onClick={() => router.push("/login")} className={styles.linkButton}>
              Sign in
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

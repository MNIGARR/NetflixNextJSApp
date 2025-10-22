"use client";
import { useState } from "react";
import styles from "../../../../styles/entry.module.css";
const questions = [
  "What is Netflix?",
  "How much does Netflix cost?",
  "Where can I watch?",
  "How do I cancel?",
  "What can I watch on Netflix?",
  "Is Netflix good for kids?",
  "Why am I seeing this language?"
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className={styles.faq}>
      <h2>Frequently Asked Questions</h2>
      {questions.map((q, i) => (
        <div key={i} className={styles.faqItem}>
          <button onClick={() => setOpen(open === i ? null : i)}>
            {q} <span>{open === i ? "-" : "+"}</span>
          </button>
          {open === i && <p>This is a placeholder answer for: {q}</p>}
        </div>
      ))}
    </div>
  );
}

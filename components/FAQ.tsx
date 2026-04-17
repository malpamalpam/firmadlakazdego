"use client";

import { useState } from "react";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQProps {
  items: FAQItem[];
}

export default function FAQ({ items }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div>
      {items.map((item, index) => (
        <div key={index} className="faq-item">
          <button
            className="faq-button"
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
          >
            <span className="pr-4">{item.question}</span>
            <span className="faq-toggle">
              {openIndex === index ? "\u2212" : "+"}
            </span>
          </button>
          <div
            className="faq-content"
            style={{
              maxHeight: openIndex === index ? "800px" : "0px",
              opacity: openIndex === index ? 1 : 0,
            }}
          >
            <div className="pt-3 pb-1 text-[var(--body-color)] leading-relaxed" dangerouslySetInnerHTML={{ __html: item.answer }} />
          </div>
        </div>
      ))}
    </div>
  );
}

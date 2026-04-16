"use client";

import { motion } from "framer-motion";
import Image, { type StaticImageData } from "next/image";
import brendaPhoto from "@/assets/photos/brenda-large.jpeg";
import mattPhoto from "@/assets/photos/matt-large.jpeg";
import { sectionReveal } from "@/lib/animation";

type TeamMember = {
  name: string;
  alt: string;
  bio: string;
  photo: StaticImageData;
  linkedin: string;
};

const team: TeamMember[] = [
  {
    name: "Brenda Manrique",
    alt: "Portrait of Brenda Manrique",
    bio: "Senior software engineer at Moody's Analytics, with time at JPMorgan before that. NYU alum who turns messy problems into clear, user-centered products and ships them end to end. Based in New York.",
    photo: brendaPhoto,
    linkedin: "https://www.linkedin.com/in/brenda-manrique/",
  },
  {
    name: "Matt Wood",
    alt: "Portrait of Matt Wood",
    bio: "Co-founder of QuantM, building the future of finance. Full-stack engineer and systems architect working at the intersection of AI, design, and product that holds up in production. Based in Austin.",
    photo: mattPhoto,
    linkedin: "https://www.linkedin.com/in/mattwoodco",
  },
];

function LinkedInIcon() {
  return (
    <svg
      role="img"
      aria-label="LinkedIn"
      viewBox="0 0 24 24"
      width="18"
      height="18"
      fill="currentColor"
      className="shrink-0"
    >
      <title>LinkedIn</title>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.852 3.37-1.852 3.602 0 4.267 2.37 4.267 5.455v6.288zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.063 2.063 0 112.063 2.065zm1.777 13.019H3.555V9h3.559v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

export function TeamBios() {
  return (
    <motion.section
      aria-label="Team"
      className="w-full py-24 px-8 max-w-7xl mx-auto"
      variants={sectionReveal}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12">
        {team.map((member) => (
          <div
            key={member.name}
            className="flex flex-col sm:flex-row items-start gap-6"
          >
            <div className="relative w-32 sm:w-40 aspect-square shrink-0 overflow-hidden">
              <Image
                src={member.photo}
                alt={member.alt}
                fill
                sizes="160px"
                priority={false}
                className="object-cover"
              />
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-3">
                <h3
                  className="font-display"
                  style={{
                    fontSize: "var(--font-lg)",
                    color: "var(--color-ink)",
                  }}
                >
                  {member.name}
                </h3>
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${member.name} on LinkedIn`}
                  className="inline-flex items-center justify-center text-[var(--color-mid)] hover:text-[var(--color-ink)]"
                  style={{ transition: "var(--transition-base)" }}
                >
                  <LinkedInIcon />
                </a>
              </div>
              <p
                className="mt-2"
                style={{
                  fontSize: "var(--font-base)",
                  color: "var(--color-ink)",
                }}
              >
                {member.bio}
              </p>
            </div>
          </div>
        ))}
      </div>
    </motion.section>
  );
}

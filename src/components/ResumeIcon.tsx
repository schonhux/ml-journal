"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileAlt } from "@fortawesome/free-solid-svg-icons";

export default function ResumeIcon() {
  return (
    <div className="fixed bottom-4 left-4 z-50 flex items-center gap-2">
      {/* Text + arrow */}
      <span className="text-sm text-white/80 hidden sm:inline-flex items-center">
        View my Career Highlights →
      </span>

      {/* Resume button */}
      <a
        href="/images/SchonHux%20-%20Resume.pdf"
        target="_blank"
        rel="noopener noreferrer"
        className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white hover:bg-white hover:text-black transition"
        title="View Resume"
      >
        <FontAwesomeIcon icon={faFileAlt} />
      </a>
    </div>
  );
}


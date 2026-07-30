"use client";
import { FaGithub, FaLinkedin, FaInstagram, FaFacebook } from "react-icons/fa";

export default function SocialLinks() {
  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col space-y-4">
      {/* GitHub */}
      <a
        href="https://github.com/schonhux"
        target="_blank"
        rel="noopener noreferrer"
        className="text-white/80 hover:text-white transition"
      >
        <FaGithub size={28} />
      </a>

      {/* LinkedIn */}
      <a
        href="https://www.linkedin.com/in/schon-huxley/"
        target="_blank"
        rel="noopener noreferrer"
        className="text-white/80 hover:text-white transition"
      >
        <FaLinkedin size={28} />
      </a>

      {/* Instagram */}
      <a
        href="https://www.instagram.com/schonhux/"
        target="_blank"
        rel="noopener noreferrer"
        className="text-white/80 hover:text-white transition"
      >
        <FaInstagram size={28} />
      </a>

      {/* Facebook */}
      <a
        href="https://www.facebook.com/schon.huxley/"
        target="_blank"
        rel="noopener noreferrer"
        className="text-white/80 hover:text-white transition"
      >
        <FaFacebook size={28} />
      </a>
    </div>
  );
}

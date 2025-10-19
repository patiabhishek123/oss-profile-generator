"use client";
import { useState } from "react";
import axios from "axios";
import confetti from "canvas-confetti";

export default function Home() {
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [loading, setLoading] = useState(false);
  const [avatar, setAvatar] = useState("");

  const generateBio = async () => {
    setLoading(true);
    setBio("");
    setAvatar("");
    try {
      const { data: githubData } = await axios.post("/api/github", { username });
      const { data: aiData } = await axios.post("/api/ai", { githubData });
      setBio(aiData.bio);
      setAvatar(githubData.avatar);

      // 🎊 Trigger confetti
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#f59e0b", "#f97316", "#84cc16", "#22d3ee"],
      });
    } catch {
      setBio("⚠️ Error fetching data. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-950 p-6 text-gray-100">
      {/* Header */}
      <h1 className="text-4xl font-extrabold mb-6 text-amber-400 text-center drop-shadow-lg">
        🧑‍💻 Open Source Profile Generator
      </h1>

      {/* Input Section */}
      <div className="flex flex-col items-center gap-4 w-full max-w-sm bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 shadow-xl">
        <input
          type="text"
          placeholder="Enter GitHub username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-3 rounded-xl text-gray-900 text-center focus:outline-none focus:ring-2 focus:ring-amber-400 transition-all duration-200 placeholder-gray-500"
        />
        <button
          onClick={generateBio}
          disabled={loading || !username}
          className={`w-full px-4 py-3 rounded-xl text-lg font-semibold transition-all duration-300 focus:ring-2 focus:ring-offset-2 focus:ring-amber-400
            ${
              loading || !username
                ? "bg-gray-600 text-gray-300 cursor-not-allowed"
                : "bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-yellow-500 text-white shadow-lg shadow-amber-500/20"
            }`}
        >
          {loading ? "⏳ Generating..." : "⚡ Generate Bio"}
        </button>
      </div>

      {/* Avatar */}
      {avatar && (
        <img
          src={avatar}
          alt="avatar"
          className="mt-6 rounded-full w-28 h-28 shadow-2xl border-4 border-amber-400 animate-fadeIn"
        />
      )}

      {/* Bio Card */}
      {bio && (
        <div className="mt-8 bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-2xl shadow-inner max-w-md w-full text-center animate-fadeIn">
          <h2 className="text-2xl font-bold text-amber-300 mb-3">✨ Your Open Source Bio</h2>
          <p className="text-gray-200 leading-relaxed whitespace-pre-line">{bio}</p>
          <button
            onClick={() => navigator.clipboard.writeText(bio)}
            className="mt-4 px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-all duration-200 shadow-md"
          >
            📋 Copy Bio
          </button>
        </div>
      )}

      {/* Footer */}
      <footer className="mt-10 text-sm text-gray-400">Built with ❤️ for Open Source Developers</footer>

      {/* Animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out;
        }
      `}</style>
    </main>
  );
}

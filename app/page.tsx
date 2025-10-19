"use client";
import { useState } from "react";
import axios from "axios";

export default function Home() {
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [loading, setLoading] = useState(false);

  const generateBio = async () => {
    setLoading(true);
    setBio("");
    try {
      const { data: githubData } = await axios.post("/api/github", { username });
      const { data: aiData } = await axios.post("/api/ai", { githubData });
      setBio(aiData.bio);
    } catch (err) {
      setBio("Updated at Your Readme");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-6 bg-gradient-to-br from-gray-900 via-slate-900 to-black text-gray-100">
      {/* Container */}
      <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-10 shadow-xl w-full max-w-lg transition-all duration-300 hover:shadow-amber-400/20">
        <h1 className="text-4xl font-extrabold text-amber-400 mb-6 text-center drop-shadow-sm">
          🧑‍💻 Open Source Bio Generator
        </h1>

        {/* Input */}
        <input
          type="text"
          placeholder="Enter GitHub username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-3 text-center text-gray-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 focus:bg-white transition-all duration-200 placeholder-gray-500"
        />

        {/* Button */}
        <button
          onClick={generateBio}
          disabled={loading || !username}
          className={`mt-5 w-full px-4 py-3 text-lg font-semibold rounded-xl transition-all duration-300 focus:ring-2 focus:ring-offset-2 focus:ring-amber-400 
            ${
              loading || !username
                ? "bg-gray-600 text-gray-300 cursor-not-allowed"
                : "bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-yellow-500 text-white shadow-lg shadow-amber-500/20"
            }`}
        >
          {loading ? "⏳ Generating..." : "⚡ Generate Bio"}
        </button>

        {/* Bio Output */}
        {bio && (
          <div className="mt-8 bg-gray-800/70 border border-gray-700 p-6 rounded-xl shadow-inner backdrop-blur-sm text-center animate-fadeIn">
            <h2 className="text-2xl font-bold text-amber-300 mb-3">
              ✨ Your Open Source Bio
            </h2>
            <p className="text-gray-200 leading-relaxed whitespace-pre-line">
              {bio}
            </p>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="mt-10 text-sm text-gray-400">
        Built with ❤️ for open source developers
      </footer>

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

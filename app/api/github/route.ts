import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: Request) {
  const { username } = await req.json();

  try {
    const headers = { Authorization: `token ${process.env.GITHUB_TOKEN}` };
    const user = await axios.get(`https://api.github.com/users/${username}`, { headers });
    const repos = await axios.get(`https://api.github.com/users/${username}/repos?per_page=5`, { headers });

    const repoSummary = repos.data.map((r: any) => ({
      name: r.name,
      stars: r.stargazers_count,
      lang: r.language,
      desc: r.description,
    }));

    return NextResponse.json({
      name: user.data.name,
      followers: user.data.followers,
      repoSummary,
    });
  } catch (err) {
    return NextResponse.json({ error: "User not found or rate limit exceeded" }, { status: 400 });
  }
}

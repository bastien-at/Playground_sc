import { NextResponse } from "next/server";

const GITHUB_API_BASE = "https://api.github.com";
const REPO_OWNER = "bastien-at";
const REPO_NAME = "SC_playbook";

interface GitHubContent {
  name: string;
  path: string;
  sha: string;
  size: number;
  url: string;
  html_url: string;
  git_url: string;
  download_url: string | null;
  type: "file" | "dir";
  content?: string;
  encoding?: string;
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const path = searchParams.get("path") || "";
    const file = searchParams.get("file");

    if (file) {
      const fileResponse = await fetch(
        `${GITHUB_API_BASE}/repos/${REPO_OWNER}/${REPO_NAME}/contents/${file}`,
        {
          headers: {
            Accept: "application/vnd.github.v3+json",
            "User-Agent": "Windsurf-Playbook-App",
          },
          next: { revalidate: 3600 },
        }
      );

      if (!fileResponse.ok) {
        return NextResponse.json(
          { error: "Impossible de récupérer le fichier" },
          { status: fileResponse.status }
        );
      }

      const fileData = (await fileResponse.json()) as GitHubContent;

      if (fileData.content && fileData.encoding === "base64") {
        const content = Buffer.from(fileData.content, "base64").toString("utf-8");
        return NextResponse.json({
          name: fileData.name,
          path: fileData.path,
          content,
        });
      }

      return NextResponse.json(
        { error: "Format de fichier non supporté" },
        { status: 400 }
      );
    }

    const response = await fetch(
      `${GITHUB_API_BASE}/repos/${REPO_OWNER}/${REPO_NAME}/contents/${path}`,
      {
        headers: {
          Accept: "application/vnd.github.v3+json",
          "User-Agent": "Windsurf-Playbook-App",
        },
        next: { revalidate: 3600 },
      }
    );

    if (!response.ok) {
      return NextResponse.json(
        { error: "Impossible de récupérer les fichiers" },
        { status: response.status }
      );
    }

    const data = (await response.json()) as GitHubContent[];

    const markdownFiles = data
      .filter((item) => item.type === "file" && item.name.endsWith(".md"))
      .map((item) => ({
        name: item.name,
        path: item.path,
        size: item.size,
        url: item.html_url,
      }));

    return NextResponse.json({ files: markdownFiles });
  } catch (error) {
    console.error("Erreur lors de la récupération des fichiers:", error);
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    );
  }
}

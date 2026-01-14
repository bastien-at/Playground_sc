import { promises as fs } from "fs";
import path from "path";
import { NextResponse } from "next/server";

const DATA_DIR = "prompts-data";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const file = searchParams.get("file");

    const dataDirPath = path.join(process.cwd(), DATA_DIR);

    if (file) {
      const filePath = path.join(dataDirPath, file);
      if (!filePath.startsWith(dataDirPath)) {
        return NextResponse.json({ error: "Accès refusé" }, { status: 403 });
      }
      const content = await fs.readFile(filePath, "utf-8");
      return NextResponse.json({ content });
    }

    try {
      const files = await fs.readdir(dataDirPath);
      const markdownFiles = files
        .filter((f) => f.endsWith(".md"))
        .map((f) => ({
          name: f,
          path: f,
          source: "local"
        }));
      return NextResponse.json({ files: markdownFiles });
    } catch (e) {
      return NextResponse.json({ files: [] });
    }
  } catch (error) {
    console.error("Erreur API prompts:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

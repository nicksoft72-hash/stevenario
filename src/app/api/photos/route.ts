import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  try {
    const photosDir = path.join(process.cwd(), "public", "steve-photos");
    
    if (!fs.existsSync(photosDir)) {
      return NextResponse.json({
        photos: ["/steve-photos/steve-1.jpg", "/steve-photos/steve-2.jpg"],
      });
    }

    const files = fs.readdirSync(photosDir);
    const validExtensions = new Set([".jpg", ".jpeg", ".png", ".webp", ".gif", ".svg", ".avif"]);

    const photoFiles = files
      .filter((file) => validExtensions.has(path.extname(file).toLowerCase()))
      .map((file) => `/steve-photos/${file}`);

    if (photoFiles.length === 0) {
      return NextResponse.json({
        photos: ["/steve-photos/steve-1.jpg", "/steve-photos/steve-2.jpg"],
      });
    }

    return NextResponse.json({
      photos: photoFiles,
    });
  } catch (error) {
    console.error("Errore lettura cartella foto:", error);
    return NextResponse.json({
      photos: ["/steve-photos/steve-1.jpg", "/steve-photos/steve-2.jpg"],
    });
  }
}

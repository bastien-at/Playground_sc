import { NextRequest, NextResponse } from "next/server";

// Récupérer le mot de passe depuis les variables d'environnement
const CORRECT_PASSWORD = process.env.APP_PASSWORD;

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json();

    if (!password) {
      return NextResponse.json(
        { error: "Mot de passe requis" },
        { status: 400 }
      );
    }

    if (password === CORRECT_PASSWORD) {
      // Créer une réponse avec un cookie HTTP-only sécurisé
      const response = NextResponse.json(
        { success: true, message: "Authentification réussie" },
        { status: 200 }
      );
      
      // Définir un cookie HTTP-only pour plus de sécurité
      response.cookies.set("isAuthenticated", "true", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 86400, // 24 heures
        path: "/"
      });

      return response;
    } else {
      return NextResponse.json(
        { error: "Mot de passe incorrect" },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error("Erreur d'authentification:", error);
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    );
  }
}

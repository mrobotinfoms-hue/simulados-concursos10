export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import { analyzePDF } from "@/lib/openai";

// pdf-parse precisa usar require no ambiente Node da Vercel
const pdfParse = require("pdf-parse");

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;
    const url = formData.get("url") as string;

    let pdfContent = "";

    if (file) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      try {
        const data = await pdfParse(buffer);
        pdfContent = data.text;
      } catch (error) {
        console.error("Erro ao extrair texto do PDF:", error);
        return NextResponse.json(
          { error: "Erro ao processar o arquivo PDF." },
          { status: 400 }
        );
      }
    } else if (url) {
      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("Falha ao baixar o PDF da URL");

        const arrayBuffer = await response.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        const data = await pdfParse(buffer);
        pdfContent = data.text;
      } catch (error) {
        console.error("Erro ao baixar/processar PDF:", error);
        return NextResponse.json(
          { error: "Erro ao baixar ou processar PDF da URL." },
          { status: 400 }
        );
      }
    } else {
      return NextResponse.json(
        { error: "Nenhum arquivo ou URL fornecido" },
        { status: 400 }
      );
    }

    if (!pdfContent.trim()) {
      return NextResponse.json(
        { error: "Não foi possível extrair texto do PDF." },
        { status: 400 }
      );
    }

    const analysisJson = await analyzePDF(pdfContent);
    const parsedAnalysis = JSON.parse(analysisJson);

    return NextResponse.json({
      success: true,
      analysis: parsedAnalysis,
      contentLength: pdfContent.length,
    });

  } catch (error) {
    console.error("Erro ao analisar edital:", error);

    return NextResponse.json(
      {
        error: "Erro ao analisar o edital.",
        details: error instanceof Error ? error.message : "Erro desconhecido",
      },
      { status: 500 }
    );
  }
}

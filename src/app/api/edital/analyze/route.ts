import { NextRequest, NextResponse } from 'next/server';
import { analyzePDF } from '@/lib/openai';
import pdfParse from 'pdf-parse';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const url = formData.get('url') as string;

    let pdfContent = '';

    if (file) {
      // Processar arquivo PDF
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      
      try {
        const data = await pdfParse(buffer);
        pdfContent = data.text;
      } catch (error) {
        console.error('Erro ao extrair texto do PDF:', error);
        return NextResponse.json(
          { error: 'Erro ao processar o arquivo PDF. Verifique se o arquivo está correto.' },
          { status: 400 }
        );
      }
    } else if (url) {
      // Processar PDF de URL
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Falha ao baixar o PDF da URL');
        }
        const arrayBuffer = await response.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const data = await pdfParse(buffer);
        pdfContent = data.text;
      } catch (error) {
        console.error('Erro ao baixar/processar PDF da URL:', error);
        return NextResponse.json(
          { error: 'Erro ao baixar ou processar o PDF da URL fornecida.' },
          { status: 400 }
        );
      }
    } else {
      return NextResponse.json(
        { error: 'Nenhum arquivo ou URL fornecido' },
        { status: 400 }
      );
    }

    if (!pdfContent || pdfContent.trim().length === 0) {
      return NextResponse.json(
        { error: 'Não foi possível extrair texto do PDF. O arquivo pode estar vazio ou protegido.' },
        { status: 400 }
      );
    }

    // Analisar com OpenAI GPT-4o
    console.log('Iniciando análise com OpenAI...');
    const analysisJson = await analyzePDF(pdfContent);
    
    console.log('Análise recebida da OpenAI');
    const parsedAnalysis = JSON.parse(analysisJson);

    return NextResponse.json({
      success: true,
      analysis: parsedAnalysis,
      contentLength: pdfContent.length,
    });

  } catch (error) {
    console.error('Erro ao analisar edital:', error);
    
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
    
    return NextResponse.json(
      { 
        error: 'Erro ao analisar o edital. Tente novamente.',
        details: errorMessage
      },
      { status: 500 }
    );
  }
}

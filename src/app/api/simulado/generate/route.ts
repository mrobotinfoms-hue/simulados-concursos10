export const runtime = "nodejs";

import { NextRequest, NextResponse } from 'next/server';
import { generateQuestions } from '@/lib/openai';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { editalContent, numQuestions = 10 } = body;

    if (!editalContent) {
      return NextResponse.json(
        { error: 'Conteúdo do edital não fornecido' },
        { status: 400 }
      );
    }

    console.log('Gerando questões com OpenAI GPT-4o...');

    const questionsJson = await generateQuestions(editalContent, numQuestions);
    const parsedQuestions = JSON.parse(questionsJson);

    if (!parsedQuestions.questions || !Array.isArray(parsedQuestions.questions)) {
      throw new Error('Formato de resposta inválido');
    }

    console.log(`${parsedQuestions.questions.length} questões geradas com sucesso`);

    return NextResponse.json({
      success: true,
      questions: parsedQuestions.questions,
    });

  } catch (error) {
    console.error('Erro ao gerar simulado:', error);

    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';

    return NextResponse.json(
      { 
        error: 'Erro ao gerar o simulado. Tente novamente.',
        details: errorMessage
      },
      { status: 500 }
    );
  }
}

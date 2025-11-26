import OpenAI from 'openai';

if (!process.env.OPENAI_API_KEY) {
  throw new Error('OPENAI_API_KEY não está configurada');
}

export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function analyzePDF(content: string) {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content: `Você é um especialista em análise de editais de concursos públicos. 
          Analise o conteúdo fornecido e extraia as seguintes informações:
          - Título do concurso
          - Órgão responsável
          - Número de vagas
          - Cargos disponíveis
          - Requisitos principais
          - Disciplinas cobradas
          - Data das provas (se disponível)
          - Salário (se disponível)
          
          IMPORTANTE: Retorne APENAS um objeto JSON válido, sem texto adicional, com a seguinte estrutura:
          {
            "titulo": "string",
            "orgao": "string",
            "vagas": "string",
            "cargos": ["string"],
            "requisitos": ["string"],
            "disciplinas": ["string"],
            "dataProvas": "string ou null",
            "salario": "string ou null"
          }`
        },
        {
          role: 'user',
          content: `Analise este edital e retorne APENAS o JSON estruturado:\n\n${content.substring(0, 8000)}`
        }
      ],
      temperature: 0.3,
      max_tokens: 2000,
      response_format: { type: "json_object" }
    });

    const result = response.choices[0].message.content;
    
    if (!result) {
      throw new Error('Resposta vazia da OpenAI');
    }

    // Validar se é JSON válido
    const parsed = JSON.parse(result);
    return JSON.stringify(parsed);
    
  } catch (error) {
    console.error('Erro ao analisar PDF com OpenAI:', error);
    
    if (error instanceof Error) {
      throw new Error(`Falha ao analisar o documento: ${error.message}`);
    }
    
    throw new Error('Falha ao analisar o documento');
  }
}

export async function generateQuestions(editalContent: string, numQuestions: number = 10) {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content: `Você é um especialista em criar questões de concursos públicos.
          Crie ${numQuestions} questões de múltipla escolha baseadas no conteúdo do edital fornecido.
          Cada questão deve ter 5 alternativas (A, B, C, D, E) e apenas uma correta.
          
          IMPORTANTE: Retorne APENAS um objeto JSON válido, sem texto adicional, com a estrutura:
          {
            "questions": [
              {
                "question": "texto da pergunta",
                "options": ["A) opção", "B) opção", "C) opção", "D) opção", "E) opção"],
                "correctAnswer": "A",
                "explanation": "explicação da resposta correta"
              }
            ]
          }`
        },
        {
          role: 'user',
          content: `Baseado neste edital, crie ${numQuestions} questões e retorne APENAS o JSON estruturado:\n\n${editalContent.substring(0, 6000)}`
        }
      ],
      temperature: 0.7,
      max_tokens: 4000,
      response_format: { type: "json_object" }
    });

    const result = response.choices[0].message.content;
    
    if (!result) {
      throw new Error('Resposta vazia da OpenAI');
    }

    // Validar se é JSON válido
    const parsed = JSON.parse(result);
    return JSON.stringify(parsed);
    
  } catch (error) {
    console.error('Erro ao gerar questões com OpenAI:', error);
    
    if (error instanceof Error) {
      throw new Error(`Falha ao gerar questões: ${error.message}`);
    }
    
    throw new Error('Falha ao gerar questões');
  }
}

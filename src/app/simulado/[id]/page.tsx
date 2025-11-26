import { supabase } from '@/lib/supabase';
import { Question } from '@/lib/types';
import Quiz from '@/components/Quiz';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function SimuladoPage({ params }: PageProps) {
  const { id } = await params;

  const { data: simulado, error } = await supabase
    .from('simulados')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !simulado) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-red-600">Erro ao carregar simulado</h1>
        <p>{error?.message || 'Simulado não encontrado'}</p>
      </div>
    );
  }

  const questions: Question[] = simulado.questoes.map((q: any) => ({
    ...q,
    correctAnswer: typeof q.correctAnswer === 'string'
      ? q.correctAnswer.charCodeAt(0) - 65
      : q.correctAnswer
  }));

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">{simulado.titulo}</h1>
      <Quiz questions={questions} simuladoId={id} />
    </div>
  );
}
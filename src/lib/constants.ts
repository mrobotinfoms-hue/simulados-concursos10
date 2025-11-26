// Constantes da plataforma PRO CONCURSOS

export const COLORS = {
  primary: '#1E40AF', // Azul escuro - confiança
  secondary: '#F97316', // Laranja - energia
  success: '#10B981', // Verde - progresso
  warning: '#F59E0B', // Amarelo - atenção
  danger: '#EF4444', // Vermelho - erro
} as const;

export const PLANS = [
  {
    id: 'free',
    name: 'Gratuito',
    price: 0,
    period: 'monthly' as const,
    features: [
      '1 edital',
      '1 simulado',
      'Até 3 matérias',
      'Análise básica de desempenho',
    ],
  },
  {
    id: 'monthly',
    name: 'Mensal',
    price: 29.90,
    period: 'monthly' as const,
    popular: true,
    features: [
      'Editais ilimitados',
      'Simulados ilimitados',
      'Todas as matérias',
      'Análise completa com IA',
      'Explicações detalhadas',
      'Vídeos recomendados',
      'Gamificação completa',
      'Download de simulados',
      'Modo escuro',
      'Suporte prioritário',
    ],
  },
  {
    id: 'annual',
    name: 'Anual',
    price: 298.80,
    period: 'annual' as const,
    features: [
      'Tudo do plano Mensal',
      'Economia de R$ 72,00/ano',
      'Equivalente a R$ 24,90/mês',
      'Acesso antecipado a novidades',
      'Suporte VIP',
    ],
  },
] as const;

export const BADGES = [
  {
    id: 'first-simulado',
    name: 'Primeiro Passo',
    description: 'Complete seu primeiro simulado',
    icon: '🎯',
  },
  {
    id: 'perfect-score',
    name: 'Perfeição',
    description: 'Acerte 100% das questões',
    icon: '🏆',
  },
  {
    id: 'streak-7',
    name: 'Dedicado',
    description: '7 dias seguidos estudando',
    icon: '🔥',
  },
  {
    id: 'streak-30',
    name: 'Imparável',
    description: '30 dias seguidos estudando',
    icon: '⚡',
  },
  {
    id: 'master-subject',
    name: 'Mestre da Matéria',
    description: '90% de acerto em uma matéria',
    icon: '📚',
  },
] as const;

export const DIFFICULTIES = [
  { value: 'easy', label: 'Fácil', color: 'text-green-600' },
  { value: 'medium', label: 'Médio', color: 'text-yellow-600' },
  { value: 'hard', label: 'Difícil', color: 'text-red-600' },
] as const;

export const FREE_LIMITS = {
  editais: 1,
  simulados: 1,
  subjects: 3,
} as const;

// Types para a plataforma PRO CONCURSOS

export interface User {
  id: string;
  name: string;
  email: string;
  plan: 'free' | 'monthly' | 'annual';
  editaisCount: number;
  simuladosCount: number;
  points: number;
  badges: Badge[];
  createdAt: Date;
}

export interface Edital {
  id: string;
  userId: string;
  name: string;
  pdfUrl?: string;
  linkUrl?: string;
  subjects: Subject[];
  createdAt: Date;
}

export interface Subject {
  id: string;
  name: string;
  topics: string[];
}

export interface Simulado {
  id: string;
  userId: string;
  editalId: string;
  name: string;
  difficulty: 'easy' | 'medium' | 'hard';
  questionsCount: number;
  timeLimit: number; // em minutos
  questions: Question[];
  createdAt: Date;
}

export interface Question {
  id: string;
  subject: string;
  topic: string;
  difficulty: 'easy' | 'medium' | 'hard';
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  videoUrl?: string;
}

export interface SimuladoResult {
  id: string;
  simuladoId: string;
  userId: string;
  score: number;
  correctAnswers: number;
  totalQuestions: number;
  timeSpent: number;
  answers: UserAnswer[];
  weakSubjects: WeakSubject[];
  completedAt: Date;
}

export interface UserAnswer {
  questionId: string;
  selectedAnswer: number;
  isCorrect: boolean;
}

export interface WeakSubject {
  subject: string;
  topics: string[];
  errorRate: number;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlockedAt: Date;
}

export interface Plan {
  id: string;
  name: string;
  price: number;
  period: 'monthly' | 'annual';
  features: string[];
  popular?: boolean;
}

'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Navbar } from '@/components/custom/navbar';
import { Footer } from '@/components/custom/footer';
import {
  Upload,
  Brain,
  BarChart3,
  Trophy,
  Clock,
  CheckCircle2,
  Zap,
  Target,
  Download,
  Printer,
  Star,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 via-white to-orange-50 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-4xl mx-auto">
            <Badge className="mb-6 bg-gradient-to-r from-blue-700 to-blue-900 text-white border-0 px-4 py-2">
              <Sparkles className="w-4 h-4 mr-2 inline" />
              Simulados Inteligentes com IA
            </Badge>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-700 via-blue-800 to-blue-900 bg-clip-text text-transparent leading-tight">
              Sua aprovação começa aqui
            </h1>
            <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
              Estude para concursos públicos com{' '}
              <span className="font-semibold text-blue-700 dark:text-blue-400">
                simulados personalizados
              </span>{' '}
              gerados por inteligência artificial. Análise de desempenho, gamificação e muito mais.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/login">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-700 to-blue-900 hover:from-blue-800 hover:to-blue-950 text-white text-lg px-8 py-6 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                >
                  Começar Agora Grátis
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link href="#planos">
                <Button
                  size="lg"
                  variant="outline"
                  className="text-lg px-8 py-6 border-2 border-blue-700 text-blue-700 hover:bg-blue-50 dark:border-blue-400 dark:text-blue-400 dark:hover:bg-gray-900"
                >
                  Ver Planos
                </Button>
              </Link>
            </div>
            <p className="mt-6 text-sm text-gray-500 dark:text-gray-400">
              ✨ Teste grátis: 1 edital + 1 simulado com até 3 matérias
            </p>
          </div>

          {/* Stats */}
          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {[
              { value: '10.000+', label: 'Questões' },
              { value: '500+', label: 'Concursos' },
              { value: '95%', label: 'Satisfação' },
              { value: '24/7', label: 'Disponível' },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-blue-700 dark:text-blue-400 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600 dark:text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Funcionalidades */}
      <section id="funcionalidades" className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
              Como Funciona
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              4 passos simples para turbinar seus estudos e conquistar sua aprovação
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Upload,
                title: 'Upload do Edital',
                description:
                  'Envie o link ou PDF do edital. Nossa IA identifica automaticamente todas as matérias e conteúdos.',
                color: 'from-blue-500 to-blue-700',
              },
              {
                icon: Brain,
                title: 'Simulados Inteligentes',
                description:
                  'Escolha dificuldade, quantidade de questões e tempo. A IA gera simulados personalizados.',
                color: 'from-orange-500 to-orange-700',
              },
              {
                icon: BarChart3,
                title: 'Análise Completa',
                description:
                  'Veja seu desempenho, explicações detalhadas e vídeos recomendados para cada questão.',
                color: 'from-green-500 to-green-700',
              },
              {
                icon: Trophy,
                title: 'Gamificação',
                description:
                  'Ganhe pontos, badges e suba no ranking. Estude de forma divertida e motivadora.',
                color: 'from-purple-500 to-purple-700',
              },
            ].map((feature, index) => (
              <Card
                key={index}
                className="p-6 hover:shadow-2xl transition-all duration-300 transform hover:scale-105 border-2 border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900"
              >
                <div
                  className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 shadow-lg`}
                >
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {feature.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefícios */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-orange-50 dark:from-gray-900 dark:to-gray-950">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
              Por Que Escolher o PRO CONCURSOS?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Recursos exclusivos que vão acelerar sua aprovação
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Zap,
                title: 'IA de Última Geração',
                description: 'Questões geradas com inteligência artificial avançada',
              },
              {
                icon: Target,
                title: 'Foco no Seu Edital',
                description: 'Simulados 100% personalizados para o seu concurso',
              },
              {
                icon: Clock,
                title: 'Estude no Seu Ritmo',
                description: 'Defina tempo e quantidade de questões',
              },
              {
                icon: Download,
                title: 'Baixe e Imprima',
                description: 'Estude offline quando e onde quiser',
              },
              {
                icon: CheckCircle2,
                title: 'Explicações Detalhadas',
                description: 'Entenda cada questão com explicações completas',
              },
              {
                icon: Star,
                title: 'Modo Escuro',
                description: 'Estude confortavelmente em qualquer horário',
              },
            ].map((benefit, index) => (
              <Card
                key={index}
                className="p-6 bg-white dark:bg-gray-900 border-2 border-gray-100 dark:border-gray-800 hover:border-blue-300 dark:hover:border-blue-700 transition-all duration-300"
              >
                <benefit.icon className="w-10 h-10 text-blue-700 dark:text-blue-400 mb-4" />
                <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">{benefit.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Planos */}
      <section id="planos" className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
              Escolha Seu Plano
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Comece grátis e desbloqueie todo o potencial quando estiver pronto
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Plano Gratuito */}
            <Card className="p-8 border-2 border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">Gratuito</h3>
                <div className="text-4xl font-bold text-gray-900 dark:text-white mb-2">R$ 0</div>
                <p className="text-gray-600 dark:text-gray-400">Para testar a plataforma</p>
              </div>
              <ul className="space-y-3 mb-8">
                {['1 edital', '1 simulado', 'Até 3 matérias', 'Análise básica'].map((feature) => (
                  <li key={feature} className="flex items-start">
                    <CheckCircle2 className="w-5 h-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>
              <Link href="/login">
                <Button variant="outline" className="w-full border-2 border-gray-300 dark:border-gray-700">
                  Começar Grátis
                </Button>
              </Link>
            </Card>

            {/* Plano Mensal */}
            <Card className="p-8 border-4 border-blue-700 dark:border-blue-500 bg-white dark:bg-gray-900 relative transform scale-105 shadow-2xl">
              <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-orange-500 to-orange-700 text-white border-0 px-4 py-1">
                MAIS POPULAR
              </Badge>
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">Mensal</h3>
                <div className="text-5xl font-bold text-blue-700 dark:text-blue-400 mb-2">
                  R$ 29,90
                </div>
                <p className="text-gray-600 dark:text-gray-400">por mês</p>
              </div>
              <ul className="space-y-3 mb-8">
                {[
                  'Editais ilimitados',
                  'Simulados ilimitados',
                  'Todas as matérias',
                  'Análise completa com IA',
                  'Explicações detalhadas',
                  'Vídeos recomendados',
                  'Gamificação completa',
                  'Download e impressão',
                  'Modo escuro',
                  'Suporte prioritário',
                ].map((feature) => (
                  <li key={feature} className="flex items-start">
                    <CheckCircle2 className="w-5 h-5 text-blue-700 dark:text-blue-400 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>
              <Link href="/planos">
                <Button className="w-full bg-gradient-to-r from-blue-700 to-blue-900 hover:from-blue-800 hover:to-blue-950 text-white shadow-xl">
                  Assinar Agora
                </Button>
              </Link>
            </Card>

            {/* Plano Anual */}
            <Card className="p-8 border-2 border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 relative">
              <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-green-500 to-green-700 text-white border-0 px-4 py-1">
                ECONOMIZE R$ 72
              </Badge>
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">Anual</h3>
                <div className="text-5xl font-bold text-green-700 dark:text-green-400 mb-2">
                  R$ 298,80
                </div>
                <p className="text-gray-600 dark:text-gray-400">R$ 24,90/mês</p>
              </div>
              <ul className="space-y-3 mb-8">
                {[
                  'Tudo do plano Mensal',
                  'Economia de R$ 72/ano',
                  'Acesso antecipado',
                  'Suporte VIP',
                ].map((feature) => (
                  <li key={feature} className="flex items-start">
                    <CheckCircle2 className="w-5 h-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>
              <Link href="/planos">
                <Button
                  variant="outline"
                  className="w-full border-2 border-green-700 text-green-700 hover:bg-green-50 dark:border-green-500 dark:text-green-400 dark:hover:bg-gray-900"
                >
                  Assinar Anual
                </Button>
              </Link>
            </Card>
          </div>
        </div>
      </section>

      {/* Depoimentos */}
      <section id="depoimentos" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-orange-50 dark:from-gray-900 dark:to-gray-950">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
              O Que Dizem Nossos Alunos
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Histórias reais de aprovação com o PRO CONCURSOS
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: 'Maria Silva',
                role: 'Aprovada TRT-SP',
                text: 'Os simulados personalizados foram essenciais para minha aprovação. A análise de desempenho me mostrou exatamente onde precisava melhorar.',
                rating: 5,
              },
              {
                name: 'João Santos',
                role: 'Aprovado Polícia Federal',
                text: 'A gamificação tornou os estudos muito mais motivadores. Consegui manter a consistência e fui aprovado em 6 meses!',
                rating: 5,
              },
              {
                name: 'Ana Costa',
                role: 'Aprovada TCU',
                text: 'A qualidade das questões e explicações é excepcional. Melhor investimento que fiz para meus estudos.',
                rating: 5,
              },
            ].map((testimonial, index) => (
              <Card key={index} className="p-6 bg-white dark:bg-gray-900 border-2 border-gray-100 dark:border-gray-800">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                  ))}
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-4 italic">"{testimonial.text}"</p>
                <div>
                  <div className="font-bold text-gray-900 dark:text-white">{testimonial.name}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">{testimonial.role}</div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-700 via-blue-800 to-blue-900 dark:from-blue-900 dark:via-blue-950 dark:to-black">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6 text-white">
            Pronto para sua aprovação?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Junte-se a milhares de aprovados que transformaram seus estudos com o PRO CONCURSOS
          </p>
          <Link href="/login">
            <Button
              size="lg"
              className="bg-white text-blue-700 hover:bg-gray-100 text-lg px-8 py-6 shadow-2xl transform hover:scale-105 transition-all duration-300"
            >
              Começar Agora Grátis
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
          <p className="mt-6 text-blue-200 text-sm">
            ✨ Sem cartão de crédito • Teste completo grátis • Cancele quando quiser
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}

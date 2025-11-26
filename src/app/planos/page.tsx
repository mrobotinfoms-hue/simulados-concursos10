'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Navbar } from '@/components/custom/navbar';
import { Footer } from '@/components/custom/footer';
import {
  CheckCircle2,
  ArrowLeft,
  CreditCard,
  Shield,
  Zap,
  Clock,
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';

export default function PlanosPage() {
  const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'annual' | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    // Simulação de pagamento - integrar gateway depois
    setTimeout(() => {
      setIsProcessing(false);
      alert('Pagamento em desenvolvimento - gateway será integrado no próximo módulo');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <Navbar />

      <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <Link href="/" className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-blue-700 dark:hover:text-blue-400 mb-8 transition-colors">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar para home
            </Link>
            <h1 className="text-5xl font-bold mb-4 text-gray-900 dark:text-white">
              Escolha Seu Plano
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Invista na sua aprovação com a plataforma mais completa de simulados para concursos
            </p>
          </div>

          {selectedPlan ? (
            /* Página de Pagamento */
            <div className="max-w-4xl mx-auto">
              <Card className="p-8 bg-white dark:bg-gray-900 border-2 border-gray-100 dark:border-gray-800">
                <div className="mb-8">
                  <h2 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">
                    Finalizar Assinatura
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    Complete os dados para ativar seu plano{' '}
                    {selectedPlan === 'monthly' ? 'Mensal' : 'Anual'}
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  {/* Resumo do Pedido */}
                  <div>
                    <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
                      Resumo do Pedido
                    </h3>
                    <Card className="p-6 bg-gradient-to-br from-blue-50 to-orange-50 dark:from-gray-800 dark:to-gray-900 border-2 border-blue-200 dark:border-blue-900">
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-700 dark:text-gray-300">Plano</span>
                          <span className="font-bold text-gray-900 dark:text-white">
                            {selectedPlan === 'monthly' ? 'Mensal' : 'Anual'}
                          </span>
                        </div>
                        <Separator />
                        <div className="flex justify-between items-center">
                          <span className="text-gray-700 dark:text-gray-300">Valor</span>
                          <span className="text-2xl font-bold text-blue-700 dark:text-blue-400">
                            R$ {selectedPlan === 'monthly' ? '29,90' : '298,80'}
                          </span>
                        </div>
                        {selectedPlan === 'annual' && (
                          <div className="text-sm text-green-700 dark:text-green-400 bg-green-50 dark:bg-green-950 p-3 rounded-lg">
                            ✨ Você está economizando R$ 72,00 por ano!
                          </div>
                        )}
                        <Separator />
                        <div className="space-y-2">
                          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                            <CheckCircle2 className="w-4 h-4 mr-2 text-green-600" />
                            Editais ilimitados
                          </div>
                          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                            <CheckCircle2 className="w-4 h-4 mr-2 text-green-600" />
                            Simulados ilimitados
                          </div>
                          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                            <CheckCircle2 className="w-4 h-4 mr-2 text-green-600" />
                            Análise completa com IA
                          </div>
                          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                            <CheckCircle2 className="w-4 h-4 mr-2 text-green-600" />
                            Gamificação completa
                          </div>
                        </div>
                      </div>
                    </Card>

                    {/* Garantias */}
                    <div className="mt-6 space-y-3">
                      <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                        <Shield className="w-5 h-5 mr-2 text-green-600" />
                        Pagamento 100% seguro
                      </div>
                      <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                        <Zap className="w-5 h-5 mr-2 text-blue-600" />
                        Acesso imediato após pagamento
                      </div>
                      <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                        <Clock className="w-5 h-5 mr-2 text-orange-600" />
                        Cancele quando quiser
                      </div>
                    </div>
                  </div>

                  {/* Formulário de Pagamento */}
                  <div>
                    <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
                      Dados de Pagamento
                    </h3>
                    <form onSubmit={handlePayment} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="cardName">Nome no Cartão</Label>
                        <Input
                          id="cardName"
                          placeholder="Como está no cartão"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="cardNumber">Número do Cartão</Label>
                        <div className="relative">
                          <CreditCard className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                          <Input
                            id="cardNumber"
                            placeholder="0000 0000 0000 0000"
                            className="pl-10"
                            maxLength={19}
                            required
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="expiry">Validade</Label>
                          <Input
                            id="expiry"
                            placeholder="MM/AA"
                            maxLength={5}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="cvv">CVV</Label>
                          <Input
                            id="cvv"
                            placeholder="123"
                            maxLength={4}
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="cpf">CPF</Label>
                        <Input
                          id="cpf"
                          placeholder="000.000.000-00"
                          maxLength={14}
                          required
                        />
                      </div>

                      <Separator className="my-6" />

                      <div className="flex items-start space-x-2">
                        <input
                          type="checkbox"
                          className="mt-1 rounded border-gray-300"
                          required
                        />
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          Aceito os{' '}
                          <a href="#" className="text-blue-700 dark:text-blue-400 hover:underline">
                            Termos de Uso
                          </a>{' '}
                          e autorizo a cobrança{' '}
                          {selectedPlan === 'monthly' ? 'mensal' : 'anual'} no meu cartão
                        </span>
                      </div>

                      <Button
                        type="submit"
                        className="w-full bg-gradient-to-r from-blue-700 to-blue-900 hover:from-blue-800 hover:to-blue-950 text-white py-6 text-lg"
                        disabled={isProcessing}
                      >
                        {isProcessing ? (
                          'Processando...'
                        ) : (
                          <>
                            Confirmar Pagamento - R${' '}
                            {selectedPlan === 'monthly' ? '29,90' : '298,80'}
                          </>
                        )}
                      </Button>

                      <Button
                        type="button"
                        variant="ghost"
                        className="w-full"
                        onClick={() => setSelectedPlan(null)}
                      >
                        Voltar
                      </Button>
                    </form>

                    <div className="mt-6 text-center">
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        🔒 Seus dados estão protegidos com criptografia SSL
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          ) : (
            /* Seleção de Planos */
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {/* Plano Gratuito */}
              <Card className="p-8 border-2 border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">
                    Gratuito
                  </h3>
                  <div className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                    R$ 0
                  </div>
                  <p className="text-gray-600 dark:text-gray-400">Para testar a plataforma</p>
                </div>
                <ul className="space-y-3 mb-8">
                  {['1 edital', '1 simulado', 'Até 3 matérias', 'Análise básica'].map(
                    (feature) => (
                      <li key={feature} className="flex items-start">
                        <CheckCircle2 className="w-5 h-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                      </li>
                    )
                  )}
                </ul>
                <Link href="/login">
                  <Button
                    variant="outline"
                    className="w-full border-2 border-gray-300 dark:border-gray-700"
                  >
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
                <Button
                  onClick={() => setSelectedPlan('monthly')}
                  className="w-full bg-gradient-to-r from-blue-700 to-blue-900 hover:from-blue-800 hover:to-blue-950 text-white shadow-xl"
                >
                  Assinar Agora
                </Button>
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
                <Button
                  onClick={() => setSelectedPlan('annual')}
                  variant="outline"
                  className="w-full border-2 border-green-700 text-green-700 hover:bg-green-50 dark:border-green-500 dark:text-green-400 dark:hover:bg-gray-900"
                >
                  Assinar Anual
                </Button>
              </Card>
            </div>
          )}

          {/* FAQ */}
          {!selectedPlan && (
            <div className="mt-20 max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">
                Perguntas Frequentes
              </h2>
              <div className="space-y-6">
                {[
                  {
                    q: 'Posso cancelar a qualquer momento?',
                    a: 'Sim! Você pode cancelar sua assinatura a qualquer momento, sem multas ou taxas adicionais.',
                  },
                  {
                    q: 'Como funciona o período de teste gratuito?',
                    a: 'Você pode criar 1 edital e 1 simulado com até 3 matérias gratuitamente, sem precisar de cartão de crédito.',
                  },
                  {
                    q: 'Posso mudar de plano depois?',
                    a: 'Sim! Você pode fazer upgrade ou downgrade do seu plano a qualquer momento.',
                  },
                  {
                    q: 'Os simulados são realmente personalizados?',
                    a: 'Sim! Nossa IA analisa o edital do seu concurso e gera questões específicas para as matérias cobradas.',
                  },
                ].map((faq, index) => (
                  <Card
                    key={index}
                    className="p-6 bg-white dark:bg-gray-900 border-2 border-gray-100 dark:border-gray-800"
                  >
                    <h3 className="font-bold text-lg mb-2 text-gray-900 dark:text-white">
                      {faq.q}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">{faq.a}</p>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}

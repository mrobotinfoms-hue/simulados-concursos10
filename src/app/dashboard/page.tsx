'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Upload, Link as LinkIcon, FileText, Loader2, CheckCircle, XCircle, LogOut } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export default function DashboardPage() {
  const [uploadMethod, setUploadMethod] = useState<'file' | 'url'>('file');
  const [file, setFile] = useState<File | null>(null);
  const [url, setUrl] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<any>(null);
  const [error, setError] = useState('');
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        router.push('/login');
        return;
      }

      setUser(user);
    } catch (error) {
      console.error('Erro ao verificar usuário:', error);
      router.push('/login');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setError('');
    }
  };

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    setError('');
    setAnalysis(null);

    try {
      const formData = new FormData();
      
      if (uploadMethod === 'file' && file) {
        formData.append('file', file);
      } else if (uploadMethod === 'url' && url) {
        formData.append('url', url);
      } else {
        setError('Por favor, forneça um arquivo ou URL válido');
        setIsAnalyzing(false);
        return;
      }

      const response = await fetch('/api/edital/analyze', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        const errorMsg = data.details ? `${data.error}: ${data.details}` : data.error;
        throw new Error(errorMsg || 'Erro ao analisar edital');
      }

      if (!data.analysis) {
        throw new Error('Análise retornou vazia. Tente novamente.');
      }

      console.log('Análise recebida com sucesso:', data.analysis);
      setAnalysis(data.analysis);

      // Salvar edital no Supabase
      if (user) {
        const { error: insertError } = await supabase
          .from('editais')
          .insert({
            user_id: user.id,
            titulo: data.analysis.titulo || 'Edital sem título',
            orgao: data.analysis.orgao,
            vagas: data.analysis.vagas,
            disciplinas: Array.isArray(data.analysis.disciplinas) 
              ? data.analysis.disciplinas 
              : data.analysis.disciplinas?.split(',').map((d: string) => d.trim()),
            conteudo_completo: data.analysis,
          });

        if (insertError) {
          console.error('Erro ao salvar edital:', insertError);
        }
      }
    } catch (err) {
      console.error('Erro capturado:', err);
      const errorMessage = err instanceof Error ? err.message : 'Erro ao analisar edital';
      setError(errorMessage);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleGenerateSimulado = async () => {
    if (!analysis || !user) return;

    try {
      const response = await fetch('/api/simulado/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          editalContent: JSON.stringify(analysis),
          numQuestions: 10,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Erro ao gerar simulado');
      }

      // Salvar simulado no Supabase
      const { data: simuladoData, error: simuladoError } = await supabase
        .from('simulados')
        .insert({
          user_id: user.id,
          titulo: analysis.titulo || 'Simulado',
          questoes: data.questions,
          num_questoes: data.questions.length,
        })
        .select()
        .single();

      if (simuladoError) {
        throw simuladoError;
      }

      router.push(`/simulado/${simuladoData.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao gerar simulado');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-white animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 dark:from-slate-950 dark:via-blue-950 dark:to-slate-950">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div className="text-center flex-1">
              <h1 className="text-4xl font-bold text-white mb-2">Dashboard</h1>
              <p className="text-blue-200">Analise editais e gere simulados inteligentes</p>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all"
            >
              <LogOut className="w-4 h-4" />
              Sair
            </button>
          </div>

          <div className="bg-white/10 dark:bg-slate-900/50 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-white/20 mb-6">
            <h2 className="text-2xl font-bold text-white mb-6">Analisar Edital</h2>

            <div className="flex gap-4 mb-6">
              <button
                onClick={() => setUploadMethod('file')}
                className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all ${
                  uploadMethod === 'file'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white/10 text-blue-200 hover:bg-white/20'
                }`}
              >
                <Upload className="w-5 h-5 inline mr-2" />
                Upload de Arquivo
              </button>
              <button
                onClick={() => setUploadMethod('url')}
                className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all ${
                  uploadMethod === 'url'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white/10 text-blue-200 hover:bg-white/20'
                }`}
              >
                <LinkIcon className="w-5 h-5 inline mr-2" />
                Link do PDF
              </button>
            </div>

            {uploadMethod === 'file' ? (
              <div className="mb-6">
                <label className="block text-blue-100 mb-2 font-medium">
                  Selecione o arquivo PDF do edital
                </label>
                <div className="relative">
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={handleFileChange}
                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-600 file:text-white hover:file:bg-blue-700 cursor-pointer"
                  />
                </div>
                {file && (
                  <p className="mt-2 text-sm text-blue-200 flex items-center">
                    <FileText className="w-4 h-4 mr-2" />
                    {file.name}
                  </p>
                )}
              </div>
            ) : (
              <div className="mb-6">
                <label className="block text-blue-100 mb-2 font-medium">
                  Cole o link do PDF do edital
                </label>
                <input
                  type="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://exemplo.com/edital.pdf"
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-blue-200/50 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
            )}

            <button
              onClick={handleAnalyze}
              disabled={isAnalyzing || (!file && !url)}
              className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Analisando com IA GPT-4o...
                </>
              ) : (
                <>
                  <FileText className="w-5 h-5 mr-2" />
                  Analisar Edital com IA
                </>
              )}
            </button>

            {error && (
              <div className="mt-4 p-4 bg-red-500/20 border border-red-500/50 rounded-lg flex items-start">
                <XCircle className="w-5 h-5 text-red-400 mr-2 flex-shrink-0 mt-0.5" />
                <p className="text-red-200">{error}</p>
              </div>
            )}
          </div>

          {analysis && (
            <div className="bg-white/10 dark:bg-slate-900/50 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-white/20">
              <div className="flex items-center mb-6">
                <CheckCircle className="w-6 h-6 text-green-400 mr-2" />
                <h2 className="text-2xl font-bold text-white">Análise Concluída</h2>
              </div>

              <div className="space-y-4 mb-6">
                {analysis.titulo && (
                  <div>
                    <h3 className="text-sm font-semibold text-blue-300 mb-1">Título</h3>
                    <p className="text-white">{analysis.titulo}</p>
                  </div>
                )}
                {analysis.orgao && (
                  <div>
                    <h3 className="text-sm font-semibold text-blue-300 mb-1">Órgão</h3>
                    <p className="text-white">{analysis.orgao}</p>
                  </div>
                )}
                {analysis.vagas && (
                  <div>
                    <h3 className="text-sm font-semibold text-blue-300 mb-1">Vagas</h3>
                    <p className="text-white">{analysis.vagas}</p>
                  </div>
                )}
                {analysis.disciplinas && (
                  <div>
                    <h3 className="text-sm font-semibold text-blue-300 mb-1">Disciplinas</h3>
                    <p className="text-white">{Array.isArray(analysis.disciplinas) ? analysis.disciplinas.join(', ') : analysis.disciplinas}</p>
                  </div>
                )}
              </div>

              <button
                onClick={handleGenerateSimulado}
                className="w-full py-3 px-4 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
              >
                Gerar Simulado com IA
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

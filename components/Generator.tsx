import React, { useState } from 'react';
import { AspectRatio, GeneratedImage } from '../types';
import { generateCoffeeImage } from '../services/geminiService';
import { Loader2, Download, Sparkles, Image as ImageIcon, History } from 'lucide-react';

const Generator: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>(AspectRatio.SQUARE);
  const [isLoading, setIsLoading] = useState(false);
  const [history, setHistory] = useState<GeneratedImage[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;

    setIsLoading(true);
    setError(null);
    try {
      const imageUrl = await generateCoffeeImage(prompt, aspectRatio);
      const newImage: GeneratedImage = {
        url: imageUrl,
        prompt,
        aspectRatio,
        timestamp: Date.now(),
      };
      setHistory([newImage, ...history]);
    } catch (err) {
      setError('图片生成失败，请重试。');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-8 text-center">
        <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 mb-3">
          AI 咖啡艺术工坊
        </h2>
        <p className="text-stone-400 text-lg">
          使用 Imagen 4.0 将您最大胆的咖啡创意可视化
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Controls Section */}
        <div className="lg:col-span-1 space-y-6 bg-stone-900/50 p-6 rounded-2xl border border-stone-800 h-fit">
          <div>
            <label className="block text-sm font-medium text-stone-300 mb-2">
              描述您的创意
            </label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="一杯拉花艺术杰作，星系图案，电影级布光，写实风格..."
              className="w-full h-32 bg-stone-950 border border-stone-700 rounded-xl p-4 text-stone-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all resize-none placeholder-stone-600"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-stone-300 mb-2">
              图片比例
            </label>
            <div className="grid grid-cols-3 gap-2">
              {Object.values(AspectRatio).map((ratio) => (
                <button
                  key={ratio}
                  onClick={() => setAspectRatio(ratio)}
                  className={`py-2 px-3 rounded-lg text-xs font-medium border transition-all ${
                    aspectRatio === ratio
                      ? 'bg-indigo-600 border-indigo-500 text-white'
                      : 'bg-stone-950 border-stone-800 text-stone-400 hover:border-stone-600'
                  }`}
                >
                  {ratio}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleGenerate}
            disabled={isLoading || !prompt}
            className={`w-full py-3 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all ${
              isLoading || !prompt
                ? 'bg-stone-800 text-stone-500 cursor-not-allowed'
                : 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:shadow-lg hover:shadow-indigo-500/20 active:scale-95'
            }`}
          >
            {isLoading ? (
              <>
                <Loader2 className="animate-spin" />
                生成中...
              </>
            ) : (
              <>
                <Sparkles size={20} />
                生成图片
              </>
            )}
          </button>
          
          {error && (
            <div className="p-3 bg-red-900/20 border border-red-800 rounded-lg text-red-300 text-sm">
              {error}
            </div>
          )}
        </div>

        {/* Display Section */}
        <div className="lg:col-span-2 space-y-6">
          {/* Main Result */}
          <div className="min-h-[400px] bg-stone-900/50 rounded-2xl border border-stone-800 flex items-center justify-center relative overflow-hidden group">
            {history.length > 0 ? (
              <div className="relative w-full h-full flex items-center justify-center p-4">
                <img
                  src={history[0].url}
                  alt={history[0].prompt}
                  className="max-w-full max-h-[600px] object-contain rounded-lg shadow-2xl"
                />
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <a
                    href={history[0].url}
                    download={`brewmaster-ai-${history[0].timestamp}.jpg`}
                    className="p-2 bg-black/50 backdrop-blur-sm rounded-full text-white hover:bg-black/70 block"
                  >
                    <Download size={20} />
                  </a>
                </div>
              </div>
            ) : (
              <div className="text-center p-8">
                <div className="w-20 h-20 bg-stone-800 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ImageIcon size={32} className="text-stone-600" />
                </div>
                <h3 className="text-xl font-semibold text-stone-300 mb-2">准备创作</h3>
                <p className="text-stone-500 max-w-md mx-auto">
                  输入提示词并选择比例，开始生成独一无二的咖啡艺术。
                </p>
              </div>
            )}
          </div>

          {/* History Strip */}
          {history.length > 1 && (
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-stone-400 px-1">
                <History size={16} />
                <span className="text-sm font-medium">最近创作</span>
              </div>
              <div className="grid grid-cols-4 sm:grid-cols-5 gap-3">
                {history.slice(1, 6).map((item) => (
                  <button
                    key={item.timestamp}
                    onClick={() => {
                      // Move this item to top of history to display it
                      setHistory([item, ...history.filter((h) => h !== item)]);
                    }}
                    className="aspect-square rounded-lg overflow-hidden border border-stone-800 hover:border-indigo-500 transition-all relative group"
                  >
                    <img
                      src={item.url}
                      alt="History thumbnail"
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Generator;
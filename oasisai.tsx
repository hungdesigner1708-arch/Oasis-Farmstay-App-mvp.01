
import React, { useState } from 'react';
import { GoogleGenAI } from "@google/genai";
import { Search, Image as ImageIcon, Sparkles, Globe, ExternalLink, Loader2, Maximize2, Wand2, ShieldCheck, Key } from 'lucide-react';

const OasisAI: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<{ text: string; links: any[] } | null>(null);
  const [isSearching, setIsSearching] = useState(false);

  const [imagePrompt, setImagePrompt] = useState('');
  const [imageSize, setImageSize] = useState<'1K' | '2K' | '4K'>('1K');
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [hasKey, setHasKey] = useState(false);

  const checkAndOpenKey = async () => {
    // @ts-ignore
    const selected = await window.aistudio.hasSelectedApiKey();
    if (!selected) {
      // @ts-ignore
      await window.aistudio.openSelectKey();
    }
    setHasKey(true);
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    setIsSearching(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: searchQuery,
        config: {
          tools: [{ googleSearch: {} }],
        },
      });

      const text = response.text || "Không có kết quả trả về.";
      const links = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
      setSearchResults({ text, links });
    } catch (error) {
      console.error("Search failed:", error);
      setSearchResults({ text: "Đã có lỗi xảy ra khi tìm kiếm thông tin.", links: [] });
    } finally {
      setIsSearching(false);
    }
  };

  const handleGenerateImage = async () => {
    if (!imagePrompt.trim()) return;
    setIsGenerating(true);
    try {
      await checkAndOpenKey();
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-image-preview',
        contents: {
          parts: [{ text: imagePrompt }],
        },
        config: {
          imageConfig: {
            aspectRatio: "1:1",
            imageSize: imageSize
          }
        },
      });

      let imgData = null;
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          imgData = `data:image/png;base64,${part.inlineData.data}`;
          break;
        }
      }
      setGeneratedImage(imgData);
    } catch (error: any) {
      console.error("Image generation failed:", error);
      if (error.message?.includes("Requested entity was not found")) {
        // @ts-ignore
        await window.aistudio.openSelectKey();
      }
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-12 animate-in fade-in duration-700 pb-24 md:pb-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-3">
          <div className="flex items-center gap-3 text-[#005f73]">
            <Sparkles className="w-6 h-6 animate-pulse text-[#e9c46a]" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em]">Oasis Cognitive Systems</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-strong text-[#1b4332]">Trí Tuệ Nhân Tạo Oasis</h1>
          <p className="text-slate-500 font-medium italic">Tra cứu thông tin thị trường và kiến tạo concept nông nghiệp tương lai.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Search Grounding Section */}
        <div className="bg-white rounded-[3rem] p-10 border border-slate-100 shadow-xl space-y-8 flex flex-col h-full">
          <div className="flex items-center gap-4">
            <div className="bg-[#005f73]/10 p-4 rounded-2xl">
              <Globe className="w-6 h-6 text-[#005f73]" />
            </div>
            <div>
              <h3 className="text-2xl font-strong text-[#1b4332]">Oasis Global Search</h3>
              <p className="text-xs text-slate-400 font-medium italic">Thông tin thị trường nông sản & tin tức mới nhất.</p>
            </div>
          </div>

          <div className="relative">
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              placeholder="Hỏi về giá sầu riêng, xu hướng Organic 2024..."
              className="w-full pl-12 pr-24 py-5 bg-slate-50 border border-slate-100 rounded-[2rem] text-sm focus:outline-none focus:ring-4 focus:ring-[#005f73]/5 transition-all font-medium"
            />
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <button 
              onClick={handleSearch}
              disabled={isSearching}
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-[#1b4332] text-white px-6 py-2.5 rounded-2xl font-strong text-[10px] tracking-widest hover:bg-[#005f73] transition-all disabled:opacity-50"
            >
              {isSearching ? <Loader2 className="w-4 h-4 animate-spin" /> : 'TRA CỨU'}
            </button>
          </div>

          <div className="flex-1 bg-slate-50 rounded-[2rem] p-8 border border-slate-100 min-h-[300px] relative overflow-y-auto">
            {searchResults ? (
              <div className="space-y-6 animate-in fade-in duration-500">
                <div className="text-slate-700 text-sm leading-relaxed prose prose-slate max-w-none">
                  {searchResults.text}
                </div>
                {searchResults.links.length > 0 && (
                  <div className="pt-6 border-t border-slate-200">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                      <ShieldCheck className="w-3 h-3 text-emerald-500" /> Nguồn tin xác thực
                    </p>
                    <div className="flex flex-wrap gap-3">
                      {searchResults.links.map((chunk, idx) => (
                        chunk.web && (
                          <a 
                            key={idx} 
                            href={chunk.web.uri} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-[10px] font-bold text-[#005f73] hover:border-[#e9c46a] hover:shadow-md transition-all group"
                          >
                            <span className="truncate max-w-[120px]">{chunk.web.title || 'Nguồn tin'}</span>
                            <ExternalLink className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                          </a>
                        )
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-300 space-y-4">
                <Search className="w-12 h-12 opacity-20" />
                <p className="text-[10px] font-black uppercase tracking-[0.2em]">Đang chờ truy vấn từ bạn...</p>
              </div>
            )}
          </div>
        </div>

        {/* Image Generation Section */}
        <div className="bg-white rounded-[3rem] p-10 border border-slate-100 shadow-xl space-y-8 flex flex-col h-full">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-[#e9c46a]/10 p-4 rounded-2xl">
                <ImageIcon className="w-6 h-6 text-[#1b4332]" />
              </div>
              <div>
                <h3 className="text-2xl font-strong text-[#1b4332]">Oasis Concept Art</h3>
                <p className="text-xs text-slate-400 font-medium italic">Kiến tạo hình ảnh Farm trong mơ của bạn.</p>
              </div>
            </div>
            {!hasKey && (
              <button 
                onClick={checkAndOpenKey}
                className="flex items-center gap-2 px-4 py-2 bg-amber-50 text-amber-700 rounded-xl text-[9px] font-black uppercase tracking-widest border border-amber-100 animate-pulse"
              >
                <Key className="w-3 h-3" /> Cần API Key
              </button>
            )}
          </div>

          <div className="space-y-4">
            <div className="flex gap-2 p-1 bg-slate-100 rounded-2xl w-fit">
              {(['1K', '2K', '4K'] as const).map(size => (
                <button
                  key={size}
                  onClick={() => setImageSize(size)}
                  className={`px-6 py-2 rounded-xl text-[10px] font-black tracking-widest transition-all ${
                    imageSize === size ? 'bg-[#1b4332] text-white shadow-lg' : 'text-slate-400 hover:text-[#1b4332]'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>

            <div className="relative">
              <textarea 
                value={imagePrompt}
                onChange={(e) => setImagePrompt(e.target.value)}
                placeholder="Mô tả nông trại sầu riêng ven hồ lúc hoàng hôn, phong cách nghệ thuật sang trọng..."
                rows={3}
                className="w-full px-6 py-5 bg-slate-50 border border-slate-100 rounded-[2rem] text-sm focus:outline-none focus:ring-4 focus:ring-[#e9c46a]/5 transition-all font-medium resize-none"
              />
              <button 
                onClick={handleGenerateImage}
                disabled={isGenerating}
                className="absolute right-4 bottom-4 btn-sand px-8 py-3 rounded-2xl font-strong text-[10px] tracking-widest flex items-center gap-3 disabled:opacity-50"
              >
                {isGenerating ? <Loader2 className="w-4 h-4 animate-spin" /> : <><Wand2 className="w-4 h-4" /> GENERATE</>}
              </button>
            </div>
          </div>

          <div className="flex-1 rounded-[2rem] border-2 border-dashed border-slate-100 overflow-hidden relative group bg-slate-50 min-h-[400px]">
            {generatedImage ? (
              <>
                <img src={generatedImage} alt="Oasis Generated Art" className="w-full h-full object-cover animate-in zoom-in-95 duration-1000" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                  <a href={generatedImage} download="oasis-art.png" className="bg-white p-4 rounded-full hover:scale-110 transition-transform">
                    <Maximize2 className="w-6 h-6 text-[#1b4332]" />
                  </a>
                </div>
              </>
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-300 space-y-4 p-8 text-center">
                <ImageIcon className="w-16 h-16 opacity-10" />
                <div className="space-y-2">
                  <p className="text-[10px] font-black uppercase tracking-[0.2em]">Hãy mô tả concept của bạn</p>
                  <p className="text-[9px] font-medium text-slate-400 italic">Gợi ý: "Một biệt thự sinh thái Oasis ven biển, mái lá sang trọng, nhiều cây xanh nhiệt đới"</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OasisAI;

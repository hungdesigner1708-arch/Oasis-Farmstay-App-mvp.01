
import React, { useState, useEffect } from 'react';
import { Calendar, CheckCircle2, Trophy, Brain, Award, Sparkles, ChevronRight, Timer, HelpCircle, Gift, Loader2, RefreshCw } from 'lucide-react';

interface Question {
  id: number;
  text: string;
  options: string[];
  correctAnswer: number;
}

const MOCK_QUIZ: Question[] = [
  {
    id: 1,
    text: "Loại sầu riêng đặc sản được trồng tại Oasis Da Teh là gì?",
    options: ["Ri6", "Musang King", "Sầu riêng Chuồng Bò", "Sáu Hữu"],
    correctAnswer: 1
  },
  {
    id: 2,
    text: "Hệ sinh thái Oasis Farmstay ứng dụng công nghệ gì để minh bạch đầu tư?",
    options: ["AI", "Big Data", "Blockchain", "IoT"],
    correctAnswer: 2
  },
  {
    id: 3,
    text: "Oasis Coastal Ninh Thuận nổi tiếng với mô hình kết hợp nuôi con gì và trồng cây gì?",
    options: ["Bò & Sầu riêng", "Gà & Mít", "Dông & Dưa lưới", "Cừu & Nho"],
    correctAnswer: 2
  },
  {
    id: 4,
    text: "Điểm thưởng OasisPoints có thể dùng để làm gì?",
    options: ["Rút tiền mặt", "Đổi đêm nghỉ & sản phẩm", "Chuyển khoản ngân hàng", "Mua vé số"],
    correctAnswer: 1
  },
  {
    id: 5,
    text: "Hạng hội viên cao nhất trong hệ thống Oasis là?",
    options: ["Platinum", "Gold", "Diamond", "Titanium"],
    correctAnswer: 2
  }
];

const MiniGame: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'CHECKIN' | 'QUIZ'>('CHECKIN');
  const [checkedDays, setCheckedDays] = useState<number[]>([0, 1]); // Giả lập đã điểm danh 2 ngày đầu
  const [isCheckingIn, setIsCheckingIn] = useState(false);
  
  // Quiz State
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [quizResult, setQuizResult] = useState<{ score: number, total: number, reward: number } | null>(null);

  const handleCheckIn = () => {
    setIsCheckingIn(true);
    setTimeout(() => {
      const today = new Date().getDay();
      if (!checkedDays.includes(today)) {
        setCheckedDays([...checkedDays, today]);
      }
      setIsCheckingIn(false);
    }, 1000);
  };

  const handleAnswer = (optionIdx: number) => {
    const newAnswers = [...answers, optionIdx];
    setAnswers(newAnswers);
    
    if (currentQuestion < MOCK_QUIZ.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Tính điểm
      const correctCount = newAnswers.reduce((acc, ans, idx) => {
        return ans === MOCK_QUIZ[idx].correctAnswer ? acc + 1 : acc;
      }, 0);
      const scorePercent = (correctCount / MOCK_QUIZ.length) * 100;
      const reward = scorePercent >= 90 ? 500 : 0;
      setQuizResult({ score: correctCount, total: MOCK_QUI_LENGTH, reward });
    }
  };

  const MOCK_QUI_LENGTH = MOCK_QUIZ.length;

  const resetQuiz = () => {
    setQuizStarted(false);
    setCurrentQuestion(0);
    setAnswers([]);
    setQuizResult(null);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-12 animate-in fade-in duration-700 pb-24 md:pb-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-3">
          <div className="flex items-center gap-3 text-[#ee9b00]">
            <Trophy className="w-6 h-6 animate-bounce" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em]">Oasis Fun & Rewards</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-strong text-[#1b4332]">Giải Trí & Tích Điểm</h1>
          <p className="text-slate-500 font-medium italic">Tham gia các hoạt động nhỏ hàng ngày để nhận đặc quyền lớn.</p>
        </div>
      </div>

      <div className="flex gap-6 border-b border-slate-200">
        <button 
          onClick={() => setActiveTab('CHECKIN')}
          className={`pb-4 px-2 text-sm font-strong transition-all flex items-center gap-2 ${activeTab === 'CHECKIN' ? 'border-b-2 border-[#1b4332] text-[#1b4332]' : 'text-slate-400'}`}
        >
          <Calendar className="w-4 h-4" />
          ĐIỂM DANH HÀNG NGÀY
        </button>
        <button 
          onClick={() => setActiveTab('QUIZ')}
          className={`pb-4 px-2 text-sm font-strong transition-all flex items-center gap-2 ${activeTab === 'QUIZ' ? 'border-b-2 border-[#1b4332] text-[#1b4332]' : 'text-slate-400'}`}
        >
          <Brain className="w-4 h-4" />
          THỬ THÁCH KIẾN THỨC
        </button>
      </div>

      {activeTab === 'CHECKIN' ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
          <div className="lg:col-span-2 bg-white rounded-[3rem] p-10 border border-slate-100 shadow-xl space-y-10">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-strong text-[#1b4332]">Chuỗi điểm danh</h3>
              <div className="bg-emerald-50 text-emerald-600 px-4 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest border border-emerald-100">
                +10 PTS Mỗi Ngày
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-4">
              {['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'].map((day, idx) => {
                const isChecked = checkedDays.includes(idx);
                return (
                  <div 
                    key={idx} 
                    className={`aspect-square rounded-[2rem] border-2 flex flex-col items-center justify-center gap-2 transition-all ${
                      isChecked 
                      ? 'bg-[#1b4332] border-[#1b4332] text-white shadow-lg' 
                      : 'bg-slate-50 border-slate-100 text-slate-400'
                    }`}
                  >
                    <span className="text-[10px] font-black uppercase tracking-widest">{day}</span>
                    {isChecked ? (
                      <CheckCircle2 className="w-6 h-6 text-[#e9c46a]" />
                    ) : (
                      <div className="w-6 h-6 rounded-full border-2 border-slate-200"></div>
                    )}
                    <span className="text-[9px] font-bold">10 PTS</span>
                  </div>
                );
              })}
            </div>

            <div className="pt-6">
              <button 
                onClick={handleCheckIn}
                disabled={isCheckingIn || checkedDays.includes(new Date().getDay())}
                className={`w-full py-5 rounded-2xl font-strong text-sm tracking-widest flex items-center justify-center gap-3 transition-all ${
                  checkedDays.includes(new Date().getDay())
                  ? 'bg-slate-100 text-slate-300 cursor-not-allowed'
                  : 'btn-sand shadow-xl active:scale-95'
                }`}
              >
                {isCheckingIn ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : checkedDays.includes(new Date().getDay()) ? (
                  'ĐÃ ĐIỂM DANH HÔM NAY'
                ) : (
                  <>
                    <Calendar className="w-5 h-5" />
                    ĐIỂM DANH NGAY
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="space-y-6">
            <div className="gradient-coastal rounded-[2.5rem] p-8 text-white shadow-xl relative overflow-hidden">
              <div className="relative z-10 space-y-4">
                <Sparkles className="w-10 h-10 text-[#e9c46a] mb-2" />
                <h4 className="text-xl font-strong">Quà tặng chuỗi</h4>
                <p className="text-xs text-white/70 leading-relaxed font-medium">
                  Điểm danh đủ 7 ngày liên tiếp để nhận thêm <span className="text-[#e9c46a] font-bold">100 OasisPoints</span> và Voucher giảm giá 10% tại Store.
                </p>
                <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden mt-4">
                  <div className="h-full bg-[#e9c46a]" style={{ width: `${(checkedDays.length / 7) * 100}%` }}></div>
                </div>
                <p className="text-[10px] font-black text-[#e9c46a] uppercase tracking-widest">Tiến độ: {checkedDays.length}/7 Ngày</p>
              </div>
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/5 rounded-full blur-3xl"></div>
            </div>

            <div className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-xl space-y-6">
              <h4 className="font-strong text-xs text-[#005f73] uppercase tracking-widest flex items-center gap-2">
                <Gift className="w-4 h-4" />
                Dòng thời gian phần thưởng
              </h4>
              <div className="space-y-4">
                {[
                  { day: 'Ngày 7', gift: '100 PTS + Voucher' },
                  { day: 'Ngày 14', gift: '300 PTS + Free Ship' },
                  { day: 'Ngày 30', gift: 'Đặc cách hạng GOLD' },
                ].map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center py-2 border-b border-slate-50 last:border-0">
                    <span className="text-xs font-bold text-slate-500">{item.day}</span>
                    <span className="text-[10px] font-black text-[#1b4332] uppercase">{item.gift}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-[3.5rem] p-10 md:p-16 border border-slate-100 shadow-2xl relative overflow-hidden min-h-[500px] flex flex-col items-center justify-center text-center">
          {!quizStarted && !quizResult ? (
            <div className="max-w-xl space-y-8 animate-in zoom-in-95 duration-500">
              <div className="w-24 h-24 bg-[#005f73]/10 rounded-[2rem] flex items-center justify-center mx-auto text-[#005f73]">
                <Brain className="w-12 h-12" />
              </div>
              <div className="space-y-3">
                <h3 className="text-3xl font-strong text-[#1b4332]">Chuyên gia nông nghiệp Oasis</h3>
                <p className="text-slate-500 italic">Trả lời đúng trên 90% câu hỏi (5/5 câu) để nhận ngay 500 OasisPoints vào ví của bạn.</p>
              </div>
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 bg-slate-50 p-4 rounded-2xl border border-slate-100 flex items-center gap-4">
                  <Timer className="w-5 h-5 text-[#ee9b00]" />
                  <div className="text-left">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Thời gian</p>
                    <p className="text-sm font-bold text-slate-700">Không giới hạn</p>
                  </div>
                </div>
                <div className="flex-1 bg-slate-50 p-4 rounded-2xl border border-slate-100 flex items-center gap-4">
                  <Award className="w-5 h-5 text-[#005f73]" />
                  <div className="text-left">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Phần thưởng</p>
                    <p className="text-sm font-bold text-slate-700">500 PTS</p>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setQuizStarted(true)}
                className="w-full btn-sand py-5 rounded-2xl font-strong text-sm tracking-widest shadow-xl flex items-center justify-center gap-3 group"
              >
                BẮT ĐẦU THỬ THÁCH
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          ) : quizStarted && !quizResult ? (
            <div className="w-full max-w-3xl space-y-12 animate-in slide-in-from-right-10 duration-500">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black text-[#005f73] uppercase tracking-widest">Câu hỏi {currentQuestion + 1} / {MOCK_QUI_LENGTH}</span>
                <div className="flex gap-1">
                  {MOCK_QUIZ.map((_, idx) => (
                    <div 
                      key={idx} 
                      className={`h-1.5 w-10 rounded-full transition-all ${
                        idx < currentQuestion ? 'bg-[#1b4332]' : idx === currentQuestion ? 'bg-[#ee9b00]' : 'bg-slate-100'
                      }`}
                    ></div>
                  ))}
                </div>
              </div>

              <div className="space-y-10">
                <h4 className="text-2xl font-strong text-slate-800 leading-tight">{MOCK_QUIZ[currentQuestion].text}</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {MOCK_QUIZ[currentQuestion].options.map((opt, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleAnswer(idx)}
                      className="p-6 rounded-3xl border-2 border-slate-100 hover:border-[#1b4332] hover:bg-slate-50 text-left transition-all font-medium text-slate-700 group flex items-center gap-4"
                    >
                      <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center font-strong text-xs group-hover:bg-[#1b4332] group-hover:text-white group-hover:border-[#1b4332] transition-colors">
                        {String.fromCharCode(65 + idx)}
                      </div>
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2 justify-center text-slate-300">
                <HelpCircle className="w-4 h-4" />
                <span className="text-[10px] font-black uppercase tracking-[0.2em]">Hãy chọn đáp án bạn cho là đúng nhất</span>
              </div>
            </div>
          ) : quizResult ? (
            <div className="max-w-xl space-y-10 animate-in zoom-in-95 duration-700">
              <div className={`w-32 h-32 rounded-[2.5rem] flex items-center justify-center mx-auto text-white shadow-2xl ${
                quizResult.reward > 0 ? 'bg-gradient-to-br from-[#1b4332] to-[#005f73]' : 'bg-slate-400'
              }`}>
                {quizResult.reward > 0 ? <Trophy className="w-16 h-16 text-[#e9c46a]" /> : <RefreshCw className="w-16 h-16" />}
              </div>
              
              <div className="space-y-4">
                <h3 className="text-4xl font-strong text-[#1b4332]">
                  {quizResult.reward > 0 ? 'XUẤT SẮC!' : 'CỐ GẮNG HƠN!'}
                </h3>
                <p className="text-slate-500 italic text-lg">
                  {quizResult.reward > 0 
                    ? `Bạn đã trả lời đúng ${quizResult.score}/${quizResult.total} câu hỏi.`
                    : `Bạn trả lời đúng ${quizResult.score}/${quizResult.total} câu hỏi. Cần đúng 5/5 để nhận thưởng.`
                  }
                </p>
              </div>

              {quizResult.reward > 0 ? (
                <div className="bg-emerald-50 border border-emerald-100 rounded-[2rem] p-8 space-y-4 animate-bounce">
                  <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">Phần thưởng đã sẵn sàng</p>
                  <div className="flex items-center justify-center gap-4">
                    <span className="text-5xl font-strong text-[#1b4332]">+500</span>
                    <span className="text-sm font-black text-slate-400 uppercase">OasisPoints</span>
                  </div>
                  <button className="w-full bg-[#1b4332] text-white py-4 rounded-xl font-strong text-xs tracking-widest hover:bg-[#005f73] transition-all">NHẬN THƯỞNG VÀO VÍ</button>
                </div>
              ) : (
                <button 
                  onClick={resetQuiz}
                  className="w-full py-5 rounded-2xl border-2 border-[#1b4332] text-[#1b4332] font-strong text-sm tracking-widest hover:bg-[#1b4332] hover:text-white transition-all flex items-center justify-center gap-3"
                >
                  <RefreshCw className="w-5 h-5" />
                  THỬ LẠI LẦN NỮA
                </button>
              )}

              <button 
                onClick={resetQuiz}
                className="text-slate-400 font-bold text-xs uppercase tracking-widest hover:text-[#1b4332] transition-colors"
              >
                QUAY LẠI TRANG CHỦ MINI GAME
              </button>
            </div>
          ) : null}

          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#e9c46a]/5 rounded-full blur-[100px] -mr-48 -mt-48 pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-[#94d2bd]/5 rounded-full blur-[100px] -ml-24 -mb-24 pointer-events-none"></div>
        </div>
      )}
    </div>
  );
};

export default MiniGame;

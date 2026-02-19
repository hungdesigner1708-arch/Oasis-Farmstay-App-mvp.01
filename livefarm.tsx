
import React from 'react';
import { Video, Camera, UserCheck, Eye, Activity } from 'lucide-react';

const LiveFarm: React.FC = () => {
  const cameras = [
    { id: 'cam1', name: 'Oasis Vườn Dưa A1', type: 'AI Counting', status: 'Online', overlay: '1,245 Trái dưa' },
    { id: 'cam2', name: 'Oasis Chuồng Gà #109', type: 'Motion Tracking', status: 'Online', overlay: '852 Cá thể' },
    { id: 'cam3', name: 'Bờ Biển Oasis Resort', type: 'Environment', status: 'Online', overlay: 'Gió: 12km/h' },
    { id: 'cam4', name: 'Oasis Khu Nuôi Dông', type: 'Heatmap', status: 'Online', overlay: 'Nhiệt độ cát: 34°C' },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-700 pb-24 md:pb-8">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-strong text-[#1b4332]">Camera AI Oasis</h2>
          <p className="text-slate-500 italic mt-1">Giám sát Oasis trực tiếp theo thời gian thực.</p>
        </div>
        <div className="hidden md:flex items-center gap-4">
          <span className="flex items-center gap-2 text-xs font-bold text-emerald-600">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
            OASIS SYSTEMS ACTIVE
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {cameras.map((cam) => (
          <div key={cam.id} className="relative aspect-video rounded-[2.5rem] overflow-hidden shadow-2xl bg-slate-900 group">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1574943328124-5d452439f170?auto=format&fit=crop&q=80&w=1000')] bg-cover bg-center opacity-60"></div>
            
            {/* AI HUD Overlay */}
            <div className="absolute inset-0 p-8 flex flex-col justify-between z-10">
              <div className="flex justify-between items-start">
                <div className="bg-black/50 backdrop-blur px-4 py-2 rounded-2xl flex items-center gap-3">
                  <Video className="w-4 h-4 text-[#e9c46a]" />
                  <span className="text-xs font-bold text-white uppercase tracking-widest">{cam.name}</span>
                </div>
                <div className="bg-red-600 px-3 py-1 rounded-full text-[10px] font-bold text-white flex items-center gap-2">
                  <span className="w-2 h-2 bg-white rounded-full"></span> LIVE
                </div>
              </div>

              <div className="flex justify-between items-end">
                <div className="space-y-2">
                  <div className="bg-emerald-500/20 backdrop-blur border border-emerald-500/50 px-3 py-1.5 rounded-xl flex items-center gap-2 text-emerald-400">
                    <Activity className="w-3 h-3" />
                    <span className="text-[10px] font-black uppercase">{cam.type}</span>
                  </div>
                  <div className="text-white">
                    <p className="text-[10px] font-bold opacity-50 uppercase tracking-tighter">AI Detection Result</p>
                    <p className="text-xl font-strong">{cam.overlay}</p>
                  </div>
                </div>
                <button className="bg-white/20 backdrop-blur hover:bg-white/30 p-4 rounded-full transition-all">
                  <Eye className="w-6 h-6 text-white" />
                </button>
              </div>
            </div>

            {/* AI Scanline Effect */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#e9c46a]/50 to-transparent animate-[scan_3s_linear_infinite] shadow-[0_0_15px_#e9c46a]"></div>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes scan {
          0% { top: 0; }
          100% { top: 100%; }
        }
      `}</style>
    </div>
  );
};

export default LiveFarm;

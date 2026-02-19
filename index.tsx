
import react from 'react';
import { createRoot } from 'react-dom/client';
import oasisai from './oasisai'; // Gọi trực tiếp file oasisai.tsx
// Chú ý: Nếu bạn không có file index.css, hãy xóa dòng dưới đây
// import './index.css'; 

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(
    <React.StrictMode>
      <OasisAI />
    </React.StrictMode>
  );
}

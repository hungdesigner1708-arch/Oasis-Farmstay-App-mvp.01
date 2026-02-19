
import React from 'react';
import { createRoot } from 'react-dom/client';
import OasisAI from './oasisai'; // Gọi trực tiếp oasisai.tsx của bạn

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(
    <React.StrictMode>
      <OasisAI />
    </React.StrictMode>
  );
}

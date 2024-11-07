import React from 'react';
import { Scene } from './components/Scene';
import { AIReport } from './components/AIReport';

function App() {
  return (
    <div className="w-full h-screen bg-black">
      <Scene />
      <AIReport />
    </div>
  );
}

export default App;
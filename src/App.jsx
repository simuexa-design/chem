import React, { useState } from 'react'
import Home from './components/Home'
import StateSelector from './components/StateSelector'
import QualityDashboard from './components/QualityDashboard'

function App() {
  const [view, setView] = useState('home'); // 'home' or 'dashboard'
  const [selectedState, setSelectedState] = useState(null);

  if (view === 'home') {
    return <Home onStart={() => setView('dashboard')} />;
  }

  return (
    <>
      <div className="title-container" style={{ position: 'relative' }}>
        <button
          onClick={() => setView('home')}
          className="back-button"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
          Back
        </button>
        <h1 className="title">ChemScan v3.1</h1>
        <p className="subtitle">
          Real-time Environmental Chemistry Analysis. Select an Indian state below to view its atmospheric, aquatic, and geological chemical profile.
        </p>
      </div>

      <StateSelector
        selectedState={selectedState}
        onStateChange={setSelectedState}
      />

      {!selectedState && (
        <div style={{ marginTop: '2rem', width: '100%', animation: 'fadeInDown 0.8s ease-out' }}>
          <div style={{ position: 'relative', width: '100%', height: '65vh', borderRadius: '24px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.2)', boxShadow: '0 16px 64px rgba(0,255,204,0.15)' }}>
            <img src="/terrain.png" alt="Terrain Analysis" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.85 }} />
            <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'radial-gradient(circle, rgba(0,0,0,0) 0%, rgba(0,0,0,0.85) 100%)' }}>
              <h3 style={{ color: '#00ffcc', margin: '1.5rem 0 0 0', fontSize: '2.5rem', textShadow: '0 0 20px rgba(0,255,204,0.8)' }}>Awaiting State Selection...</h3>
              <p style={{ color: '#f0f6fc', fontSize: '1.2rem', marginTop: '0.8rem', opacity: 0.8 }}>Please select an Indian region to deploy geographical chemistry analysis.</p>
            </div>
          </div>
        </div>
      )}

      <QualityDashboard stateData={selectedState} />
    </>
  )
}

export default App

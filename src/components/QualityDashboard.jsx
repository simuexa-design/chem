import React from 'react';

export default function QualityDashboard({ stateData }) {
  if (!stateData) return null;

  const { air, water, soil } = stateData;

  const getAqiStatus = (aqi) => {
    if (aqi <= 50) return { label: 'Good', className: 'status-good' };
    if (aqi <= 100) return { label: 'Moderate', className: 'status-moderate' };
    return { label: 'Poor', className: 'status-poor' };
  };

  const getPhStatus = (ph) => {
    if (ph >= 6.5 && ph <= 8.5) return { label: 'Optimal', className: 'status-good' };
    return { label: 'Sub-optimal', className: 'status-moderate' };
  };

  const aqiStatus = getAqiStatus(air.aqi);
  const phStatus = getPhStatus(water.ph);

  return (
    <>
      <div className="glass-panel" style={{ padding: '1.5rem', marginTop: '3rem', display: 'flex', gap: '2rem', animation: 'fadeInDown 0.6s ease-out', position: 'relative', zIndex: 10, flexWrap: 'wrap' }}>
        {stateData.imageUrl && (
          <img 
            src={stateData.imageUrl} 
            alt={stateData.name} 
            style={{ width: '300px', height: '200px', objectFit: 'cover', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }} 
          />
        )}
        <div style={{ flex: 1, minWidth: '300px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>{stateData.name}</h2>
          <p style={{ color: '#bdc3c7', lineHeight: '1.7', fontSize: '1.1rem', margin: 0 }}>
            {stateData.wikiInfo}
          </p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem', marginTop: '2rem', width: '100%', animation: 'fadeInDown 0.8s ease-out' }}>
        {stateData.cityHighlight && (
          <div className="glass-panel" style={{ padding: '1.5rem', borderLeft: '4px solid #00ffcc' }}>
            <h3 style={{ color: '#00ffcc', marginBottom: '0.8rem', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.3rem' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
              City Highlight: {stateData.cityHighlight.name}
            </h3>
            <p style={{ color: '#f0f6fc', lineHeight: '1.6', fontSize: '1.05rem', margin: 0 }}>
              {stateData.cityHighlight.note}
            </p>
          </div>
        )}

        {stateData.agricultureNote && (
          <div className="glass-panel" style={{ padding: '1.5rem', borderLeft: '4px solid #f2c94c' }}>
            <h3 style={{ color: '#f2c94c', marginBottom: '0.8rem', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.3rem' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
              Agricultural Impact
            </h3>
            <p style={{ color: '#f0f6fc', lineHeight: '1.6', fontSize: '1.05rem', margin: 0 }}>
              {stateData.agricultureNote}
            </p>
          </div>
        )}
      </div>

      <div className="dashboard-grid glass-panel" style={{ padding: '2rem', marginTop: '2rem', width: '100%' }}>
      
      {/* Air Quality Card */}
      <div className="quality-card glass-panel air">
        <h3 className="card-header">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2"/></svg>
          Air Quality
        </h3>
        <div className="data-row">
          <span className="data-label">AQI (Index)</span>
          <span className="data-value" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {air.aqi} <span className={`status-badge ${aqiStatus.className}`}>{aqiStatus.label}</span>
          </span>
        </div>
        <div className="data-row">
          <span className="data-label">PM2.5 Level</span>
          <span className="data-value">{air.pm25} µg/m³</span>
        </div>
        <div className="data-row">
          <span className="data-label">PM10 Level</span>
          <span className="data-value">{air.pm10} µg/m³</span>
        </div>
        <div className="data-row">
          <span className="data-label">Key Pollutant</span>
          <span className="data-value" style={{ color: '#ff6b6b' }}>{air.pollutant}</span>
        </div>
      </div>

      {/* Water Quality Card */}
      <div className="quality-card glass-panel water">
        <h3 className="card-header">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/></svg>
          Water Quality
        </h3>
        <div className="data-row">
          <span className="data-label">pH Level</span>
          <span className="data-value" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {water.ph} <span className={`status-badge ${phStatus.className}`}>{phStatus.label}</span>
          </span>
        </div>
        <div className="data-row">
          <span className="data-label">Turbidity (NTU)</span>
          <span className="data-value">{water.turbidity}</span>
        </div>
        <div className="data-row">
          <span className="data-label">Dissolved Oxygen</span>
          <span className="data-value">{water.do} mg/L</span>
        </div>
        <div className="data-row">
          <span className="data-label">Total Dissolved Solids</span>
          <span className="data-value">{water.tds} ppm</span>
        </div>
      </div>

      {/* Soil Quality Card */}
      <div className="quality-card glass-panel soil">
        <h3 className="card-header">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"/></svg>
          Soil / Sand Quality
        </h3>
        <div className="data-row">
          <span className="data-label">Dominant Type</span>
          <span className="data-value">{soil.type}</span>
        </div>
        <div className="data-row">
          <span className="data-label">Soil pH</span>
          <span className="data-value">{soil.ph}</span>
        </div>
        <div className="data-row">
          <span className="data-label">Moisture Content</span>
          <span className="data-value" style={{ color: '#6ab04c' }}>{soil.moisture}</span>
        </div>
        <div className="data-row" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '0.5rem' }}>
          <span className="data-label">Key Minerals</span>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {soil.minerals.map(min => (
              <span key={min} className="status-badge" style={{ background: 'rgba(255, 255, 255, 0.1)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)'}}>
                {min}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Chemical Profile Card */}
      {stateData.chemicalProfile && (
        <div className="quality-card glass-panel chemistry">
          <h3 className="card-header" style={{ color: '#9b59b6' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
            Geological Chemistry
          </h3>
          <div className="data-row" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', alignItems: 'flex-start' }}>
            <span className="data-label">Abundant Natural Minerals</span>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {stateData.chemicalProfile.abundantMinerals.map(min => (
                <span key={min} className="status-badge" style={{ background: 'rgba(155, 89, 182, 0.2)', color: '#d2b4de', border: '1px solid rgba(155, 89, 182, 0.5)'}}>
                  {min}
                </span>
              ))}
            </div>
          </div>
          <div className="data-row" style={{ flexDirection: 'column', alignItems: 'flex-start', gap: '0.3rem' }}>
            <span className="data-label">Major Chemical Industries</span>
            <span className="data-value" style={{ fontSize: '0.95rem', color: '#bdc3c7', fontWeight: 400 }}>{stateData.chemicalProfile.chemicalIndustries}</span>
          </div>
        </div>
      )}

    </div>
    </>
  );
}

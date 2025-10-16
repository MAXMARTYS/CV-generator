import './App.css';
import { useState } from 'react';
import { uid } from './lib/ids';
import { LABELS } from './components/sections/labels';
import { SECTION_EDITORS } from './components/sections/registry';
import { SectionsList } from './components/sections/sectionsList'

function App() {

  const [sections, setSections] = useState([]);

  const addSection = kind => {
    const base = {id: uid(), kind};
    const withData = kind in SECTION_EDITORS ? {...base, items: []} : base; //It will be changed later
    setSections(prev => [...prev, withData]);
  };

  const removeSection = id => {
    setSections(prev => prev.filter(s => s.id !== id));
  };

  const updateSection = (id, updated) => {
    setSections(prev => prev.map(s => (s.id === id ? {...s, ...updated} : s)));
  };

  const buttons = [];
  for (let i=0; i<Object.keys(LABELS).length; i++){
    let sectionType = Object.keys(LABELS)[i];
    let sectionName = LABELS[sectionType];
    buttons.push(
    <button key={sectionType} disabled={sections.some(s => s.kind === sectionType)} style={{ padding: "6px 10px", borderRadius: 8, border: "1px solid #ccc" }} onClick={() => addSection(String(sectionType))} >
        {sectionName}
    </button>
  );
  }

  return (
    <div style={{maxWidth: 800, margin: '40px auto', fontFamily: 'system-ui, sans-serif'}}>
      <h1>CV Builder - Sections</h1>

      <div style={{display: 'flex', gap: 8, margin: '12px 0'}}>
        {buttons}
      </div>

      <SectionsList sections={sections} onRemove={removeSection} onChange={updateSection} />
    </div>
  );

}

export default App;

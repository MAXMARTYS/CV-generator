import { LABELS } from './labels';
import { SECTION_EDITORS } from './registry';

export function SectionsList({sections, onRemove, onChange}){

  if (sections.length === 0){
    return <p style={{opacity: 0.7}}>No sections yet.</p>
  }
  return (
    <ul style={{listStyle: 'none', padding: 0, margin: 0}}>
      {sections.map(section => {
        const Editor = SECTION_EDITORS[section.kind];
        return (
          <li key={section.id} style={{border: '1px solid #e5e7eb', borderRadius: 12, background: 'white', padding: 14, marginBottom: 8}}>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8}}>
              <strong>{LABELS[section.kind] || section.kind}</strong>
              <button onClick = {() => onRemove(section.id)}>Remove</button>
            </div>

            {Editor?(
              <Editor section={section} onChange={updated => onChange(section.id, updated)} />
            ) : (
              <em style={{opacity: 0.7}}>Editor coming soon</em>
            )}

          </li>
        );
      })}
    </ul>
  );
}
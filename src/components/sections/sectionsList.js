import { useEffect, useMemo, useState } from 'react';
import { LABELS } from './labels';
import { SECTION_EDITORS } from './registry';
import {
  DndContext, 
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable
} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';



function SortableSectionListItem({section, onRemove, onChange}) {

  const Editor = SECTION_EDITORS[section.kind];
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({id: section.id});
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  const stop = e => e.stopPropagation();

  return (
    <div ref={setNodeRef} style={style}>
      <li style={{border: '1px solid #e5e7eb', borderRadius: 12, background: 'white', padding: 14, marginBottom: 8}}>
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8}}>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <button
              aria-label='Drag to Reorder'
              {...attributes}
              {...listeners}
              style={{cursor: 'grab', border: '1px solid #e5e7eb', borderRadius: 8, background: '#f9fafb', padding: '4px 6px'}}
            >
              <span style={{fontFamily: 'monospace'}}>⋮⋮</span>
            </button>
            <strong>{LABELS[section.kind] || section.kind}</strong>
          </div>

          <button onClick = {e => {
              e.stopPropagation();
              onRemove(section.id);
            }}
            onPointerDown={stop}
            onMouseDown={stop}
            style={{ padding: '6px 10px', borderRadius: 8, border: '1px solid #e5e7eb', background: '#fff' }}
            > Remove</button>
        </div>
        
        <div onPointerDown={stop} onMouseDown={stop} onClick={stop}>
          <Editor section={section} onChange={updated => onChange(section.id, {...section, ...updated})} />
        </div>

      </li>
    </div>
  );
}



export function SectionsList({sections, onRemove, onChange}){

  const [items, setItems] = useState(() => sections.map(s => s.id));

  useEffect(() => {
    setItems(sections.map(s => s.id));
  }, [sections]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {distance: 5},
    }),
    useSensor(KeyboardSensor, {coordinateGetter: sortableKeyboardCoordinates})
    );

  const handleDragEnd = event => {
    const {active, over} = event;
    if (!over || active.id === over.id) return;

    setItems(items => {
      const oldIndex = items.indexOf(active.id);
      const newIndex = items.indexOf(over.id);
      return arrayMove(items, oldIndex, newIndex);
    });
    };

  const orderedSections = useMemo(
    () => items.map(id => sections.find(s => s.id === id)).filter(Boolean),
    [items, sections]
  );
  
  if (sections.length === 0){
    return <p style={{opacity: 0.7}}>No sections yet.</p>
  }

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={items} strategy={verticalListSortingStrategy}>
        <ul style={{listStyle: 'none', padding: 0, margin: 0}}>
          {orderedSections.map(section => (
            <SortableSectionListItem key={section.id} section={section} onChange={onChange} onRemove={onRemove}/>
            )
          )}
        </ul>
      </SortableContext>
    </DndContext>
  );

}
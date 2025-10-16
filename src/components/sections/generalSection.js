import { uid } from '../../lib/ids';
import { capitalizeFirstLetter } from '../../lib/utils';

export function GeneralSection({section, onChange}) {
    const items = section.items || [];

    const addItem = () => {
        // Name + number of features for each item
        const newItem = {
            id: uid(),
            title: '',
            body: ''
        };
        // Add new item to the existing list
        onChange({...section, items: [...items, newItem]});
    };

    const removeItem = id => {
        onChange({...section, items: items.filter(it => it.id !== id)})
    };

    const updateItem = (id, field, value) => {
        onChange({
            ...section,
            items: items.map(it => (it.id === id ? {...it, [field]: value} : it)) //And here
        });
    };

    return (
        <div>
            <button onClick={addItem} style={{marginBottom: 10}}>Add Item</button>

            {items.length === 0 && <p style={{opacity: 0.7}}>No items yet.</p>}

            <ul style={{listStyle: 'disc', paddingLeft: 20, margin: 0}}>
                {items.map(it => (
                    <li key={it.id} style={{marginBottom: 14}}>
                        <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 6}}>
                            {Object.keys(it).map(key => { 
                                if (key === 'id') return null;
                                return (
                                    <input
                                        placeholder={capitalizeFirstLetter(key)} 
                                        value={it[key]} 
                                        onChange={e => updateItem(it.id, key, e.target.value)}
                                    />)
                            })}
                        </div>
                        <button onClick={() => removeItem(it.id)}>Remove item</button>
                    </li>
                ))}
            </ul>

        </div>
    );
}

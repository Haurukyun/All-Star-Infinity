
import React, { useEffect } from 'react';
import { Theme } from '../types';
import { useTheme } from '../theme/ThemeContext';

const UNIFIED_THEMES = [
    { id: Theme.SONIC, label: 'SONIC' },
    { id: Theme.PERSONA, label: 'PERSONA' },
    { id: Theme.FALLOUT, label: 'FALLOUT' },
    { id: Theme.FNAF, label: 'FNAF' },
    { id: Theme.ANIMAL_CROSSING, label: 'ANIMAL' },
    { id: Theme.MINECRAFT, label: 'MC' },
    { id: Theme.KIRBY, label: 'KIRBY' },
    { id: Theme.POKEMON, label: 'PKMN' },
    { id: Theme.ARCANE, label: 'ARCANE' },
    { id: Theme.VOCALOID, label: 'VOCA' }
];

const ThemeSelector: React.FC = () => {
    const { setTheme, currentThemeDefinition } = useTheme();

    useEffect(() => {
        console.log('--- WEB THEME SELECTOR MOUNTED ---');
        console.log('ThemeSelector is mounting NOW (WEB)');
    }, []);

    return (
        <div style={{
            position: 'fixed',
            top: '40px',
            right: '20px',
            width: '220px',
            maxHeight: '500px',
            backgroundColor: 'red',
            borderRadius: '12px',
            border: '4px solid yellow',
            zIndex: 99999,
            padding: '10px',
            overflow: 'auto',
            display: 'flex',
            flexDirection: 'column',
            color: 'white',
            fontFamily: 'sans-serif'
        }}>
            <div style={{ marginBottom: '8px', borderBottom: '1px solid rgba(255,255,255,0.3)', paddingBottom: '4px' }}>
                <div style={{ fontSize: '14px', fontWeight: 'bold' }}>DEBUG SELECTOR (WEB)</div>
                <div style={{ fontSize: '12px', opacity: 0.8 }}>Active: {currentThemeDefinition.name}</div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {UNIFIED_THEMES.map((t) => (
                    <button
                        key={t.id}
                        onClick={() => {
                            console.log('Switching Web Theme:', t.label);
                            setTheme(t.id);
                        }}
                        style={{
                            padding: '10px',
                            borderRadius: '6px',
                            backgroundColor: currentThemeDefinition.id === t.id ? 'white' : 'rgba(255,255,255,0.1)',
                            color: currentThemeDefinition.id === t.id ? 'black' : 'white',
                            border: '1px solid rgba(255,255,255,0.2)',
                            fontSize: '14px',
                            fontWeight: currentThemeDefinition.id === t.id ? 'bold' : 'normal',
                            textAlign: 'left',
                            cursor: 'pointer'
                        }}
                    >
                        {t.label}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default ThemeSelector;

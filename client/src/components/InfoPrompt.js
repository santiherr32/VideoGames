import './InfoPrompt.css';
import { useState } from 'react';

function InfoPrompt({ visible, type, message, timeout }) {
    let promptColor, promptClass, titleColor = '';

    if (visible) promptClass = 'prompt-active';

    switch (type.toLowerCase()) {
        case 'error':
            promptColor = '#ff3d3ddc';
            titleColor = '#461111dc';
            break;
        default:
            promptColor = '#3d91ffdc';
            titleColor = '#1d1313';
            break;
    }
    return (
        <article className={`prompt ${promptClass}`} style={{ backgroundColor: promptColor }}>
            <header style={{ color: titleColor }}>
                <h2>
                    {type && (type.charAt(0).toUpperCase() + type.slice(1))}
                </h2>
            </header>
            <section>
                {message && message}
            </section>
        </article>
    )
}

export default InfoPrompt;
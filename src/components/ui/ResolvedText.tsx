import React from 'react';

/**
 * Props para el componente ResolvedText.
 */
interface ResolvedTextProps {
  text: string;
  className?: string;
}

/**
 * Convierte un texto con etiquetas <resolved>...</resolved> en elementos React
 * resaltados. Las etiquetas se eliminan y el contenido entre ellas se muestra
 * con un estilo de resaltado (amarillo/ámbar).
 *
 * Ejemplo:
 *   "Inflige +<resolved>15</resolved> % de daño..."
 *   → "Inflige +[15] % de daño..." con "15" resaltado.
 */
export const ResolvedText: React.FC<ResolvedTextProps> = ({ text, className = '' }) => {
  if (!text) return null;

  // Dividimos el texto conservando las etiquetas de apertura y cierre como delimitadores
  const parts = text.split(/(<resolved>|<\/resolved>)/);
  const result: React.ReactNode[] = [];
  let inResolved = false;
  let keyCounter = 0;

  for (const part of parts) {
    if (part === '<resolved>') {
      inResolved = true;
    } else if (part === '</resolved>') {
      inResolved = false;
    } else if (part) {
      // Si estamos dentro de una etiqueta resaltada, envolvemos el texto en un span amarillo
      if (inResolved) {
        result.push(
          <span key={keyCounter++} className="text-yellow-300 font-bold rounded">
            {part}
          </span>
        );
      } else {
        result.push(part);
      }
    }
  }

  return (
    <span className={className}>
      {result}
    </span>
  );
};

export default ResolvedText;
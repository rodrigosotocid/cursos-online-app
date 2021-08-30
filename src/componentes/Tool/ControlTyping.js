import { useState, useEffect } from 'react';

export default function ControlTyping(texto, delay) {
  const [textoValor, setTextoValor] = useState();

  useEffect(() => {

    const manejador = setTimeout(() => {
      setTextoValor(texto);
    }, delay);

    return () => {
      clearTimeout(manejador);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [texto])

  return textoValor;
}
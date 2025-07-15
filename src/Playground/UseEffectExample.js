import React, { useState, useEffect } from 'react';

 function UseEffectExample() {
  const [text, setText] = useState('');

  useEffect(() => {
    console.log('Texto actualizado:', text);
  }, [text]);

  return (
    <div>
      <h2>Escribe algo</h2>
      <input value={text} onChange={(e) => setText(e.target.value)} placeholder="Escribe algo..." />
    </div>
  );
}

export default UseEffectExample;
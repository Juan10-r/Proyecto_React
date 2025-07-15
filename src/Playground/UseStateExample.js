import React, { useState } from 'react';

 function UseStateExample() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h2>Contador con useState</h2>
      <p>Valor actual: {count}</p>
      <button onClick={() => setCount(count + 1)}>➕ Aumentar</button>
      <button onClick={() => setCount(count - 1)}>➖ Disminuir</button>
    </div>
  );
}

export default UseStateExample;
import React, { useState } from 'react';

// Spec Editor
const SpecEditor = ({ spec, updateState }) => {
  // local string version of the spec
  const [specString, setSpecString] = useState(JSON.stringify({}));
  React.useEffect(() => {
    setSpecString(JSON.stringify(spec) || JSON.stringify({}));
  }, [spec]);

  const evaluate = () => {
    try {
      const parsedSpec = JSON.parse(specString);
      updateState('spec', parsedSpec);
    } catch (error) {
      console.log('error', error);
    }
  };

  return (
    <div>
      <h2>Spec Editor</h2>
      <p>Enter the specification</p>
      <textarea
        value={specString}
        onChange={e => setSpecString(e.target.value)}
      />
      <button onClick={e => evaluate()}>Evaluate</button>
    </div>
  );
};

export default SpecEditor;

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
      <h2>Specification Editor</h2>
      <textarea
        cols="100"
        rows="10"
        value={specString}
        onChange={e => setSpecString(e.target.value)}
      />
      <p>
        <button onClick={e => evaluate()}>Evaluate</button>
      </p>
    </div>
  );
};

export default SpecEditor;

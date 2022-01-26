import React, { useState } from 'react';

import JSONInput from 'react-json-editor-ajrm';
import locale from 'react-json-editor-ajrm/locale/en';

// Spec Editor
const SpecEditor = ({ spec, updateState }) => {
  // local string version of the spec
  const [localSpec, setLocalSpec] = useState(JSON.stringify({}));
  React.useEffect(() => {
    setLocalSpec(spec);
  }, [spec]);

  const evaluate = () => {
    try {
      updateState('spec', localSpec);
    } catch (error) {
      console.log('error', error);
    }
  };

  return (
    <div>
      <h2>Specification Editor</h2>
      <p>
        <button onClick={e => evaluate()}>Update</button>
      </p>
      <JSONInput
        placeholder={spec}
        onChange={value => {
          setLocalSpec(value.jsObject);
        }}
        locale={locale}
        theme="light_mitsuketa_tribute"
        style={{
          body: {
            fontSize: '18px',
          },
        }}
      />
    </div>
  );
};

export default SpecEditor;

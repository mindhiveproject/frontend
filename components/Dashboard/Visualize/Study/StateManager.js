import { useState } from "react";
import styled from "styled-components";
import Render from "./Render";

const StyledRenderArea = styled.div`
  display: grid;
  grid-gap: 10px;
  .scripts {
    display: grid;
    grid-gap: 10px;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  }
  .figureArea {
    display: grid;
    padding: 20px;
    background: white;
  }
`;

const StyledScriptButton = styled.div`
  cursor: pointer;
  background: white;
  width: 100%;
  border-radius: 4px;
  padding: 1rem 2rem;
  border: 2px solid #007c70;
  font-size: 18px;
  line-height: 100%;
  letter-spacing: 0.05em;
  color: #007c70;
  background: ${(props) => props.isSelected && "yellow"};
`;

export default function StateManager({ data, variables, user, scripts }) {
  const [script, setScript] = useState(scripts[0]);
  const [spec, setSpec] = useState(
    scripts[0]?.content && JSON.parse(scripts[0]?.content)
  );

  const openScript = (script) => {
    setScript(script);
    setSpec(JSON.parse(script?.content));
  };

  return (
    <StyledRenderArea>
      <div className="scripts">
        {scripts.map((scr) => (
          <StyledScriptButton
            isSelected={scr?.id === script?.id}
            onClick={() => openScript(scr)}
          >
            <p>{scr?.title}</p>
          </StyledScriptButton>
        ))}
      </div>
      <div className="figureArea">
        <h2>{script?.title}</h2>
        <p>{script?.description}</p>
        <Render data={data} spec={spec} />
      </div>
    </StyledRenderArea>
  );
}

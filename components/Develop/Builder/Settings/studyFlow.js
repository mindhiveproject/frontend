import { Radio } from "semantic-ui-react";
import { StyledStudyFlow } from "./styles";

export default function StudyFlow({ study, updateComponents }) {
  const blocks = study?.components?.blocks || [];

  const updateBlockTitle = ({ id, title }) => {
    const newBlocks = blocks.map((block) => {
      if (block.blockId === id) {
        return { ...block, title };
      }
      return block;
    });
    const components = { blocks: [...newBlocks] };
    updateComponents(components);
  };

  const updateBlockStatus = ({ id, skip }) => {
    const newBlocks = blocks.map((block) => {
      if (block.blockId === id) {
        return { ...block, skip };
      }
      return block;
    });
    const components = { blocks: [...newBlocks] };
    updateComponents(components);
  };

  return (
    <StyledStudyFlow>
      {(!blocks || blocks?.length === 0) && (
        <p>No tests are found. Please save your study first.</p>
      )}

      {blocks?.length > 1 && <h2>Between-subjects conditions</h2>}
      {blocks.map((block, num) => (
        <div className="block" key={num}>
          <div className="blockHeader">
            <div className="buttons">
              <div className="toggleInfo">
                <Radio
                  toggle
                  checked={!block?.skip}
                  onChange={() => {
                    updateBlockStatus({
                      id: block.blockId,
                      skip: !block?.skip,
                    });
                  }}
                />
                <div>{block?.skip ? "OFF" : "ON"}</div>
              </div>
              <div
                className="deleteBtn"
                onClick={() => {
                  const title = prompt("Please enter a new title");
                  if (title != null) {
                    updateBlockTitle({
                      id: block.blockId,
                      title,
                    });
                  }
                }}
              >
                ✏️
              </div>
            </div>
            <div>
              <h2>{block?.title}</h2>
            </div>
            <div>
              <p>{block?.blockId}</p>
            </div>
          </div>

          {block?.tests.map((test, num) => (
            <div key={num} className="test">
              <div className="testHeader">
                <span className="title">{test?.title}</span>
                <span className="subtitle">{test?.subtitle}</span>
                <span className="id">{test?.testId}</span>
              </div>
            </div>
          ))}
        </div>
      ))}
    </StyledStudyFlow>
  );
}

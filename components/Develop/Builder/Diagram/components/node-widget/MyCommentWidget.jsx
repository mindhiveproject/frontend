import React from 'react';
import moment from 'moment';

export const MyCommentWidget = props => {
  const ref = React.useRef(null);

  const handleInput = e => {
    if (ref.current) {
      ref.current.style.height = 'auto';
      ref.current.style.height = `${e.target.scrollHeight + 10}px`;
    }
  };

  return (
    <div className="comment">
      <div
        className="comment-header-container"
        style={{ backgroundColor: props.node.color }}
      >
        <div className="comment-header-text">{props.node?.options?.author}</div>
        <div className="comment-header-text">
          {moment(props.node?.options?.time).fromNow()}
        </div>
      </div>

      <div className="comment-content">
        <textarea
          disabled={false}
          ref={ref}
          rows={1}
          placeholder="Enter text here..."
          onInput={handleInput}
          onFocus={() => {
            props.engine.getModel().setLocked(true); // lock the model
          }}
          onBlur={() => {
            if (props.node.options.content != ref.current.value) {
              props.node.options.time = Date.now();
            }
            props.node.options.content = ref.current.value;
            props.engine.getModel().setLocked(false); // unlock the model
          }}
          defaultValue={props.node?.options?.content}
        ></textarea>
      </div>
    </div>
  );
};

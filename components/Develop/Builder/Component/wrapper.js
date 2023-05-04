/* eslint-disable react/display-name */
import React from "react";
import ComponentModal from "./index";

const ComponentWrapper = React.memo((props) => (
  <ComponentModal
    user={props.user}
    componentID={props.componentID}
    closeModal={props.closeModal}
    updateCanvas={props.updateCanvas}
    isPreviewOpen={props.isPreviewOpen}
    isInfoOpen={props.isInfoOpen}
    isEditorOpen={props.isEditorOpen}
    node={props.node}
  />
));

export default ComponentWrapper;

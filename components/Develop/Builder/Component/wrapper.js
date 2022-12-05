/* eslint-disable react/display-name */
import React from 'react';
import ComponentModal from './index';

const ComponentWrapper = React.memo(props => (
  <ComponentModal
    user={props.user}
    componentID={props.componentID}
    isPreviewOpen={props.isPreviewOpen}
    isInfoOpen={props.isInfoOpen}
    closeModal={props.closeModal}
    updateCanvas={props.updateCanvas}
  />
));

export default ComponentWrapper;

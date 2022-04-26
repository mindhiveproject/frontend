import React from 'react';
import { Menu } from 'semantic-ui-react';

const MenuExampleAttached = ({ handleItemClick }) => (
  <div>
    <Menu attached="top">
      <Menu.Item name="myScripts" onClick={handleItemClick}>
        My scripts
      </Menu.Item>
      <Menu.Item name="templates" onClick={handleItemClick}>
        Templates
      </Menu.Item>
    </Menu>
  </div>
);

export default MenuExampleAttached;

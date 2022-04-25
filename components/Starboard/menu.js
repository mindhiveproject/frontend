import React from 'react';
import { Menu } from 'semantic-ui-react';

const MenuExampleAttached = ({ handleItemClick }) => (
  <div>
    <Menu attached="top">
      <Menu.Item name="open" onClick={handleItemClick}>
        Menu
      </Menu.Item>
    </Menu>
  </div>
);

export default MenuExampleAttached;

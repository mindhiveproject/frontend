import React, { Component } from 'react';
import Link from 'next/link';

import { Menu } from 'semantic-ui-react';
import { StyledNavigation } from './styles';

class Navigation extends Component {
  render() {
    const { tab } = this.props;

    return (
      <StyledNavigation>
        <Menu text stackable className="discoverMenu">
          <Menu.Item
            name="all"
            active={tab === 'all'}
            className={
              tab === 'all'
                ? 'discoverMenuTitle selectedMenuTitle'
                : 'discoverMenuTitle'
            }
          >
            <Link href="/dashboard/irb">All protocols</Link>
          </Menu.Item>

          <Menu.Item
            name="my"
            active={tab === 'my'}
            className={
              tab === 'my'
                ? 'discoverMenuTitle selectedMenuTitle'
                : 'discoverMenuTitle'
            }
          >
            <Link href="/dashboard/irb/my">My protocols</Link>
          </Menu.Item>

          <Menu.Item
            name="add"
            active={tab === 'add'}
            className={
              tab === 'add'
                ? 'discoverMenuTitle selectedMenuTitle'
                : 'discoverMenuTitle'
            }
          >
            <Link href="/dashboard/irb/add">Add new protocol</Link>
          </Menu.Item>
        </Menu>
      </StyledNavigation>
    );
  }
}

export default Navigation;

// <NavigationButtons>
//   <Link
//     href={{
//       pathname: '/dashboard/irb/all',
//     }}
//   >
//     <a>All IRB protocols</a>
//   </Link>
//   <Link
//     href={{
//       pathname: '/dashboard/irb/my',
//     }}
//   >
//     <a>My IRB protocol</a>
//   </Link>
//   <Link
//     href={{
//       pathname: '/dashboard/irb/add',
//     }}
//   >
//     <a>Add new protocol</a>
//   </Link>
// </NavigationButtons>

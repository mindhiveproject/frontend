import Link from 'next/link';
import { useRouter } from 'next/router';

import Signout from '../Signout/index';

import { Logo } from '../Header/styles';
import { StyledSidebar, NavLink } from './styles';

const SidebarNav = ({ user }) => {
  const router = useRouter();

  return (
    <StyledSidebar>
      <Logo>
        <Link href="/">
          <div className="logoInSidebar">
            <img src="/static/MindHive_logo.png" alt="icon" width="150" />
          </div>
        </Link>
      </Logo>

      <div className="navLinks">
        <Link href="/dashboard">
          <NavLink selected={router.pathname === '/dashboard'}>
            <div>
              <svg
                width="18"
                height="21"
                viewBox="0 0 18 21"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M17.0001 7.00001L11.0001 1.74001C10.4501 1.24805 9.73803 0.976074 9.00009 0.976074C8.26216 0.976074 7.55012 1.24805 7.00009 1.74001L1.00009 7.00001C0.682463 7.28408 0.428995 7.63256 0.256567 8.02225C0.0841385 8.41194 -0.00329256 8.83389 9.47941e-05 9.26001V18C9.47941e-05 18.7957 0.316165 19.5587 0.878775 20.1213C1.44138 20.6839 2.20445 21 3.00009 21H15.0001C15.7957 21 16.5588 20.6839 17.1214 20.1213C17.684 19.5587 18.0001 18.7957 18.0001 18V9.25001C18.0021 8.82557 17.9139 8.40555 17.7416 8.01769C17.5692 7.62983 17.3165 7.28296 17.0001 7.00001ZM11.0001 19H7.00009V14C7.00009 13.7348 7.10545 13.4804 7.29299 13.2929C7.48052 13.1054 7.73488 13 8.00009 13H10.0001C10.2653 13 10.5197 13.1054 10.7072 13.2929C10.8947 13.4804 11.0001 13.7348 11.0001 14V19ZM16.0001 18C16.0001 18.2652 15.8947 18.5196 15.7072 18.7071C15.5197 18.8946 15.2653 19 15.0001 19H13.0001V14C13.0001 13.2044 12.684 12.4413 12.1214 11.8787C11.5588 11.3161 10.7957 11 10.0001 11H8.00009C7.20444 11 6.44138 11.3161 5.87877 11.8787C5.31616 12.4413 5.00009 13.2044 5.00009 14V19H3.00009C2.73488 19 2.48052 18.8946 2.29299 18.7071C2.10545 18.5196 2.00009 18.2652 2.00009 18V9.25001C2.00027 9.10802 2.03069 8.9677 2.08931 8.83839C2.14794 8.70907 2.23343 8.59372 2.3401 8.50001L8.34009 3.25001C8.52258 3.08969 8.75719 3.00127 9.00009 3.00127C9.243 3.00127 9.47761 3.08969 9.66009 3.25001L15.6601 8.50001C15.7668 8.59372 15.8523 8.70907 15.9109 8.83839C15.9695 8.9677 15.9999 9.10802 16.0001 9.25001V18Z"
                  fill={
                    router.pathname === '/dashboard' ? '#ffc107' : '#666666'
                  }
                />
              </svg>
            </div>
            <div>Home</div>
          </NavLink>
        </Link>

        <Link href="/dashboard/discover">
          <NavLink selected={router.pathname === '/dashboard/discover'}>
            <div>
              <svg
                width="16"
                height="23"
                viewBox="0 0 16 23"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13.0899 2.82007C12.1702 2.06365 11.0933 1.5221 9.9376 1.23491C8.78194 0.947727 7.57674 0.922157 6.40994 1.16007C4.85632 1.47389 3.43093 2.24214 2.31462 3.36735C1.19832 4.49256 0.441414 5.924 0.139942 7.48007C-0.0802115 8.64679 -0.0402063 9.84772 0.257104 10.9972C0.554414 12.1467 1.1017 13.2164 1.85994 14.1301C2.56363 14.9241 2.96698 15.9396 2.99994 17.0001V20.0001C2.99994 20.7957 3.31601 21.5588 3.87862 22.1214C4.44123 22.684 5.20429 23.0001 5.99994 23.0001H9.99994C10.7956 23.0001 11.5587 22.684 12.1213 22.1214C12.6839 21.5588 12.9999 20.7957 12.9999 20.0001V17.1901C13.0335 16.0192 13.4637 14.8945 14.2199 14.0001C15.5451 12.3608 16.1697 10.2649 15.9581 8.16769C15.7465 6.0705 14.7158 4.14156 13.0899 2.80007V2.82007ZM10.9999 20.0001C10.9999 20.2653 10.8946 20.5196 10.707 20.7072C10.5195 20.8947 10.2652 21.0001 9.99994 21.0001H5.99994C5.73473 21.0001 5.48037 20.8947 5.29284 20.7072C5.1053 20.5196 4.99994 20.2653 4.99994 20.0001V19.0001H10.9999V20.0001ZM12.6699 12.7601C11.6644 13.9527 11.0778 15.4421 10.9999 17.0001H8.99994V14.0001C8.99994 13.7349 8.89458 13.4805 8.70705 13.293C8.51951 13.1054 8.26516 13.0001 7.99994 13.0001C7.73473 13.0001 7.48037 13.1054 7.29284 13.293C7.1053 13.4805 6.99994 13.7349 6.99994 14.0001V17.0001H4.99994C4.97356 15.4682 4.40689 13.9948 3.39994 12.8401C2.73558 12.0441 2.28883 11.0895 2.10325 10.0694C1.91767 9.04934 1.99959 7.99858 2.34103 7.0196C2.68247 6.04061 3.27176 5.16681 4.05146 4.48339C4.83116 3.79998 5.77465 3.33027 6.78994 3.12007C7.66249 2.94041 8.5641 2.95731 9.42931 3.16954C10.2945 3.38176 11.1016 3.78399 11.792 4.34702C12.4824 4.91005 13.0387 5.61975 13.4206 6.42459C13.8025 7.22943 14.0004 8.10921 13.9999 9.00007C14.0073 10.3699 13.537 11.6995 12.6699 12.7601Z"
                  fill={
                    router.pathname === '/dashboard/discover'
                      ? '#ffc107'
                      : '#666666'
                  }
                />
              </svg>
            </div>
            <div>Discover</div>
          </NavLink>
        </Link>

        <div className="workspaceHeader">WORKSPACE</div>

        {(user?.permissions.includes('ADMIN') ||
          user?.permissions.includes('SCIENTIST') ||
          user?.permissions.includes('TEACHER') ||
          user?.permissions.includes('STUDENT')) && (
          <Link href="/dashboard/develop">
            <NavLink selected={router.pathname === '/dashboard/develop'}>
              <div>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6.18 2H8.28C8.54522 2 8.79957 1.89464 8.98711 1.70711C9.17464 1.51957 9.28 1.26522 9.28 1C9.28 0.734784 9.17464 0.48043 8.98711 0.292893C8.79957 0.105357 8.54522 0 8.28 0H6.18C5.91478 0 5.66043 0.105357 5.47289 0.292893C5.28536 0.48043 5.18 0.734784 5.18 1C5.18 1.26522 5.28536 1.51957 5.47289 1.70711C5.66043 1.89464 5.91478 2 6.18 2ZM1 9.28C1.26522 9.28 1.51957 9.17464 1.70711 8.98711C1.89464 8.79957 2 8.54522 2 8.28V6.18C2 5.91478 1.89464 5.66043 1.70711 5.47289C1.51957 5.28536 1.26522 5.18 1 5.18C0.734784 5.18 0.48043 5.28536 0.292893 5.47289C0.105357 5.66043 0 5.91478 0 6.18V8.28C0 8.54522 0.105357 8.79957 0.292893 8.98711C0.48043 9.17464 0.734784 9.28 1 9.28ZM12.46 2C12.46 2.26522 12.5654 2.51957 12.7529 2.70711C12.9404 2.89464 13.1948 3 13.46 3C13.7252 3 13.9796 2.89464 14.1671 2.70711C14.3546 2.51957 14.46 2.26522 14.46 2V1C14.46 0.734784 14.3546 0.48043 14.1671 0.292893C13.9796 0.105357 13.7252 0 13.46 0H12.46C12.1948 0 11.9404 0.105357 11.7529 0.292893C11.5654 0.48043 11.46 0.734784 11.46 1C11.46 1.26522 11.5654 1.51957 11.7529 1.70711C11.9404 1.89464 12.1948 2 12.46 2ZM19 5.54H14.46C14.46 5.27478 14.3546 5.02043 14.1671 4.83289C13.9796 4.64536 13.7252 4.54 13.46 4.54C13.1948 4.54 12.9404 4.64536 12.7529 4.83289C12.5654 5.02043 12.46 5.27478 12.46 5.54H6.54C6.27478 5.54 6.02043 5.64536 5.83289 5.83289C5.64536 6.02043 5.54 6.27478 5.54 6.54V12.46C5.27478 12.46 5.02043 12.5654 4.83289 12.7529C4.64536 12.9404 4.54 13.1948 4.54 13.46C4.54 13.7252 4.64536 13.9796 4.83289 14.1671C5.02043 14.3546 5.27478 14.46 5.54 14.46V19C5.54 19.2652 5.64536 19.5196 5.83289 19.7071C6.02043 19.8946 6.27478 20 6.54 20H19C19.2652 20 19.5196 19.8946 19.7071 19.7071C19.8946 19.5196 20 19.2652 20 19V6.54C20 6.27478 19.8946 6.02043 19.7071 5.83289C19.5196 5.64536 19.2652 5.54 19 5.54ZM18 18H7.54V13.47V7.54H18V18ZM2 0H1C0.734784 0 0.48043 0.105357 0.292893 0.292893C0.105357 0.48043 0 0.734784 0 1V2C0 2.26522 0.105357 2.51957 0.292893 2.70711C0.48043 2.89464 0.734784 3 1 3C1.26522 3 1.51957 2.89464 1.70711 2.70711C1.89464 2.51957 2 2.26522 2 2C2.26522 2 2.51957 1.89464 2.70711 1.70711C2.89464 1.51957 3 1.26522 3 1C3 0.734784 2.89464 0.48043 2.70711 0.292893C2.51957 0.105357 2.26522 0 2 0ZM2 12.46C2 12.1948 1.89464 11.9404 1.70711 11.7529C1.51957 11.5654 1.26522 11.46 1 11.46C0.734784 11.46 0.48043 11.5654 0.292893 11.7529C0.105357 11.9404 0 12.1948 0 12.46V13.46C0 13.7252 0.105357 13.9796 0.292893 14.1671C0.48043 14.3546 0.734784 14.46 1 14.46H2C2.26522 14.46 2.51957 14.3546 2.70711 14.1671C2.89464 13.9796 3 13.7252 3 13.46C3 13.1948 2.89464 12.9404 2.70711 12.7529C2.51957 12.5654 2.26522 12.46 2 12.46Z"
                    fill={
                      router.pathname === '/dashboard/develop'
                        ? '#ffc107'
                        : '#666666'
                    }
                  />
                </svg>
              </div>
              <div>Develop</div>
            </NavLink>
          </Link>
        )}

        <Link href="/dashboard/participate">
          <NavLink selected={router.pathname === '/dashboard/participate'}>
            <div>
              <svg
                width="21"
                height="21"
                viewBox="0 0 21 21"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5.9917 12.502C5.86037 12.5019 5.73032 12.5278 5.60898 12.578C5.48764 12.6283 5.37739 12.7019 5.28452 12.7948C5.19166 12.8876 5.118 12.9979 5.06776 13.1192C5.01751 13.2406 4.99167 13.3706 4.9917 13.502V15.2843C3.70275 13.8266 2.99141 11.9478 2.9917 10.002C2.99152 9.70788 3.00913 9.41405 3.04443 9.12209C3.06062 8.99153 3.05089 8.85905 3.01579 8.73226C2.98069 8.60547 2.92092 8.48685 2.83989 8.3832C2.75887 8.27956 2.65818 8.19292 2.54361 8.12825C2.42904 8.06358 2.30284 8.02216 2.17223 8.00636C2.04162 7.99055 1.90918 8.00068 1.78249 8.03615C1.65581 8.07163 1.53736 8.13175 1.43396 8.21308C1.33055 8.29442 1.24421 8.39535 1.17988 8.51011C1.11555 8.62488 1.0745 8.7512 1.05908 8.88186C1.01379 9.2535 0.991286 9.62757 0.991705 10.002C0.993064 12.3881 1.85066 14.6946 3.40857 16.502H1.9917C1.72649 16.502 1.47213 16.6073 1.2846 16.7949C1.09706 16.9824 0.991705 17.2367 0.991705 17.502C0.991705 17.7672 1.09706 18.0215 1.2846 18.2091C1.47213 18.3966 1.72649 18.502 1.9917 18.502H5.9917C6.1481 18.5 6.30177 18.4607 6.4399 18.3873C6.57804 18.314 6.69664 18.2086 6.78583 18.0802C6.79749 18.0648 6.81238 18.0534 6.82324 18.0372C6.8299 18.0272 6.83008 18.0154 6.8363 18.0053C6.88396 17.9248 6.91967 17.8378 6.9423 17.747C6.95711 17.696 6.96762 17.6439 6.97373 17.5911C6.9766 17.5602 6.99173 17.5336 6.99173 17.502V13.502C6.99177 13.3707 6.96593 13.2406 6.91569 13.1193C6.86545 12.9979 6.79179 12.8877 6.69892 12.7948C6.60605 12.7019 6.49579 12.6283 6.37444 12.578C6.2531 12.5278 6.12304 12.5019 5.9917 12.502ZM7.4917 4.00197H5.70923C7.16704 2.71307 9.04583 2.00174 10.9917 2.00197C11.2856 2.00126 11.5793 2.01887 11.8711 2.05471C12.0015 2.07054 12.1338 2.06054 12.2603 2.02526C12.3869 1.98998 12.5053 1.93012 12.6087 1.8491C12.7121 1.76807 12.7986 1.66747 12.8631 1.55303C12.9277 1.4386 12.969 1.31257 12.9849 1.18215C13.0007 1.05172 12.9907 0.919455 12.9554 0.792898C12.9201 0.66634 12.8603 0.547971 12.7793 0.444548C12.6982 0.341125 12.5976 0.254673 12.4832 0.19013C12.3688 0.125586 12.2427 0.0842139 12.1123 0.0683759C11.7405 0.0235169 11.3662 0.00133933 10.9917 0.00196604C8.60557 0.00326316 6.29912 0.860797 4.49171 2.41866V1.00197C4.49171 0.73675 4.38635 0.482396 4.19881 0.294859C4.01128 0.107323 3.75692 0.00196604 3.49171 0.00196604C3.22649 0.00196604 2.97213 0.107323 2.7846 0.294859C2.59706 0.482396 2.4917 0.73675 2.4917 1.00197V5.00197C2.49799 5.06806 2.51117 5.13332 2.53101 5.19668L2.53125 5.1979C2.55554 5.32095 2.60348 5.43812 2.67242 5.5429L2.68384 5.5598C2.74992 5.6559 2.83274 5.73934 2.92834 5.80614C2.93927 5.81414 2.9447 5.8264 2.95605 5.83403C2.97034 5.84349 2.98652 5.84649 3.00111 5.85515C3.05782 5.88926 3.11791 5.91741 3.18042 5.93915C3.26491 5.96854 3.35299 5.98632 3.44226 5.992C3.45959 5.99292 3.47419 6.002 3.49171 6.002H7.4917C7.75692 6.002 8.01128 5.89664 8.19881 5.7091C8.38635 5.52157 8.4917 5.26721 8.4917 5.002C8.4917 4.73678 8.38635 4.48243 8.19881 4.29489C8.01128 4.10735 7.75692 4.002 7.4917 4.002V4.00197ZM19.4522 14.8061C19.4279 14.683 19.3799 14.5657 19.3109 14.461L19.2996 14.4442C19.2335 14.348 19.1506 14.2645 19.0549 14.1977C19.044 14.1898 19.0386 14.1775 19.0273 14.1699C19.0165 14.1627 19.0037 14.1625 18.9927 14.1558C18.8659 14.0853 18.7269 14.0393 18.583 14.0204C18.5514 14.0174 18.5241 14.0019 18.4917 14.0019H14.4917C14.2265 14.0019 13.9721 14.1073 13.7846 14.2948C13.5971 14.4823 13.4917 14.7367 13.4917 15.0019C13.4917 15.2671 13.5971 15.5215 13.7846 15.709C13.9721 15.8966 14.2265 16.0019 14.4917 16.0019H16.2741C14.8163 17.2908 12.9376 18.0022 10.9917 18.0019C10.6977 18.0023 10.404 17.9844 10.1123 17.9482C9.8489 17.9162 9.58358 17.9902 9.37471 18.1538C9.16583 18.3175 9.03052 18.5574 8.99854 18.8208C8.96655 19.0842 9.04051 19.3495 9.20415 19.5584C9.36778 19.7672 9.60769 19.9025 9.87109 19.9345C10.2429 19.9794 10.6172 20.0019 10.9917 20.0019C13.3778 20.0006 15.6843 19.1431 17.4917 17.5852V19.002C17.4917 19.2672 17.5971 19.5215 17.7846 19.7091C17.9721 19.8966 18.2265 20.002 18.4917 20.002C18.7569 20.002 19.0113 19.8966 19.1988 19.7091C19.3863 19.5215 19.4917 19.2672 19.4917 19.002V15.002C19.4854 14.9359 19.4722 14.8706 19.4524 14.8073L19.4522 14.8061ZM19.9917 3.50197C20.2569 3.50197 20.5113 3.39661 20.6988 3.20907C20.8863 3.02154 20.9917 2.76718 20.9917 2.50197C20.9917 2.23675 20.8863 1.9824 20.6988 1.79486C20.5113 1.60732 20.2569 1.50197 19.9917 1.50197H15.9917C15.9266 1.50824 15.8623 1.52121 15.7999 1.54067L15.7932 1.54201C15.6718 1.5663 15.5561 1.61367 15.4525 1.68154L15.4329 1.69478C15.3373 1.76075 15.2542 1.84331 15.1876 1.93856C15.1798 1.94936 15.1676 1.95467 15.1602 1.96584C15.153 1.97658 15.1528 1.98928 15.1461 2.0002C15.0747 2.12779 15.0284 2.26786 15.0097 2.41286C15.0068 2.44375 14.9917 2.47036 14.9917 2.50197V6.50197C14.9917 6.76718 15.0971 7.02154 15.2846 7.20907C15.4721 7.39661 15.7265 7.50197 15.9917 7.50197C16.2569 7.50197 16.5113 7.39661 16.6988 7.20907C16.8863 7.02154 16.9917 6.76718 16.9917 6.50197V4.71909C18.2806 6.17706 18.9919 8.05594 18.9917 10.0019C18.9919 10.296 18.9743 10.5898 18.939 10.8818C18.9073 11.145 18.9813 11.4101 19.1448 11.6188C19.3083 11.8275 19.5479 11.9628 19.811 11.9951C19.8516 11.9998 19.8923 12.0021 19.9331 12.0019C20.1773 12.0016 20.4129 11.9119 20.5955 11.7498C20.7781 11.5878 20.8951 11.3644 20.9243 11.122C20.9696 10.7504 20.9921 10.3763 20.9917 10.002C20.9903 7.61578 20.1327 5.30933 18.5747 3.50197H19.9917Z"
                  fill={
                    router.pathname === '/dashboard/participate'
                      ? '#ffc107'
                      : '#666666'
                  }
                />
              </svg>
            </div>
            <div>Participate</div>
          </NavLink>
        </Link>

        <Link href="/dashboard/review">
          <NavLink selected={router.pathname === '/dashboard/review'}>
            <div>
              <svg
                width="23"
                height="20"
                viewBox="0 0 23 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.90726 0H15.0229C17.1201 0 19.1314 0.833109 20.6144 2.31605C22.0973 3.799 22.9304 5.8103 22.9304 7.9075C22.9304 10.0047 22.0973 12.016 20.6144 13.4989C19.1314 14.9819 17.1201 15.815 15.0229 15.815H9.18529L3.69823 19.7477C3.46861 19.9123 3.19306 20.0006 2.91054 20C2.62802 19.9994 2.35283 19.9101 2.12386 19.7446C1.8949 19.5791 1.72375 19.3458 1.63461 19.0777C1.54547 18.8096 1.54285 18.5203 1.62712 18.2506L2.93699 14.0579C1.66521 13.03 0.743353 11.6332 0.298347 10.0597C-0.14666 8.48621 -0.0929279 6.81346 0.452147 5.27177C0.997223 3.73008 2.00683 2.39529 3.34196 1.45117C4.67708 0.507061 6.27206 6.61419e-05 7.90726 0ZM4.47714 12.9813L5.02565 13.353L3.71777 17.5395L8.61203 14.0315H15.0229C16.6471 14.0315 18.2048 13.3863 19.3533 12.2378C20.5017 11.0894 21.1469 9.53169 21.1469 7.9075C21.1469 6.28331 20.5017 4.72564 19.3533 3.57717C18.2048 2.42869 16.6471 1.78349 15.0229 1.78349H7.90726C6.5963 1.7836 5.31997 2.20437 4.26597 2.98392C3.21197 3.76347 2.43592 4.86066 2.05195 6.11413C1.66799 7.36761 1.69637 8.71121 2.13292 9.94735C2.56948 11.1835 3.39116 12.2469 4.47714 12.9813Z"
                  fill={
                    router.pathname === '/dashboard/review'
                      ? '#ffc107'
                      : '#666666'
                  }
                />
                <path
                  d="M5.41353 9.25109C4.67153 9.07593 4.21202 8.33242 4.38718 7.59042C4.56234 6.84842 5.30585 6.38891 6.04785 6.56407C6.78985 6.73923 7.24936 7.48274 7.0742 8.22474C6.89904 8.96674 6.15553 9.42625 5.41353 9.25109Z"
                  fill={
                    router.pathname === '/dashboard/review'
                      ? '#ffc107'
                      : '#666666'
                  }
                />
                <path
                  d="M10.4889 8.8837C9.94982 8.34461 9.94982 7.47057 10.4889 6.93148C11.028 6.39239 11.902 6.39239 12.4411 6.93148C12.9802 7.47057 12.9802 8.34461 12.4411 8.8837C11.902 9.42279 11.028 9.42279 10.4889 8.8837Z"
                  fill={
                    router.pathname === '/dashboard/review'
                      ? '#ffc107'
                      : '#666666'
                  }
                />
                <path
                  d="M16.8828 9.25109C16.1408 9.07593 15.6813 8.33242 15.8564 7.59042C16.0316 6.84842 16.7751 6.38891 17.5171 6.56407C18.2591 6.73923 18.7186 7.48274 18.5434 8.22474C18.3683 8.96674 17.6248 9.42625 16.8828 9.25109Z"
                  fill={
                    router.pathname === '/dashboard/review'
                      ? '#ffc107'
                      : '#666666'
                  }
                />
              </svg>
            </div>
            <div>Review</div>
          </NavLink>
        </Link>

        <Link href="/dashboard/journal">
          <NavLink selected={router.pathname === '/dashboard/journal'}>
            <div>
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15.2203 7.95676e-05C14.9832 0.00343913 14.757 0.0983468 14.59 0.2631L14.0484 0.792618C13.6555 0.575775 13.2068 0.446264 12.7274 0.446264H2.72818C1.23299 0.446264 0 1.65184 0 3.11379V17.3359C0 18.7979 1.23299 20 2.72818 20H12.7274C14.2226 20 15.4556 18.7979 15.4556 17.3359V9.4714L19.7338 5.28913C20.0887 4.94199 20.0887 4.37932 19.7338 4.03218L15.8782 0.2631C15.7045 0.0917957 15.467 -0.00314562 15.2203 7.95676e-05ZM15.2337 2.14938L17.8039 4.66239L13.6268 8.74658L9.07332 13.2023H6.49961V10.6858L11.0566 6.23357L15.2337 2.14938ZM2.72827 2.22497H12.5845L10.7681 4.00188C8.69453 4.00188 6.62094 4.00188 4.54735 4.00188C4.16469 3.99684 3.79503 4.25673 3.68176 4.61646C3.55408 4.98072 3.7061 5.4131 4.0351 5.62426C4.21686 5.75142 4.44297 5.78855 4.66099 5.77964C6.09063 5.77964 7.52027 5.77964 8.94991 5.77964L7.12905 7.55915C6.27796 7.55915 5.42686 7.55915 4.57576 7.55915C4.1931 7.55412 3.82344 7.81401 3.71016 8.17374C3.58248 8.538 3.73451 8.97037 4.06351 9.18154C4.24527 9.3087 4.47138 9.34582 4.6894 9.33692C4.89596 9.33692 5.10252 9.33692 5.30908 9.33692L4.94952 9.68848C4.77795 9.85528 4.68146 10.0821 4.68141 10.3187V14.0912C4.68291 14.5811 5.08949 14.9775 5.59051 14.9775H9.44885C9.6892 14.9772 9.91966 14.884 10.0898 14.718L13.6366 11.2501V17.336C13.6366 17.8438 13.2468 18.2258 12.7275 18.2258H2.72827C2.2089 18.2258 1.81917 17.8438 1.81917 17.336V3.11386C1.81917 2.60605 2.2089 2.22497 2.72827 2.22497Z"
                  fill={
                    router.pathname === '/dashboard/journal'
                      ? '#ffc107'
                      : '#666666'
                  }
                />
              </svg>
            </div>
            <div>Journal</div>
          </NavLink>
        </Link>

        {user?.permissions.includes('ADMIN') && (
          <>
            <div className="workspaceHeader">ADMIN</div>

            <Link href="/dashboard/messages">
              <NavLink selected={router.pathname === '/dashboard/messages'}>
                <div>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M17.0141 2.88324C17.0094 2.87857 17.0081 2.8719 17.0034 2.86724C16.9987 2.86257 16.9841 2.8559 16.9754 2.84857C15.1127 1.02271 12.6083 0 10 0C7.39166 0 4.8873 1.02271 3.02459 2.84857C3.01592 2.85657 3.00459 2.85924 2.99659 2.86724C2.98859 2.87524 2.99059 2.87857 2.98592 2.88324C2.04042 3.81166 1.2894 4.91918 0.776723 6.1411C0.264049 7.36303 0 8.67486 0 9.99998C0 11.3251 0.264049 12.6369 0.776723 13.8589C1.2894 15.0808 2.04042 16.1883 2.98592 17.1167C2.99059 17.1214 2.99192 17.1281 2.99659 17.1327C3.00125 17.1374 3.01592 17.1441 3.02459 17.1514C4.88741 18.9773 7.39188 20 10.0003 20C12.6088 20 15.1133 18.9773 16.9761 17.1514C16.9847 17.1434 16.9954 17.1407 17.0034 17.1327C17.0114 17.1247 17.0094 17.1214 17.0141 17.1167C17.9596 16.1883 18.7106 15.0808 19.2233 13.8589C19.736 12.6369 20 11.3251 20 9.99998C20 8.67486 19.736 7.36303 19.2233 6.1411C18.7106 4.91918 17.9596 3.81166 17.0141 2.88324ZM16.4801 15.7334C15.6425 15.0155 14.6919 14.4413 13.6667 14.034C13.8518 12.9204 13.9591 11.7952 13.988 10.6667H18.6328C18.4888 12.5456 17.7326 14.3254 16.4801 15.7334ZM1.36724 10.6667H6.01195C6.0402 11.7952 6.1469 12.9203 6.33129 14.034C5.30683 14.4415 4.35688 15.0157 3.51993 15.7334C2.26744 14.3254 1.51124 12.5456 1.36724 10.6667ZM3.51993 4.26658C4.35748 4.98445 5.30813 5.55866 6.33329 5.96594C6.14823 7.07959 6.04086 8.20476 6.01195 9.33331H1.36724C1.51124 7.45439 2.26744 5.67454 3.51993 4.26658ZM12.1334 5.05659C11.4366 5.23748 10.7199 5.33043 10 5.33326C9.28012 5.33043 8.56343 5.23748 7.86664 5.05659C8.41998 2.70257 9.30866 1.33322 10 1.33322C10.6913 1.33322 11.58 2.70257 12.1334 5.05659ZM12.2567 1.64256C13.4555 1.96479 14.5708 2.54142 15.5267 3.33324C14.8843 3.86677 14.168 4.30443 13.4 4.63259C13.1689 3.58536 12.7847 2.57788 12.26 1.64256H12.2567ZM7.34597 9.33331C7.36762 8.33934 7.45447 7.34787 7.60597 6.36528C8.38887 6.56209 9.19275 6.66327 10 6.66661C10.8075 6.66322 11.6116 6.56203 12.3947 6.36528C12.5456 7.34792 12.6323 8.33938 12.654 9.33331H7.34597ZM12.654 10.6667C12.6323 11.6606 12.5456 12.652 12.3947 13.6347C10.8237 13.2329 9.17693 13.2329 7.60597 13.6347C7.45447 12.6521 7.36762 11.6606 7.34597 10.6667H12.654ZM6.59996 4.63259C5.83205 4.30443 5.11571 3.86677 4.47327 3.33324C5.42857 2.54304 6.54267 1.96757 7.73997 1.64589C7.21557 2.58017 6.83146 3.58651 6.59996 4.63259ZM6.59996 15.366C6.83114 16.4133 7.21527 17.4208 7.73997 18.3561C6.54267 18.0344 5.42857 17.4589 4.47327 16.6687C5.11559 16.1345 5.83193 15.6962 6.59996 15.3674V15.366ZM7.86331 14.942C9.26388 14.5731 10.7361 14.5731 12.1367 14.942C11.58 17.2974 10.6913 18.6667 10 18.6667C9.30866 18.6667 8.41998 17.2974 7.86664 14.9434L7.86331 14.942ZM13.4 15.366C14.1682 15.6952 14.8845 16.134 15.5267 16.6687C14.5714 17.4589 13.4573 18.0344 12.26 18.3561C12.7846 17.4212 13.1687 16.4141 13.4 15.3674V15.366ZM13.988 9.33331C13.9591 8.20476 13.8518 7.07959 13.6667 5.96594C14.6919 5.55866 15.6425 4.98445 16.4801 4.26658C17.7326 5.67454 18.4888 7.45439 18.6328 9.33331H13.988Z"
                      fill={
                        router.pathname === '/dashboard/messages'
                          ? '#ffc107'
                          : '#666666'
                      }
                    />
                  </svg>
                </div>
                <div>Messages</div>
              </NavLink>
            </Link>

            <Link href="/dashboard/overview">
              <NavLink selected={router.pathname === '/dashboard/overview'}>
                <div>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M17.0141 2.88324C17.0094 2.87857 17.0081 2.8719 17.0034 2.86724C16.9987 2.86257 16.9841 2.8559 16.9754 2.84857C15.1127 1.02271 12.6083 0 10 0C7.39166 0 4.8873 1.02271 3.02459 2.84857C3.01592 2.85657 3.00459 2.85924 2.99659 2.86724C2.98859 2.87524 2.99059 2.87857 2.98592 2.88324C2.04042 3.81166 1.2894 4.91918 0.776723 6.1411C0.264049 7.36303 0 8.67486 0 9.99998C0 11.3251 0.264049 12.6369 0.776723 13.8589C1.2894 15.0808 2.04042 16.1883 2.98592 17.1167C2.99059 17.1214 2.99192 17.1281 2.99659 17.1327C3.00125 17.1374 3.01592 17.1441 3.02459 17.1514C4.88741 18.9773 7.39188 20 10.0003 20C12.6088 20 15.1133 18.9773 16.9761 17.1514C16.9847 17.1434 16.9954 17.1407 17.0034 17.1327C17.0114 17.1247 17.0094 17.1214 17.0141 17.1167C17.9596 16.1883 18.7106 15.0808 19.2233 13.8589C19.736 12.6369 20 11.3251 20 9.99998C20 8.67486 19.736 7.36303 19.2233 6.1411C18.7106 4.91918 17.9596 3.81166 17.0141 2.88324ZM16.4801 15.7334C15.6425 15.0155 14.6919 14.4413 13.6667 14.034C13.8518 12.9204 13.9591 11.7952 13.988 10.6667H18.6328C18.4888 12.5456 17.7326 14.3254 16.4801 15.7334ZM1.36724 10.6667H6.01195C6.0402 11.7952 6.1469 12.9203 6.33129 14.034C5.30683 14.4415 4.35688 15.0157 3.51993 15.7334C2.26744 14.3254 1.51124 12.5456 1.36724 10.6667ZM3.51993 4.26658C4.35748 4.98445 5.30813 5.55866 6.33329 5.96594C6.14823 7.07959 6.04086 8.20476 6.01195 9.33331H1.36724C1.51124 7.45439 2.26744 5.67454 3.51993 4.26658ZM12.1334 5.05659C11.4366 5.23748 10.7199 5.33043 10 5.33326C9.28012 5.33043 8.56343 5.23748 7.86664 5.05659C8.41998 2.70257 9.30866 1.33322 10 1.33322C10.6913 1.33322 11.58 2.70257 12.1334 5.05659ZM12.2567 1.64256C13.4555 1.96479 14.5708 2.54142 15.5267 3.33324C14.8843 3.86677 14.168 4.30443 13.4 4.63259C13.1689 3.58536 12.7847 2.57788 12.26 1.64256H12.2567ZM7.34597 9.33331C7.36762 8.33934 7.45447 7.34787 7.60597 6.36528C8.38887 6.56209 9.19275 6.66327 10 6.66661C10.8075 6.66322 11.6116 6.56203 12.3947 6.36528C12.5456 7.34792 12.6323 8.33938 12.654 9.33331H7.34597ZM12.654 10.6667C12.6323 11.6606 12.5456 12.652 12.3947 13.6347C10.8237 13.2329 9.17693 13.2329 7.60597 13.6347C7.45447 12.6521 7.36762 11.6606 7.34597 10.6667H12.654ZM6.59996 4.63259C5.83205 4.30443 5.11571 3.86677 4.47327 3.33324C5.42857 2.54304 6.54267 1.96757 7.73997 1.64589C7.21557 2.58017 6.83146 3.58651 6.59996 4.63259ZM6.59996 15.366C6.83114 16.4133 7.21527 17.4208 7.73997 18.3561C6.54267 18.0344 5.42857 17.4589 4.47327 16.6687C5.11559 16.1345 5.83193 15.6962 6.59996 15.3674V15.366ZM7.86331 14.942C9.26388 14.5731 10.7361 14.5731 12.1367 14.942C11.58 17.2974 10.6913 18.6667 10 18.6667C9.30866 18.6667 8.41998 17.2974 7.86664 14.9434L7.86331 14.942ZM13.4 15.366C14.1682 15.6952 14.8845 16.134 15.5267 16.6687C14.5714 17.4589 13.4573 18.0344 12.26 18.3561C12.7846 17.4212 13.1687 16.4141 13.4 15.3674V15.366ZM13.988 9.33331C13.9591 8.20476 13.8518 7.07959 13.6667 5.96594C14.6919 5.55866 15.6425 4.98445 16.4801 4.26658C17.7326 5.67454 18.4888 7.45439 18.6328 9.33331H13.988Z"
                      fill={
                        router.pathname === '/dashboard/overview'
                          ? '#ffc107'
                          : '#666666'
                      }
                    />
                  </svg>
                </div>
                <div>Overview</div>
              </NavLink>
            </Link>
            <Link href="/dashboard/proposal">
              <NavLink selected={router.pathname === '/dashboard/proposal'}>
                <div>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M18.0952 0H1.90476C0.854286 0 0 0.854286 0 1.90476V18.0952C0 19.1457 0.854286 20 1.90476 20H18.0952C19.1452 20 20 19.1457 20 18.0952V1.90476C20 0.854286 19.1452 0 18.0952 0ZM18.0952 7.61905H9.52381V1.90476H18.0952V7.61905ZM1.90476 1.90476H7.61905V18.0952H1.90476V1.90476ZM9.52381 18.0952V9.52381H18.0957L18.0962 18.0952H9.52381Z"
                      fill={
                        router.pathname === '/dashboard/proposal'
                          ? '#ffc107'
                          : '#666666'
                      }
                    />
                  </svg>
                </div>
                <div>Proposal</div>
              </NavLink>
            </Link>
            <Link href="/dashboard/management">
              <NavLink selected={router.pathname === '/dashboard/management'}>
                <div>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6.18 2H8.28C8.54522 2 8.79957 1.89464 8.98711 1.70711C9.17464 1.51957 9.28 1.26522 9.28 1C9.28 0.734784 9.17464 0.48043 8.98711 0.292893C8.79957 0.105357 8.54522 0 8.28 0H6.18C5.91478 0 5.66043 0.105357 5.47289 0.292893C5.28536 0.48043 5.18 0.734784 5.18 1C5.18 1.26522 5.28536 1.51957 5.47289 1.70711C5.66043 1.89464 5.91478 2 6.18 2ZM1 9.28C1.26522 9.28 1.51957 9.17464 1.70711 8.98711C1.89464 8.79957 2 8.54522 2 8.28V6.18C2 5.91478 1.89464 5.66043 1.70711 5.47289C1.51957 5.28536 1.26522 5.18 1 5.18C0.734784 5.18 0.48043 5.28536 0.292893 5.47289C0.105357 5.66043 0 5.91478 0 6.18V8.28C0 8.54522 0.105357 8.79957 0.292893 8.98711C0.48043 9.17464 0.734784 9.28 1 9.28ZM12.46 2C12.46 2.26522 12.5654 2.51957 12.7529 2.70711C12.9404 2.89464 13.1948 3 13.46 3C13.7252 3 13.9796 2.89464 14.1671 2.70711C14.3546 2.51957 14.46 2.26522 14.46 2V1C14.46 0.734784 14.3546 0.48043 14.1671 0.292893C13.9796 0.105357 13.7252 0 13.46 0H12.46C12.1948 0 11.9404 0.105357 11.7529 0.292893C11.5654 0.48043 11.46 0.734784 11.46 1C11.46 1.26522 11.5654 1.51957 11.7529 1.70711C11.9404 1.89464 12.1948 2 12.46 2ZM19 5.54H14.46C14.46 5.27478 14.3546 5.02043 14.1671 4.83289C13.9796 4.64536 13.7252 4.54 13.46 4.54C13.1948 4.54 12.9404 4.64536 12.7529 4.83289C12.5654 5.02043 12.46 5.27478 12.46 5.54H6.54C6.27478 5.54 6.02043 5.64536 5.83289 5.83289C5.64536 6.02043 5.54 6.27478 5.54 6.54V12.46C5.27478 12.46 5.02043 12.5654 4.83289 12.7529C4.64536 12.9404 4.54 13.1948 4.54 13.46C4.54 13.7252 4.64536 13.9796 4.83289 14.1671C5.02043 14.3546 5.27478 14.46 5.54 14.46V19C5.54 19.2652 5.64536 19.5196 5.83289 19.7071C6.02043 19.8946 6.27478 20 6.54 20H19C19.2652 20 19.5196 19.8946 19.7071 19.7071C19.8946 19.5196 20 19.2652 20 19V6.54C20 6.27478 19.8946 6.02043 19.7071 5.83289C19.5196 5.64536 19.2652 5.54 19 5.54ZM18 18H7.54V13.47V7.54H18V18ZM2 0H1C0.734784 0 0.48043 0.105357 0.292893 0.292893C0.105357 0.48043 0 0.734784 0 1V2C0 2.26522 0.105357 2.51957 0.292893 2.70711C0.48043 2.89464 0.734784 3 1 3C1.26522 3 1.51957 2.89464 1.70711 2.70711C1.89464 2.51957 2 2.26522 2 2C2.26522 2 2.51957 1.89464 2.70711 1.70711C2.89464 1.51957 3 1.26522 3 1C3 0.734784 2.89464 0.48043 2.70711 0.292893C2.51957 0.105357 2.26522 0 2 0ZM2 12.46C2 12.1948 1.89464 11.9404 1.70711 11.7529C1.51957 11.5654 1.26522 11.46 1 11.46C0.734784 11.46 0.48043 11.5654 0.292893 11.7529C0.105357 11.9404 0 12.1948 0 12.46V13.46C0 13.7252 0.105357 13.9796 0.292893 14.1671C0.48043 14.3546 0.734784 14.46 1 14.46H2C2.26522 14.46 2.51957 14.3546 2.70711 14.1671C2.89464 13.9796 3 13.7252 3 13.46C3 13.1948 2.89464 12.9404 2.70711 12.7529C2.51957 12.5654 2.26522 12.46 2 12.46Z"
                      fill={
                        router.pathname === '/dashboard/management'
                          ? '#ffc107'
                          : '#666666'
                      }
                    />
                  </svg>
                </div>
                <div>Management</div>
              </NavLink>
            </Link>
          </>
        )}
      </div>

      <div className="navBottomLinks">
        {user?.permissions.includes('TEACHER') && (
          <>
            <Link href="/dashboard/myclasses">
              <NavLink selected={router.pathname === '/dashboard/myclasses'}>
                <div>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                  >
                    <circle
                      cx="4.58333"
                      cy="4.58333"
                      r="3.58333"
                      stroke={
                        router.pathname === '/dashboard/myclasses'
                          ? '#ffc107'
                          : '#666666'
                      }
                      strokeWidth="2"
                    />
                    <circle
                      cx="15.4166"
                      cy="4.58333"
                      r="3.58333"
                      stroke={
                        router.pathname === '/dashboard/myclasses'
                          ? '#ffc107'
                          : '#666666'
                      }
                      strokeWidth="2"
                    />
                    <circle
                      cx="15.4166"
                      cy="15.4166"
                      r="3.58333"
                      stroke={
                        router.pathname === '/dashboard/myclasses'
                          ? '#ffc107'
                          : '#666666'
                      }
                      strokeWidth="2"
                    />
                    <circle
                      cx="4.58333"
                      cy="15.4166"
                      r="3.58333"
                      stroke={
                        router.pathname === '/dashboard/myclasses'
                          ? '#ffc107'
                          : '#666666'
                      }
                      strokeWidth="2"
                    />
                  </svg>
                </div>
                <div>My Classes</div>
              </NavLink>
            </Link>
          </>
        )}
        <Link href="/dashboard/settings">
          <NavLink selected={router.pathname === '/dashboard/settings'}>
            <div>
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M19.32 7.55L17.43 6.92L18.32 5.14C18.4102 4.95369 18.4404 4.74397 18.4064 4.53978C18.3723 4.33558 18.2758 4.14699 18.13 4L16 1.87C15.8522 1.72209 15.6618 1.62421 15.4555 1.59013C15.2493 1.55605 15.0375 1.58748 14.85 1.68L13.07 2.57L12.44 0.680003C12.3735 0.482996 12.2472 0.311629 12.0787 0.189751C11.9102 0.0678737 11.7079 0.00154767 11.5 3.33354e-06H8.5C8.29036 -0.000537828 8.08585 0.0648223 7.91537 0.186845C7.7449 0.308868 7.61709 0.481382 7.55 0.680003L6.92 2.57L5.14 1.68C4.95369 1.58978 4.74397 1.55961 4.53978 1.59364C4.33558 1.62767 4.14699 1.72423 4 1.87L1.87 4C1.72209 4.14777 1.62421 4.33818 1.59013 4.54446C1.55605 4.75074 1.58748 4.96251 1.68 5.15L2.57 6.93L0.680003 7.56C0.482996 7.62654 0.311629 7.75283 0.189751 7.92131C0.0678737 8.08979 0.00154767 8.29207 3.33354e-06 8.5V11.5C-0.000537828 11.7096 0.0648223 11.9142 0.186845 12.0846C0.308868 12.2551 0.481382 12.3829 0.680003 12.45L2.57 13.08L1.68 14.86C1.58978 15.0463 1.55961 15.256 1.59364 15.4602C1.62767 15.6644 1.72423 15.853 1.87 16L4 18.13C4.14777 18.2779 4.33818 18.3758 4.54446 18.4099C4.75074 18.444 4.96251 18.4125 5.15 18.32L6.93 17.43L7.56 19.32C7.62709 19.5186 7.7549 19.6911 7.92537 19.8132C8.09585 19.9352 8.30036 20.0005 8.51 20H11.51C11.7196 20.0005 11.9242 19.9352 12.0946 19.8132C12.2651 19.6911 12.3929 19.5186 12.46 19.32L13.09 17.43L14.87 18.32C15.0551 18.4079 15.2628 18.4369 15.4649 18.4029C15.667 18.3689 15.8538 18.2737 16 18.13L18.13 16C18.2779 15.8522 18.3758 15.6618 18.4099 15.4555C18.444 15.2493 18.4125 15.0375 18.32 14.85L17.43 13.07L19.32 12.44C19.517 12.3735 19.6884 12.2472 19.8103 12.0787C19.9321 11.9102 19.9985 11.7079 20 11.5V8.5C20.0005 8.29036 19.9352 8.08585 19.8132 7.91537C19.6911 7.7449 19.5186 7.61709 19.32 7.55ZM18 10.78L16.8 11.18C16.5241 11.2695 16.2709 11.418 16.0581 11.6151C15.8452 11.8122 15.6778 12.0533 15.5675 12.3216C15.4571 12.5899 15.4064 12.879 15.419 13.1688C15.4315 13.4586 15.5069 13.7422 15.64 14L16.21 15.14L15.11 16.24L14 15.64C13.7436 15.5122 13.4627 15.4411 13.1763 15.4313C12.89 15.4215 12.6049 15.4734 12.3403 15.5834C12.0758 15.6934 11.8379 15.8589 11.6429 16.0688C11.4479 16.2787 11.3003 16.5281 11.21 16.8L10.81 18H9.22L8.82 16.8C8.73049 16.5241 8.58203 16.2709 8.3849 16.0581C8.18778 15.8452 7.94671 15.6778 7.67842 15.5675C7.41014 15.4571 7.12105 15.4064 6.83123 15.419C6.5414 15.4315 6.25777 15.5069 6 15.64L4.86 16.21L3.76 15.11L4.36 14C4.4931 13.7422 4.56852 13.4586 4.58105 13.1688C4.59358 12.879 4.5429 12.5899 4.43254 12.3216C4.32218 12.0533 4.15478 11.8122 3.94195 11.6151C3.72912 11.418 3.47595 11.2695 3.2 11.18L2 10.78V9.22L3.2 8.82C3.47595 8.73049 3.72912 8.58203 3.94195 8.3849C4.15478 8.18778 4.32218 7.94671 4.43254 7.67842C4.5429 7.41014 4.59358 7.12105 4.58105 6.83123C4.56852 6.5414 4.4931 6.25777 4.36 6L3.79 4.89L4.89 3.79L6 4.36C6.25777 4.4931 6.5414 4.56852 6.83123 4.58105C7.12105 4.59358 7.41014 4.5429 7.67842 4.43254C7.94671 4.32218 8.18778 4.15478 8.3849 3.94195C8.58203 3.72912 8.73049 3.47595 8.82 3.2L9.22 2H10.78L11.18 3.2C11.2695 3.47595 11.418 3.72912 11.6151 3.94195C11.8122 4.15478 12.0533 4.32218 12.3216 4.43254C12.5899 4.5429 12.879 4.59358 13.1688 4.58105C13.4586 4.56852 13.7422 4.4931 14 4.36L15.14 3.79L16.24 4.89L15.64 6C15.5122 6.25645 15.4411 6.53735 15.4313 6.82369C15.4215 7.11003 15.4734 7.39513 15.5834 7.65969C15.6934 7.92424 15.8589 8.16207 16.0688 8.35708C16.2787 8.5521 16.5281 8.69973 16.8 8.79L18 9.19V10.78ZM10 6C9.20888 6 8.43552 6.2346 7.77772 6.67413C7.11993 7.11365 6.60724 7.73836 6.30448 8.46927C6.00173 9.20017 5.92252 10.0044 6.07686 10.7804C6.2312 11.5563 6.61217 12.269 7.17158 12.8284C7.73099 13.3878 8.44372 13.7688 9.21964 13.9231C9.99557 14.0775 10.7998 13.9983 11.5307 13.6955C12.2616 13.3928 12.8864 12.8801 13.3259 12.2223C13.7654 11.5645 14 10.7911 14 10C14 8.93914 13.5786 7.92172 12.8284 7.17158C12.0783 6.42143 11.0609 6 10 6ZM10 12C9.60444 12 9.21776 11.8827 8.88886 11.6629C8.55996 11.4432 8.30362 11.1308 8.15224 10.7654C8.00087 10.3999 7.96126 9.99778 8.03843 9.60982C8.1156 9.22186 8.30608 8.86549 8.58579 8.58579C8.86549 8.30608 9.22186 8.1156 9.60982 8.03843C9.99778 7.96126 10.3999 8.00087 10.7654 8.15224C11.1308 8.30362 11.4432 8.55996 11.6629 8.88886C11.8827 9.21776 12 9.60444 12 10C12 10.5304 11.7893 11.0391 11.4142 11.4142C11.0391 11.7893 10.5304 12 10 12Z"
                  fill={
                    router.pathname === '/dashboard/settings'
                      ? '#ffc107'
                      : '#666666'
                  }
                />
              </svg>
            </div>
            <div>Settings</div>
          </NavLink>
        </Link>
        <Signout />
      </div>
    </StyledSidebar>
  );
};

export default SidebarNav;

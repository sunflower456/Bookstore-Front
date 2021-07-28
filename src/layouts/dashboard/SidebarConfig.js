import { Icon } from '@iconify/react';
import peopleFill from '@iconify/icons-eva/people-fill';
import shoppingBagFill from '@iconify/icons-eva/shopping-bag-fill';
import fileTextFill from '@iconify/icons-eva/file-text-fill';
import lockFill from '@iconify/icons-eva/lock-fill';
import personAddFill from '@iconify/icons-eva/person-add-fill';

// ----------------------------------------------------------------------

const getIcon = (name) => <Icon icon={name} width={22} height={22} />;

const sidebarConfig = [
  {
    title: '내 정보',
    path: '/user',
    icon: getIcon(peopleFill)
  },
  {
    title: '구매 이력',
    path: '/purchase',
    icon: getIcon(shoppingBagFill)
  },
  {
    title: '판매 이력',
    path: '/sale',
    icon: getIcon(fileTextFill)
  },
  {
    title: '주문 정보',
    path: '/orders',
    icon: getIcon(lockFill)
  },
  {
    title: '장바구니',
    path: '/basket',
    icon: getIcon(personAddFill)
  }
];

export default sidebarConfig;
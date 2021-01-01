import { IS_DRAWER_OPEN } from './constants';

export function toggleOpenDrawer(drawerState) {
  return {
    type: IS_DRAWER_OPEN,
    drawerState
  };
}
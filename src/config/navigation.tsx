import { DashboardOutlined, WalletOutlined } from '@ant-design/icons';
export interface NavLink {
  name: string;
  label: string;
  link?: string;
  disable?: boolean;
  item?: NavLink[];
  icon?: React.ReactNode;
}

export const navigator: NavLink[] = [
  { label: 'dashboard', link: '/', name: '/', icon: <DashboardOutlined /> },
  {
    label: 'example',
    link: '/example',
    name: '/example',
    icon: <WalletOutlined />,
  },
];

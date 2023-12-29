import { IMenu, IPackage, TOKEN } from "@/_types_"

export const packages: IPackage[] = [
  {
    key: 'bnb-01',
    name: 'BUY WITH TBNB',
    amount: 1000,
    bg: 'bnb-bg.jpeg',
    icon: 'bnb.png',
    token: TOKEN.BNB,
  },
  {
    key: 'bnb-02',
    name: 'BUY WITH TBNB',
    amount: 2000,
    bg: 'bnb-bg.jpeg',
    icon: 'bnb.png',
    token: TOKEN.BNB,
  },
  {
    key: 'bnb-03',
    name: 'BUY WITH TBNB',
    amount: 3000,
    bg: 'bnb-bg.jpeg',
    icon: 'bnb.png',
    token: TOKEN.BNB,
  },

  {
    key: 'usdt-01',
    name: 'BUY WITH USDT',
    amount: 1000,
    bg: 'usdt-bg.png',
    icon: 'usdt.png',
    token: TOKEN.USDT,
  },
  {
    key: 'usdt-02',
    name: 'BUY WITH USDT',
    amount: 2000,
    bg: 'usdt-bg.png',
    icon: 'usdt.png',
    token: TOKEN.USDT,
  },
  {
    key: 'usdt-03',
    name: 'BUY WITH USDT',
    amount: 3000,
    bg: 'usdt-bg.png',
    icon: 'usdt.png',
    token: TOKEN.USDT,
  }
]

export const menus: IMenu[] = [
  {name: 'Invest', url: '/'},
  {name: 'Market', url: '/market'},
  {name: 'View', url: '/p2p'},
  {name: 'Auction', url: '/auction'},
  {name: 'Admin', url: '/control'}
]


import { Store } from '@/utils/Store';
import Head from 'next/head';
import Link from 'next/link';
import React, { useContext, useEffect, useState } from 'react';
import { Menu } from '@headlessui/react';
import Cookies from 'js-cookie';

export default function Layout({ title, children}) {

  const session = getCookies();
  console.log('session', session);
  const userinfo = session["userinfo"];
  console.log('session userinfo', userinfo);
  const name = userinfo ? userinfo["given_name"] : "Login";
  console.log('session name', name);

  const CART_URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/cart`;
  const { state } = useContext(Store);
  const { cart } = state;
  const [cartItemsCount, setCartItemsCount] = useState(0);
  useEffect(() => {
    setCartItemsCount(cart.cartItems.reduce((a, c) => a + c.quantity, 0));
  }, [cart.cartItems]);

  return <>
    <Head>
      <title>{title ? title + ' - SD' : 'SD'}</title>
      <meta name="description" content="Ecommerce Website" />
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <div className="flex min-h-screen flex-col justify-between ">
      <header>
        <nav className="flex h-12 items-center px-4 justify-between shadow-md">
          <Link href="/" className="text-lg font-bold">
            SDD
          </Link>
          <div>
            <Link href={CART_URL} passHref legacyBehavior className="p-2">
              <a className='p-2'>
              Cart
              {cartItemsCount > 0 && (
                <span className='ml-1 rounded-full bg-slate-500 px-2 py-1 text-xs font-bold text-white'>
                  {cartItemsCount}
                </span>
              )}
              </a>
            </Link>
            <Link href="/profile" className="p-2">
              <Menu as="div" className="relative inline-block text-left">
                <Menu.Button className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-slate-500 rounded-md hover:bg-slate-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                  <span>{name}</span>
                </Menu.Button>
                <Menu.Items className="absolute right-0 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="px-1 py-1 ">
                    <Menu.Item>
                      {({ active }) => (
                        <Link legacyBehavior href="/profile">
                          <a
                            className={`${
                              active ? 'bg-slate-500 text-white' : 'text-gray-900'
                            } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                          >
                            Profile
                          </a>
                        </Link>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <Link legacyBehavior href="/order-history">
                          <a
                            className={`${
                              active ? 'bg-slate-500 text-white' : 'text-gray-900'
                            } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                          >
                            Order History
                          </a>
                        </Link>
                      )}
                    </Menu.Item>
                  </div>
                  <div className="px-1 py-1">
                    <Menu.Item>
                      {({ active }) => (
                        <Link legacyBehavior href="/login">
                          <a
                            className={`${
                              active ? 'bg-slate-500 text-white' : 'text-gray-900'
                            } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                          >
                            Login
                          </a>
                        </Link>
                      )}
                    </Menu.Item>
                  </div>
                </Menu.Items>

              </Menu>
            </Link>
          </div>
        </nav>
      </header>
      <main className="container m-auto mt-4 px-4">{children}</main>
      <footer className="flex h-10 justify-center items-center shadow-inner">
        <p>Copyright © 2023 SD</p>
      </footer>
    </div>
  </>;
}

const getCookies = () => {
  const [parsedCookies, setParsedCookies] = useState('');

  useEffect(() => {
    const stringCookies = Cookies.get('session');
    const unescapeCookies = stringCookies.replace(/\\054/g, ',').replace(/\\\"/g, '"');

    try {
      const parsedCookies = JSON.parse(unescapeCookies);
      setParsedCookies(parsedCookies);
    } catch (error) {
      console.error('Error parsing cookies:', error);
    }
  }, []);

  console.log('Parsed cookies:', parsedCookies);
  return parsedCookies;
};


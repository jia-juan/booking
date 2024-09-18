'use client'

import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { BellIcon } from '@heroicons/react/24/outline'
import { USER_NAVIGATION } from './constants'
import classNamesActivate from '../../../lib/classNamesActivate'


export default function Userbar() {
    return (
      <div className="flex items-center gap-x-4 lg:gap-x-6">
        <button type="button" className="-m-2.5 p-2.5 text-gray-400 hover:text-gray-500">
          <span className="sr-only">檢視通知</span>
          <BellIcon aria-hidden="true" className="h-6 w-6" />
        </button>
  
        {/* 分隔線 */}
        <div aria-hidden="true" className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-200" />
  
        {/* 使用者下拉選單 */}
        <Menu as="div" className="relative">
          <MenuButton className="-m-1.5 flex items-center p-1.5">
            <span className="sr-only">開啟使用者選單</span>
            <img
              alt="用戶照片"
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              className="h-8 w-8 rounded-full bg-gray-50"
            />
            <span className="hidden lg:flex lg:items-center">
              <span aria-hidden="true" className="ml-4 text-sm font-semibold leading-6 text-gray-900">
                Tom Cook
              </span>
              <ChevronDownIcon aria-hidden="true" className="ml-2 h-5 w-5 text-gray-400" />
            </span>
          </MenuButton>
          <MenuItems
            className="absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 transition focus:outline-none"
          >
            {USER_NAVIGATION.map((item) => (
              <MenuItem key={item.name}>
                {({ active }) => (
                  <a
                    href={item.href}
                    className={classNamesActivate(
                      active ? 'bg-gray-50' : '',
                      'block px-3 py-1 text-sm leading-6 text-gray-900'
                    )}
                  >
                    {item.name}
                  </a>
                )}
              </MenuItem>
            ))}
          </MenuItems>
        </Menu>
      </div>
    )
  }
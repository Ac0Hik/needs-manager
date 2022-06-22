import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import {BiCategoryAlt} from "react-icons/bi";

export const AdminSidebarData = [
  {
    title: 'Home',
    path: '/',
    icon: <AiIcons.AiFillHome />,
    cName: 'nav-text'
  },
  {
    title: 'Profile ',
    path: 'profile',
    icon: <FaIcons.FaUserCircle />,
    cName: 'nav-text'
  },
  {
    title: 'Manage Users',
    path: 'users',
    icon: <FaIcons.FaUsersCog />,
    cName: 'nav-text'
  },
  {
    title: 'requests',
    path: 'requests',
    icon: <FaIcons.FaEnvelopeOpenText />,
    cName: 'nav-text'
  },
  
];

export const ManagerSidebarData = [
  {
    title: 'Home',
    path: '/',
    icon: <AiIcons.AiFillHome />,
    cName: 'nav-text'
  },
  {
    title: 'Profile ',
    path: 'profile',
    icon: <FaIcons.FaUserCircle />,
    cName: 'nav-text'
  },
  {
    title: 'Articles ',
    path: 'articles',
    icon: <IoIcons.IoIosPaper />,
    cName: 'nav-text'
  },
  {
    title: 'Categories',
    path: 'categories',
    icon: <BiCategoryAlt />,
    cName: 'nav-text'
  },
  
];

export const UserSidebarData = [
  {
    title: 'Home',
    path: '/',
    icon: <AiIcons.AiFillHome />,
    cName: 'nav-text'
  },
  {
    title: 'Event achik ',
    path: '/eventList',
    icon: <IoIcons.IoIosPaper />,
    cName: 'nav-text'
  },
  {
    title: 'Manage Users',
    path: "users",
    icon: <FaIcons.FaUsersCog />,
    cName: 'nav-text'
  },
  {
    title: 'professeurs',
    path: '/professeurs',
    icon: <IoIcons.IoMdPeople />,
    cName: 'nav-text'
  },
  {
    title: 'requested events',
    path: '/requestedEvents',
    icon: <FaIcons.FaEnvelopeOpenText />,
    cName: 'nav-text'
  },
  
];
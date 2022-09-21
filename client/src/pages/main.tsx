import React, { useState } from 'react';
import {
  AiFillPlusCircle,
  AiOutlineImport,
  AiOutlineLeft,
  AiOutlineMenu,
  AiOutlineTeam,
} from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Breadcrumb from '../components/Breadcrumb';
import ModalBox from '../components/Modal';
import { unassignUser } from '../reducers/userReducer';
import { AppRoutes } from '../routes/route';
import { RootState } from '../stores/store';
import { removeCookie } from '../utils/cookie';

function Main() {
  const { email, role } = useSelector((state: RootState) => state.user);
  const [active, setActive] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [breadcrumb, setBreadcrumb] = useState(['Dashboard', 'Customers']);
  const dispatch = useDispatch();
  const nav = useNavigate();

  const logoutHandler = () => {
    dispatch(unassignUser());
    removeCookie('token');
    localStorage.removeItem('email');
    localStorage.removeItem('role');
  };

  const showModalHandler = () => {
    showModal ? setShowModal(false) : setShowModal(true);
  };

  const changeRouteHandler = (index: number, route: string, name: string) => {
    breadcrumb.pop();
    setBreadcrumb([...breadcrumb, name]);
    setActive(index);
    nav(route);
  };

  const navList = [
    {
      name: 'Customers',
      icon: <AiOutlineTeam size={16} />,
      route: '/',
    },
    {
      name: 'Add New Customer',
      icon: <AiFillPlusCircle size={16} />,
      route: '/addNewCustomer',
    },
  ];

  const toggle = () => {
    showMenu ? setShowMenu(false) : setShowMenu(true);
  };

  return (
    <div className='main'>
      <div className={`side-nav ${showMenu ? 'mobile' : ''}`}>
        <div className='app-logo'>
          <p>CRM App</p>
          <div className='close-icon' onClick={toggle}>
            <AiOutlineLeft />
          </div>
        </div>
        <div className='navigation-title'>
          <p>Navigation</p>
        </div>
        <div className='navigation-list'>
          <ul>
            {navList.map((item, i) => {
              return (
                <li
                  key={i}
                  className={`${active === i && 'active'}`}
                  onClick={() => changeRouteHandler(i, item.route, item.name)}
                >
                  <span>{item.icon}</span>
                  {item.name}
                </li>
              );
            })}
            <li onClick={showModalHandler}>
              <span>
                <AiOutlineImport size={16} />
              </span>
              Logout
            </li>
          </ul>
        </div>
      </div>
      <div>
        <div className='header'>
          <div className='menu-icon' onClick={toggle}>
            <AiOutlineMenu />
          </div>
          <div className='user-info'>
            <img
              className='profile-pic'
              src='https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfHw%3D&w=1000&q=80'
            />
            <div className='profile'>
              <p>{email}</p>
              <p>{role}</p>
            </div>
          </div>
        </div>
        <div className='content'>
          <Breadcrumb items={breadcrumb} />
          <div className='block'>
            <AppRoutes />
          </div>
        </div>
      </div>

      {showModal && (
        <ModalBox
          title='Logout'
          message='Are you sure to exit?'
          onConfirm={logoutHandler}
          onClose={showModalHandler}
        />
      )}
    </div>
  );
}

export default Main;

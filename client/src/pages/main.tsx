import React, { useState } from 'react';
import { AiFillPlusCircle, AiOutlineImport, AiOutlineTeam } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Breadcrumb from '../components/Breadcrumb';
import { unassignUser } from '../reducers/userReducer';
import { AppRoutes } from '../routes/route';
import { RootState } from '../stores/store';
import '../styles/main.css';
import CustomerList from './customerList';

function Main() {
    const { username } = useSelector((state: RootState) => state.user);
    const [active, setActive] = useState(-1);
    const dispatch = useDispatch();
    const nav = useNavigate();

    const logoutHandler = () => {
        dispatch(unassignUser());
    };

    const changeRouteHandler = (index: number, route: string) => {
        setActive(index);
        nav(route);
    };

    const navList = [
        {
            name: 'Customers',
            icon: <AiOutlineTeam size={16}/>,
            route: '/customerList'
        },
        {
            name: 'Add New Customer',
            icon: <AiFillPlusCircle size={16}/>,
            route: '/addNewCustomer'
        }
    ];

    return (
        <div className='main'>
            <div className='side-nav'>
                <div className='app-logo'>
                    <p>CRM App</p>
                </div>
                <div className='navigation-title'>
                    <p>Navigation</p>
                </div>
                <div className='navigation-list'>
                    <ul>
                        {navList.map((item, i) => {
                            return <li key={i} className={`${active === i && 'active'}`} onClick={() => changeRouteHandler(i, item.route)}><span>{item.icon}</span>{item.name}</li>;
                        })}
                        <li onClick={logoutHandler}><span><AiOutlineImport size={16}/></span>Logout</li>
                    </ul>
                </div>
            </div>
            <div>
                <div className='header'>
                    <img className='profile-pic' src='https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfHw%3D&w=1000&q=80' />
                    <div className='profile'>
                        <p>{username}</p>
                        <p>Administrator</p>
                    </div>
                </div>
                <div className='content'>
                    <Breadcrumb items={['Dashboard', 'Customers']}/>
                    <div className='block'>
                        <AppRoutes />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Main;
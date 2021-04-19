import {ClickAwayListener} from "@material-ui/core";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import Logo from "../assets/icons/medicine.svg";
import {getItemLength, logoutAction} from "../redux/actions";

export const NavAdmin = () => {
  const [profile, setProfile] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const {notif} = useSelector((state) => state.admin);
  useEffect(() => {
    dispatch(getItemLength());
  }, [dispatch]);

  const logoutBtn = () => {
    setProfile(false);
    dispatch(logoutAction());
  };

  const loginBtn = () => {
    return (
      <ul class="flex items-center hidden space-x-5 lg:flex">
        <li>
          <Link to="/login">
            <p
              aria-label="Sign in"
              title="Sign in"
              class="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-blue-500"
            >
              Sign in
            </p>
          </Link>
        </li>
        <li>
          <Link to="/signup">
            <p
              class="inline-flex items-center justify-center h-9 px-4 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-blue-500 hover:bg-blue-700 focus:shadow-outline focus:outline-none"
              aria-label="Sign up"
              title="Sign up"
            >
              Sign up
            </p>
          </Link>
        </li>
      </ul>
    );
  };

  const profileBtn = () => {
    return (
      <div class="relative inline-block text-left focus:border-none ">
        <div>
          <button
            onClick={() => setProfile(!profile)}
            type="button"
            class="transition duration-300 inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100"
            id="options-menu"
            aria-expanded="true"
            aria-haspopup="true"
          >
            {user.user_username}
            <svg
              class="-mr-1 ml-2 h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fill-rule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clip-rule="evenodd"
              />
            </svg>
          </button>
        </div>
        {profile ? (
          <ClickAwayListener onClickAway={handleClickAway}>
            <div
              class="z-10 origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="options-menu"
            >
              <div class="py-1" role="none">
                <p
                  className="transition duration-200 font-semibold block px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 hover:text-blue-500 cursor-pointer"
                  role="menuitem"
                >
                  Account settings
                </p>
                <Link to="/">
                  <p
                    className="transition duration-200 font-semibold block w-full text-left px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 hover:text-blue-500 cursor-pointer"
                    onClick={logoutBtn}
                  >
                    Sign Out
                  </p>
                </Link>
              </div>
            </div>
          </ClickAwayListener>
        ) : null}
      </div>
    );
  };

  const handleClickAway = () => {
    setProfile(false);
  };

  const notificationBtn = () => {
    return (
      <div
        className="mr-5 relative align-middle rounded-md focus:outline-none focus:shadow-outline-purple"
        aria-label="Notifications"
        aria-haspopup="true"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="text-gray-700 w-7 h-7 cursor-pointer hover:text-blue-400 hover:bg-gray-200 rounded-2xl focus:bg-gray-200"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
          />
        </svg>
        {/* <!-- Notification badge --> */}
        {notif.length > 0 ? (
          <span
            aria-hidden="true"
            className="absolute top-0 right-0 inline-block w-3 h-3 transform translate-x-1 -translate-y-1 bg-red-600 border-2 border-white rounded-full dark:border-gray-800"
          ></span>
        ) : null}
      </div>
    );
  };

  const rightComponent = () => {
    return (
      <div className="flex flex-row items-center">
        <Link to="/notifications?page=1&limit=10">{notificationBtn()}</Link>
        <div style={{fontSize: "13px", marginRight: "17px", color: "gray"}}>
          Admin
        </div>
        {profileBtn()}
      </div>
    );
  };

  return (
    <div
      style={{
        position: "fixed",
        minWidth: "100%",
        backgroundColor: "white",
      }}
      class="px-4 py-2 sm:max-w-xl md:max-w-full md:px-24 lg:px-8 shadow p-4"
    >
      <div
        class="relative flex items-center"
        style={{justifyContent: "space-between"}}
      >
        <div class="flex items-center">
          <Link
            to="/"
            href="/"
            aria-label="Company"
            title="Company"
            class="inline-flex items-center mr-8"
          >
            <img src={Logo} alt="" className="w-10 h-10" />
            <span class="ml-2 text-xl font-bold tracking-wide text-gray-800 uppercase">
              Pharma
            </span>
          </Link>
        </div>
        {/* {searchComponent()} */}
        {user.user_id === 0 ? loginBtn() : rightComponent()}
      </div>
    </div>
  );
};

import { Suspense } from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { UserMenu } from 'components/index';

export const SharedLayout = ({ onSkip }) => {
  let isUser = null;
  if (localStorage.getItem('user')) {
    isUser = JSON.parse(localStorage.getItem('user'));
  }

  return (
    <>
      <header className="fixed w-full flex justify-end">
        <nav>
          {isUser && (
            <div className="flex p-4 w-screen justify-end space-x-5 bg-gray-900">
              <NavLink
                className="px-4 tracking-wide text-white transition-colors duration-200 transform rounded-md hover:bg-blue-400 focus:outline-none focus:bg-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50"
                to="/contacts"
              >
                Contacts
              </NavLink>
              <UserMenu onSkip={onSkip} />
            </div>
          )}
          {!isUser && (
            <div className="flex px-4 w-full space-x-5 mt-3">
              <NavLink
                className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform rounded-md hover:bg-blue-400 focus:outline-none focus:bg-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50"
                to="/login"
              >
                Login
              </NavLink>
              <NavLink
                className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform rounded-md hover:bg-blue-400 focus:outline-none focus:bg-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50"
                to="/register"
              >
                Register
              </NavLink>
            </div>
          )}
        </nav>
      </header>
      <Suspense>
        <Outlet />
      </Suspense>
    </>
  );
};

SharedLayout.propTypes = {
  onSkip: PropTypes.func.isRequired,
};

export default SharedLayout;

import PropTypes from 'prop-types';
import { useState } from 'react';
import { useGetUserQuery, useLogOutUserMutation } from '../../redux';

export default function UserMenu({ onSkip }) {
  const [isSkip, setIsSkip] = useState(false);
  const [signOut] = useLogOutUserMutation();
  const { data } = useGetUserQuery(isSkip, { skip: isSkip });
  const userName = data?.name;

  const handleSignOut = () => {
    setIsSkip(true);
    onSkip(true);
    signOut();
  };

  return (
    <div className="flex space-x-5">
      {userName && (
        <>
          <p className="w-full px-4  tracking-wide text-white">{userName}</p>
          <button
            className="w-full px-4  tracking-wide text-white transition-colors duration-200 transform rounded-md hover:bg-blue-400 focus:outline-none focus:bg-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50"
            type="submit"
            onClick={() => handleSignOut()}
          >
            LogOut
          </button>
        </>
      )}
    </div>
  );
}

UserMenu.propTypes = {
  onSkip: PropTypes.func.isRequired,
};

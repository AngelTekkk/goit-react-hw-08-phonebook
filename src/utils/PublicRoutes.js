import { Outlet, Navigate } from 'react-router-dom';

const PublicRoutes = () => {
  let user = null;
  if (localStorage.getItem('user')) {
    user = JSON.parse(localStorage.getItem('user'));
  }
  return !user ? <Outlet /> : <Navigate to="contacts" />;
};

export default PublicRoutes;

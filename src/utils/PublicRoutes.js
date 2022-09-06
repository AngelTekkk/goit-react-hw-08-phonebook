import { Outlet, Navigate } from 'react-router-dom';

const PublicRoutes = ({ user }) => {
  return !user ? <Outlet /> : <Navigate to="contacts" />;
};

export default PublicRoutes;

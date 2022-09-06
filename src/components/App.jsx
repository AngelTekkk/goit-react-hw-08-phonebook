import { lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { SharedLayout } from './index';
import { useGetUserQuery } from '../redux';
import PrivateRoutes from 'utils/PrivateRoutes';
import PublicRoutes from 'utils/PublicRoutes';

const Contacts = lazy(() => import('pages/Contacts'));
const Login = lazy(() => import('pages/Login'));
const Register = lazy(() => import('pages/Register'));
const NotFoundPage = lazy(() => import('pages/NotFoundPage'));

export default function App() {
  const { isLoading } = useGetUserQuery();

  let user = null;
  if (localStorage.getItem('user')) {
    user = JSON.parse(localStorage.getItem('user'));
  }

  return (
    <Routes>
      <Route path="/" element={<SharedLayout user={user} />}>
        <Route
          index
          element={<Navigate to={`${user ? 'contacts' : 'login'}`} />}
        />
        {!isLoading && (
          <>
            <Route element={<PrivateRoutes user={user} />}>
              <Route path="contacts" element={<Contacts />} />
            </Route>
            <Route element={<PublicRoutes user={user} />}>
              <Route path="login" element={<Login />} index />
              <Route path="register" element={<Register />} />
            </Route>
            <Route path="*" element={<NotFoundPage />} />
          </>
        )}
      </Route>
    </Routes>
  );
}

import { Outlet, Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ isAllowed, redirectPath, children }) => {
  const location = useLocation();
  const fromPage = location.state?.from?.pathname || '/';

  if (!isAllowed) {
    return (
      <Navigate
        to={redirectPath ? redirectPath : fromPage}
        state={{ from: location }}
        replace
      />
    );
  }

  return children ? children : <Outlet />;
};
export { ProtectedRoute };

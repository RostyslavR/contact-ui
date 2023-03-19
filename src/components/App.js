// import { useEffect, lazy, Suspense } from 'react';
import { useEffect, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// import { Routes, Route, Navigate } from 'react-router-dom';
import { rememberUser } from 'redux/user/operations';
import { selectIsSignedIn, selectIsVerifying } from 'redux/user/selectors';
// import { Box, Progress } from '@chakra-ui/react';
// import { Header } from 'components/Header/Header';
import { ProtectedRoute } from './ProtectedRoute';

import { Layout } from './Layuot';

const Home = lazy(() => import('../pages/Home'));
const SignUp = lazy(() => import('pages/SignUp'));
const SignIn = lazy(() => import('pages/SignIn'));
const About = lazy(() => import('pages/About'));
const Contacts = lazy(() => import('pages/Contacts'));
const JustList = lazy(() => import('pages/JustList'));

const App = () => {
  const dispatch = useDispatch();
  const isSignedIn = useSelector(selectIsSignedIn);
  const isVerifying = useSelector(selectIsVerifying);

  useEffect(() => {
    dispatch(rememberUser());
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route
          path="signup"
          element={
            <ProtectedRoute
              isAllowed={!isVerifying && !isSignedIn}
              redirectPath="/"
            >
              <SignUp />
            </ProtectedRoute>
          }
        />
        <Route
          path="signin"
          element={
            <ProtectedRoute isAllowed={!isSignedIn}>
              <SignIn />
            </ProtectedRoute>
          }
        />
        <Route
          element={
            <ProtectedRoute isAllowed={isSignedIn} redirectPath="/signin" />
          }
        >
          <Route path="contacts" element={<Contacts />} />
          <Route path="justlist" element={<JustList />} />
        </Route>

        <Route path="about/*" element={<About />}>
          <Route path="projects" element={<p>Our projects</p>} />
          <Route path="team" element={<p>Our team</p>} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
};

export default App;

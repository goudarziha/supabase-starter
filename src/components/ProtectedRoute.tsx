import React from 'react';
import { RouteComponentProps, Route, Redirect } from 'react-router-dom';
import { useAuth } from '../Auth';

interface IAuthenticatedRouteProps {
  Component: React.FC<RouteComponentProps>;
  path: string;
  exact?: boolean;
  role?: Array<string>;
}

const AuthenticatedRoute: React.FC<any> = ({
  Component,
  path,
  exact = false,
}: IAuthenticatedRouteProps) => {
  const { user } = useAuth();
  return (
    <Route
      exact={exact}
      path={path}
      render={(props: RouteComponentProps) =>
        user ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/login',
            }}
          />
        )
      }
    />
  );
};

export default AuthenticatedRoute;

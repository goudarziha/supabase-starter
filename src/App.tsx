import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  RouteComponentProps,
} from 'react-router-dom';
import { ChakraProvider, theme } from '@chakra-ui/react';
import { extendTheme } from '@chakra-ui/react';
import { Navigation, Footer, ProtectedRoute } from './components';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import routes from './routes';
import { AuthProvider } from './Auth';
import { supabase } from './supabase';

export const App = () => {
  const [session, setSession] = useState<any>(null);

  useEffect(() => {
    setSession(supabase.auth.session());
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <ChakraProvider theme={theme}>
      <AuthProvider>
        <Router>
          <Navigation />
          <Switch>
            {routes.map((route, index) => {
              return (
                <Route
                  key={index}
                  path={route.path}
                  exact={route.exact}
                  render={(props: RouteComponentProps<any>) => (
                    <route.component
                      name={route.name}
                      {...props}
                      {...route.props}
                    />
                  )}
                />
              );
            })}
          </Switch>
          <Footer />
        </Router>
      </AuthProvider>
    </ChakraProvider>
  );
};

import { Spin } from "antd";
import { isBoolean } from "lodash";
import React, { Suspense, useCallback } from "react";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import routes from "../routes";
import { RouteProps } from "../types/common";
import { checkLogin } from "../utils/jwt";
import { Layout } from "antd/lib";

const Footer = React.lazy(() => import("../layouts/components/Footer"));
const Header = React.lazy(() => import("../layouts/components/Header"));

const PermissionContent = () => {
  const generateRoutes = useCallback((routes: RouteProps[]) => {
    return routes?.map((route, index: number) => {
      let isAccess = true;
      const login = checkLogin();
      if (isBoolean(route?.authority)) {
        isAccess = route?.authority ? login : !login;
      }
      return (
        <Route
          key={index}
          path={route?.path}
          element={
            <Suspense fallback={<Spin />}>
              {isAccess ? <route.element /> : <Navigate to="/" />}
            </Suspense>
          }
        >
          {route?.children && generateRoutes(route?.children)}
        </Route>
      );
    });
  }, []);

  return (
    <Routes>
      <Route
        path="*"
        element={
          <>
            <Suspense fallback={<Spin />}>
              <Header />
            </Suspense>
            <Layout.Content className="min-h-[calc(100vh-72px)]">
              <Outlet />
            </Layout.Content>
            <Suspense fallback={<Spin />}>
              <Footer />
            </Suspense>
          </>
        }
      >
        {generateRoutes(routes)}
      </Route>
    </Routes>
  );
};

export default PermissionContent;

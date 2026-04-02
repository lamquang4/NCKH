import React, { lazy, Suspense } from "react";
import { useLocation } from "react-router-dom";
import Header from "./header/Header";
import Footer from "./Footer";
const FloatingWidget = lazy(() => import("./FloatingWidget"));

export default function LayoutPage({
  children,
}: {
  children: React.ReactNode;
}) {
  const location = useLocation();
  const pathname = location.pathname;
  const isPage = pathname === "/checkout";
  return (
    <>
      {!isPage && <Header />}
      {children}
      {!isPage && (
        <Suspense fallback={null}>
          <FloatingWidget />
        </Suspense>
      )}
      {!isPage && <Footer />}
    </>
  );
}

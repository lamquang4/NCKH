import React from "react";
import { useLocation } from "react-router-dom";
import Header from "./header/Header";
import Footer from "./Footer";
import ChatWidget from "./chatbox/ChatWidget";

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
      {!isPage && <ChatWidget />}
      {!isPage && <Footer />}
    </>
  );
}

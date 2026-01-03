import React from "react";
import { useLocation } from "react-router-dom";
import ChatWidget from "./ChatWidget";

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
      {children}
      {!isPage && <ChatWidget />}
    </>
  );
}

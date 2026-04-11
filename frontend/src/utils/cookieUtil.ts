import { useCallback, useEffect, useState } from "react"; 

const COOKIE_CHANGE_EVENT = "cookie-change";

export function getCookie(name: string): string | null {
  return (
    document.cookie
      .split("; ")
      .find((c) => c.startsWith(`${name}=`))
      ?.split("=")[1] ?? null
  );
}

export function setCookie(name: string, value: string, days = 7) {
  document.cookie = `${name}=${value}; path=/; max-age=${days * 86400}`;
  window.dispatchEvent(
    new CustomEvent(COOKIE_CHANGE_EVENT, { detail: { name } }),
  );
}

export function removeCookie(name: string) {
  document.cookie = `${name}=; path=/; max-age=0`;
  window.dispatchEvent(
    new CustomEvent(COOKIE_CHANGE_EVENT, { detail: { name } }),
  );
}

export function useToken(name: string) {
  const [token, setToken] = useState<string | null>(() => getCookie(name));

  const sync = useCallback(() => {
    setToken(getCookie(name));
  }, [name]);

  useEffect(() => {
    window.addEventListener(COOKIE_CHANGE_EVENT, sync);
    return () => window.removeEventListener(COOKIE_CHANGE_EVENT, sync);
  }, [sync]);

  return token;
}

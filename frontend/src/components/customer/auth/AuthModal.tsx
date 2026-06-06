import { memo } from "react";
import LoginModal from "./LoginModal";
import RegisterModal from "./RegisterModal";
import {
  closeAuthModal,
  switchAuthModal,
} from "../../../redux/slices/authModalSlice";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import Overplay from "../../ui/Overplay";

function AuthModal() {
  const dispatch = useAppDispatch();
  const type = useAppSelector((state) => state.authModal.type);

  if (!type) return null;

  return (
    <>
      {type === "login" && (
        <LoginModal
          onClose={() => dispatch(closeAuthModal())}
          onSwitchRegister={() => dispatch(switchAuthModal("register"))}
        />
      )}
      {type === "register" && (
        <RegisterModal
          onClose={() => dispatch(closeAuthModal())}
          onSwitchLogin={() => dispatch(switchAuthModal("login"))}
        />
      )}
      <Overplay className="z-97" onClose={() => dispatch(closeAuthModal())} />
    </>
  );
}

export default memo(AuthModal);

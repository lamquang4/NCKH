import { memo } from "react";
import Overplay from "../ui/Overplay";
import LoginModal from "./LoginModal";
import RegisterModal from "./RegisterModal";
import {
  closeAuthModal,
  switchAuthModal,
} from "../../../redux/slices/authModalSlice";
import { useAppDispatch, useAppSelector } from "../../../redux/store";

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
      <Overplay onClose={() => dispatch(closeAuthModal())} IndexForZ={97} />
    </>
  );
}

export default memo(AuthModal);

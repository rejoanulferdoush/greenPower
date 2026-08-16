import { useState } from "react";
import Login from "./component/login";
import ForgotPassword from "./component/ForgotPassword";
import ResetMail from "./component/ResetMail";
import SetPassword from "./component/SetPassword";

type View = "login" | "forgot-password" | "reset-mail" | "set-password";

function App() {
  const [view, setView] = useState<View>("login");
  const [resetEmail, setResetEmail] = useState("");

  if (view === "set-password") {
    return <SetPassword onResetPassword={() => setView("login")} />;
  }

  if (view === "reset-mail") {
    return (
      <ResetMail
        email={resetEmail}
        onBack={() => setView("forgot-password")}
        onBackToLogin={() => setView("login")}
        onResend={() => setView("reset-mail")}
        onResetPassword={() => setView("set-password")}
      />
    );
  }

  if (view === "forgot-password") {
    return (
      <ForgotPassword
        onBackToLogin={() => setView("login")}
        onResetPassword={(email) => {
          setResetEmail(email);
          setView("reset-mail");
        }}
      />
    );
  }

  return <Login onForgotPassword={() => setView("forgot-password")} />;
}

export default App;

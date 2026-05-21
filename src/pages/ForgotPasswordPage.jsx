import { useNavigate } from "react-router-dom";
import ForgotPassword from "../components/signin/ForgotPassword";

export default function ForgotPasswordPage() {
  const navigate = useNavigate();
  return <ForgotPassword onGoLogIn={() => navigate("/login")} />;
}

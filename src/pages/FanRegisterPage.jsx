import { useNavigate } from "react-router-dom";
import FanRegister from "../components/signin/FanRegister";

export default function FanRegisterPage() {
  const navigate = useNavigate();
  return (
    <FanRegister
      onGoLogIn={() => navigate("/login")}
      onGoArtist={() => navigate("/register/artist")}
      onRegisterSuccess={() => navigate("/login")}  //
    />
  );
}

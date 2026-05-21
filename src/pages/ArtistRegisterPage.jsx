import { useNavigate } from "react-router-dom";
import ArtistRegister from "../components/signin/ArtistRegister";

export default function ArtistRegisterPage() {
  const navigate = useNavigate();
  return (
    <ArtistRegister
      onGoLogIn={() => navigate("/login")}
      onGoFan={() => navigate("/register/fan")}
      onRegisterSuccess={() => navigate("/login")}  // ← หลังสมัครไป login
    />
  );
}

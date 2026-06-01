import { MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function FloatingAssistantButton() {
  const { user } = useAuth();

  return (
    <Link className="floating-assistant" to={user ? "/assistant" : "/login"}>
      <MessageCircle size={19} />
      <span>Assistant</span>
    </Link>
  );
}

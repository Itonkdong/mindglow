import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import AssistantPage from "./pages/AssistantPage.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import ChallengesPage from "./pages/ChallengesPage.jsx";
import CheckInPage from "./pages/CheckInPage.jsx";
import DashboardPage from "./pages/DashboardPage.jsx";
import HistoryPage from "./pages/HistoryPage.jsx";
import LandingPage from "./pages/LandingPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import PrivacyPage from "./pages/PrivacyPage.jsx";
import RecommendationsPage from "./pages/RecommendationsPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import TermsPage from "./pages/TermsPage.jsx";

const protectedPage = (page) => <ProtectedRoute>{page}</ProtectedRoute>;

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={protectedPage(<DashboardPage />)} />
        <Route path="/check-in" element={protectedPage(<CheckInPage />)} />
        <Route path="/history" element={protectedPage(<HistoryPage />)} />
        <Route path="/challenges" element={protectedPage(<ChallengesPage />)} />
        <Route path="/recommendations" element={protectedPage(<RecommendationsPage />)} />
        <Route path="/assistant" element={protectedPage(<AssistantPage />)} />
      </Routes>
    </>
  );
}

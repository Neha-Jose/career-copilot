import { Routes, Route, Navigate } from "react-router-dom";
import CareerPage from "../pages/CareerPage";
import RecruitmentPage from "../pages/RecruitmentPage";
import EnterprisePage from "../pages/EnterprisePage";
import PricingPage from "../pages/PricingPage";
import LoginPage from "../pages/LoginPage";
import SignupPage from "../pages/SignupPage";
import NotFound from "../pages/NotFound";
import ProtectedRoute from "../components/ProtectedRoute";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Root - redirect to career page */}
      <Route path="/" element={<Navigate to="/career" replace />} />

      {/* Public Auth Pages */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/pricing" element={<PricingPage />} />

      {/* Protected Main Pages */}
      <Route element={<ProtectedRoute allowedRoles={["job_seeker", "recruiter", "enterprise"]} />}>
        <Route path="/career" element={<CareerPage />} />
      </Route>

      <Route element={<ProtectedRoute allowedRoles={["recruiter", "enterprise"]} />}>
        <Route path="/recruitment" element={<RecruitmentPage />} />
      </Route>

      <Route element={<ProtectedRoute allowedRoles={["enterprise"]} />}>
        <Route path="/enterprise" element={<EnterprisePage />} />
      </Route>

      {/* 404 - catch all */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

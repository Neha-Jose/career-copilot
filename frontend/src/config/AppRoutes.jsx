import { Routes, Route, Navigate } from "react-router-dom";
import CareerPage from "../pages/CareerPage";
import RecruitmentPage from "../pages/RecruitmentPage";
import EnterprisePage from "../pages/EnterprisePage";
import PricingPage from "../pages/PricingPage";
import NotFound from "../pages/NotFound";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Root - redirect to career page */}
      <Route path="/" element={<Navigate to="/career" replace />} />

      {/* Main pages */}
      <Route path="/career" element={<CareerPage />} />
      <Route path="/recruitment" element={<RecruitmentPage />} />
      <Route path="/enterprise" element={<EnterprisePage />} />
      <Route path="/pricing" element={<PricingPage />} />

      {/* 404 - catch all */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

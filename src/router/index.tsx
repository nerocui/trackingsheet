import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomePage } from "../pages/home-page";
import { SigninPage } from "../pages/signin-page";
import { SignupPage } from "../pages/signup-page";
import { AuthProvider, RequireAuth, RequirePublic } from "./private-route";

export const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path="/trackingsheet"
            element={
              <RequireAuth>
                <HomePage />
              </RequireAuth>
            }
          />
          <Route
            path="/trackingsheet/signin"
            element={
              <RequirePublic>
                <SigninPage />
              </RequirePublic>
            }
          />
          <Route path="/trackingsheet/signup" element={<SignupPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import SideBarState from "./contexts/SideBarState";
import ActiveBoardContext from "./contexts/ActiveBoard";
import { AuthProvider } from "./contexts/AuthProvider";
import ProtectedRoute from "./features/auth/ProtectedRoute";
import PageNotFound from "./pages/PageNotFound";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import DataProvider from "./contexts/DataProvider";

export default function App() {
  return (
    <SideBarState>
      <DataProvider>
        <ActiveBoardContext>
          <AuthProvider>
            <BrowserRouter>
              <Routes>
                <Route path="login" element={<LoginPage />} />
                <Route path="signup" element={<SignUpPage />} />
                <Route path="*" element={<PageNotFound />} />
                <Route element={<ProtectedRoute />}>
                  <Route index element={<Home />} />
                  <Route path="/" element={<Home />} />
                </Route>
              </Routes>
            </BrowserRouter>
          </AuthProvider>
        </ActiveBoardContext>
      </DataProvider>
    </SideBarState>
  );
}

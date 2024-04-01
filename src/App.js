import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import Sidebar from "./pages/global/Sidebar";
import Dashboard from './pages/dashboard';
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { DataProvider } from "./context/DataContext";
import './assets/style/style.scss'
import MyAccount from "./pages/profileInfo/MyAccount";
import CoinPage from "./pages/Coin";
import MetaMaskView from "./pages/MetaMaskView";

function App() {
  const [theme, colorMode] = useMode();
  const isUserSignedIn = !!localStorage.getItem('token')


  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <DataProvider>
            <div className="app">
              {
                !isUserSignedIn ?
                  <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                  </Routes>
                  :
                  <>
                    <CssBaseline />
                    <Sidebar />
                    <main className="content right-side">
                      <Routes>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/bitcoin" element={<CoinPage />} />
                        <Route path="/metamask" element={<MetaMaskView />} />
                        <Route path="/myaccount" element={<MyAccount />} />
                      </Routes>
                    </main>
                  </>
              }
            </div>
        </DataProvider>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { Dashboard } from './pages/Dashboard';
import { Tasks } from './pages/Tasks';
import { PathToSuccess } from './pages/PathToSuccess';
import { Shop } from './pages/Shop';
import { History } from './pages/History';
import { Profile } from './pages/Profile';
import { Presentation } from './pages/Presentation';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Presentation without layout */}
        <Route path="/presentation" element={<Presentation />} />

        {/* Main routes with layout */}
        <Route
          path="/*"
          element={
            <Layout>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/tasks" element={<Tasks />} />
                <Route path="/path" element={<PathToSuccess />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/history" element={<History />} />
                <Route path="/profile" element={<Profile />} />
              </Routes>
            </Layout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

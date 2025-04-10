
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/home';
import ResourcesPage from './pages/resources';
import ResourceDetailPage from './pages/resources/[slug]';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/resources" element={<ResourcesPage />} />
      <Route path="/resource/:slug" element={<ResourceDetailPage />} />
    </Routes>
  );
}

export default App;
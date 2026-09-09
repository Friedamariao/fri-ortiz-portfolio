import { Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Activity03 from "./pages/Activity03";
import Activity04 from "./pages/Activity04";
import Activities from "./pages/Activities";
import Project01 from "./pages/Project01";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/activities" element={<Activities />} />
        <Route path="/activities/activity-03" element={<Activity03 />} />
        <Route path="/activities/activity-04" element={<Activity04 />} />
        <Route path="/activities/project-01" element={<Project01 />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </MainLayout>
  );
}

export default App;

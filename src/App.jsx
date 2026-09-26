import { Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Activity03 from "./pages/Activity03";
import Activity04 from "./pages/Activity04";
import Activity14 from "./pages/Activity14";
import Activities from "./pages/Activities";
import Project01 from "./pages/Project01";
import RoadToHallOfFame from "./pages/RoadToHallOfFame";
import FPT01 from "./pages/FPT01";
import FPT02 from "./pages/FPT02";
import FPT03 from "./pages/FPT03";
import FPT04 from "./pages/FPT04";
import FPT05 from "./pages/FPT05";
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
        <Route path="/activities/activity-14" element={<Activity14 />} />
        <Route path="/activities/project-01" element={<Project01 />} />
        <Route path="/road-to-hall-of-fame" element={<RoadToHallOfFame />} />
        <Route path="/road-to-hall-of-fame/fpt-01" element={<FPT01 />} />
        <Route path="/road-to-hall-of-fame/fpt-02" element={<FPT02 />} />
        <Route path="/road-to-hall-of-fame/fpt-03" element={<FPT03 />} />
        <Route path="/road-to-hall-of-fame/fpt-04" element={<FPT04 />} />
        <Route path="/road-to-hall-of-fame/fpt-05" element={<FPT05 />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </MainLayout>
  );
}

export default App;
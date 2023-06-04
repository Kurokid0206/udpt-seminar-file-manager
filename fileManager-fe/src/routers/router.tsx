import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/home/Home";
import ViewFile from "../pages/explorerFiles/ViewFiles";

const Navigation: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="/" element={<ViewFile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
export default Navigation;

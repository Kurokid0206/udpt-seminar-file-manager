import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/home/Home";
import ViewFile from "../pages/viewFiles/ViewFiles";
import AddFile from "../pages/addFile/AddFile";
import TestApi from "../pages/testApi/TestApi";

const Navigation: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="/" element={<ViewFile />} />
          <Route path="/addFile" element={<AddFile />} />
          <Route path="/testApi" element={<TestApi />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
export default Navigation;

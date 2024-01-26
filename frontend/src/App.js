import Homepage from "./Homepage/Homepage";
import { Box } from "@mui/material";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Create from "./Create/Create1";
import Created from "./Create/Created1";
import First from "./Create/First1";
import Inside from "./Inside/Inside1";
import Sign from "./Sign/Signin1";
import Otp from "./Sign/OTP1";
import Commented from "./Inside/Commented1";
import Replied from "./Sign/Replied1";
import CreatePost from "./CreatePost/CreatePost1";
import SinglePost from './Inside/SinglePost1';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/create" element={<Create />} />
          <Route path="/created" element={<Created />} />
          <Route path="/first" element={<First />} />
          <Route path="/inside" element={<Inside />} />
          <Route path="/sign" element={<Sign />} />
          <Route path="/otp" element={<Otp />} />
          <Route path="/commented" element={<Commented />} />
          <Route path="/replied" element={<Replied />} />
          <Route path="/createpost" element={<CreatePost />} />
          <Route path="/:id" element={<SinglePost id=":id" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
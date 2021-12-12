import { render } from "react-dom";
import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";
import App from "./App";
import Vuokraamo from "./routes/vuokraamo";
import Hissiliput from "./routes/hissiliput";
import Hiihtokoulu from "./routes/hiihtokoulu";

const rootElement = document.getElementById("root");
render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<App />} />
            <Route path="vuokraamo" element={<Vuokraamo />} />
            <Route path="hissiliput" element={<Hissiliput />} />
            <Route path="hiihtokoulu" element={<Hiihtokoulu />} />
        </Routes>
    </BrowserRouter>,
    rootElement
);
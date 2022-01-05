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
import OstaTunti from "./routes/OstaTunti";
import Tilausvahvistus from "./routes/Tilausvahvistus";
import KaupanEhdot from "./routes/KaupanEhdot";
import Huolto from "./routes/Huolto";
import Kurssit from "./routes/Kurssit";
import Tilausvahvistuskurssi from "./routes/Tilausvahvistuskurssi";

const rootElement = document.getElementById("root");
render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<App />} />
            <Route path="vuokraamo" element={<Vuokraamo />} />
            <Route path="hissiliput" element={<Hissiliput />} />
            <Route path="hiihtokoulu" element={<Hiihtokoulu />} />
            <Route path="ostatunti" element={<OstaTunti />} />
            <Route path="tilausvahvistus" element={<Tilausvahvistus />} />
            <Route path="kaupanehdot" element={<KaupanEhdot />} />
            <Route path="kurssit" element={<Kurssit />} />
            <Route path="tilausvahvistuskurssi" element={<Tilausvahvistuskurssi />} />
            tilausvahvistuskurssi
        </Routes>
    </BrowserRouter>,
    rootElement
);
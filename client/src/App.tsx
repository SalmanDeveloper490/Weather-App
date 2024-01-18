import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import Loader from "./components/Loader.tsx";
import "./App.css";

const Home = lazy(() => import("./pages/Home.tsx"));
const WeatherForecast = lazy(() => import("./pages/WeatherForecast.tsx"));
const ZipcodeForecast = lazy(() => import("./pages/ZipcodeForecast.tsx"));
const GeoLocationForecast = lazy(
  () => import("./pages/GeoLocationForecast.tsx")
);
const ErrorPage = lazy(() => import("./pages/ErrorPage.tsx"));
const PageNotFound = lazy(() => import("./pages/PageNotFound.tsx"));

const App = () => {
  return (
    <Router>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/forecast/:cityName?" element={<WeatherForecast />} />
          <Route path="/forecast/:zipCode?" element={<ZipcodeForecast />} />
          <Route
            path="/forecast/:lat?/:lon?"
            element={<GeoLocationForecast />}
          />
          <Route path="/error" element={<ErrorPage />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;

import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header id="header">
      <div className="container">
        <div className="row pt-5 pb-3">
          <div className="col-md-6 d-flex align-items-center logo">
            <h1 className="text-uppercase text-white logo">Weather Forecast</h1>
          </div>
          <div className="col-md-6 d-flex justify-content-end align-items-center links">
            <Link
              to="/"
              className="float-end btn btn-outline-light px-5"
              role="button"
            >
              Home
            </Link>
          </div>
        </div>
        <hr className="divider" />
      </div>
    </header>
  );
};

export default Header;

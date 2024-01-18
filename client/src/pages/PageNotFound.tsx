import { Link } from "react-router-dom";

const PageNotFound: React.FC = () => {
  return (
    <div id="errorPage">
      <div className="container">
        <div className="row">
          <div
            className="card p-5"
            style={{ width: "35rem", margin: "10rem auto" }}
          >
            <div className="card-body">
              <p className="black text-center fs-4 px-5 text-uppercase">
                OOPS ! page not found
              </p>
              <Link
                to="/"
                role="button"
                className="btn btn-primary"
                style={{
                  width: "11rem",
                  display: "block",
                  margin: "30px auto 0px",
                }}
              >
                Go To Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;

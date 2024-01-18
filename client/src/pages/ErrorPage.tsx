import { Link } from "react-router-dom";

const ErrorPage: React.FC = () => {
  return (
    <div id="errorPage">
      <div className="container">
        <div className="row">
          <div
            className="card p-5"
            style={{ width: "35rem", margin: "10rem auto" }}
          >
            <div className="card-body">
              <p className="black text-center fs-4 text-uppercase">
                OOPS ! Something went wrong
              </p>
              <Link
                to="/"
                role="button"
                className="btn btn-primary px-5"
                style={{
                  width: "10rem",
                  display: "block",
                  margin: "50px auto 0px",
                }}
              >
                Try Again
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;

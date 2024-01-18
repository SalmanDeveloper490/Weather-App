import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "bootstrap/dist/css/bootstrap.css";
import "react-toastify/dist/ReactToastify.css";

import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import { ToastContainer } from "react-toastify";
import { GeolocationProvider } from "./contextapi/GeolocationContext.tsx";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <ToastContainer position="bottom-center" autoClose={3000} />
      <GeolocationProvider>
        <App />
      </GeolocationProvider>
    </ApolloProvider>
  </React.StrictMode>
);

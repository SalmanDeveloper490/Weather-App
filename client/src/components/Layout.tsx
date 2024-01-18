import { ReactNode } from "react";
import Header from "./Header";

interface IProps {
  children: ReactNode;
}

const Layout = ({ children }: IProps) => {
  return (
    <>
      <Header />
      <main id="main">{children}</main>
    </>
  );
};

export default Layout;

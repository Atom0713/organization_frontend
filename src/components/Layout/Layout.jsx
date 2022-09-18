import React, { useState, useEffect } from "react";
import NavSideBar from "../nav/navSideBar";
import NavBar from "../nav/navBar";
import { fetchUser } from "../../api/user";
import { fetcUserRole } from "../../api/role";
import Footer from "../footer/footer";

const Layout = ({ userRole, children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();
  const [user, setUser] = useState({});
  // const [userRole, setUserRole ] = useState({});

  useEffect(() => {
    Promise.all([
      fetchUser(),
      // fetcUserRole()
    ])
      .then((response) => {
        setUser(response[0]);
        // setUserRole(response[1])
        setIsLoading(false);
      })
      .catch((error) => setError(error.message));
  }, []);

  if (error)
    return (
      <div>
        <h1>{error}</h1>
      </div>
    );

  if (isLoading)
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );

  return (
    <div className="container-scroller">
      <NavSideBar userName={user.name} userRole={userRole} />
      <div className="container-fluid page-body-wrapper">
        <NavBar userName={user.name} />
        <div className="main-panel">
          <main>
            <div className="content-wrapper">{children}</div>
          </main>{" "}
          {/*<!-- can't pass role to children --> */}
          <Footer />
        </div>
      </div>
    </div>
    /*<!-- container-scroller --> */
  );
};

export default Layout;

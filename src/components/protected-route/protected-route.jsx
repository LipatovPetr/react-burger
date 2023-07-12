import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import Preloader from "../../components/preloader/preloader";

const Protected = ({ onlyUnAuth = false, component }) => {
  const location = useLocation();
  const isUserLogged = useSelector((state) => state.user.user);
  const isAuthChecked = useSelector((state) => state.user.isAuthChecked);

  if (!isAuthChecked) {
    return <Preloader />;
  } else if (onlyUnAuth && isUserLogged) {
    const { from } = location.state || { from: { pathname: "/" } };
    return <Navigate to={from} />;
  }

  if (!onlyUnAuth && !isUserLogged) {
    return <Navigate to="/login" state={{ from: location }} />;
  }
  return component;
};

export const OnlyAuth = Protected;
export const OnlyUnAuth = ({ component }) => (
  <Protected onlyUnAuth={true} component={component} />
);

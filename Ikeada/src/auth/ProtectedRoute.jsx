import { Navigate } from "react-router-dom";
import { sessionStore } from "../auth/session";
import { observer } from "mobx-react-lite";
import { PropTypes } from "prop-types";

/* ceci est un composant qui sert de "vigile" : 
si on est connecté, on est redirigé vers le back-office,
sinon vers le login 

"observer" c'est la syntaxe casse-pied qui permet de faire des trucs selon un state,
on passe "children" en paramètre juste pour pouvoir l'appeler plus tard
*/
const ProtectedRoute = observer(({ children }) => {
  // on regarde si on est connecté
  if (!sessionStore.token) {
    // non, ben ça passe pas
    return <Navigate to="/login" />;
  } else {
    if (sessionStore.user.id == "2e0ab73d-47b8-4ee2-8f43-e22fe8a63dce") {
      // children c'est le composant <BackOffice />, on est redirigé
      return children;
    } else {
      return <Navigate to="/" />;
    }
  }
});

ProtectedRoute.propTypes = {
  children: PropTypes.object,
};

export default ProtectedRoute;

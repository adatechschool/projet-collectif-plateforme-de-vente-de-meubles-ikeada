import { Navigate } from "react-router-dom";
import { sessionContext } from '../auth/session'
import { observer } from 'mobx-react-lite'
import { useContext } from "react"
import { PropTypes } from 'prop-types'


/* ceci est un composant qui sert de "vigile" : 
si on est connecté, on est redirigé vers le back-office,
sinon vers le login 

"observer" c'est la syntaxe casse-pied qui permet de faire des trucs selon un state,
on passe "children" en paramètre juste pour pouvoir l'appeler plus tard
*/
const ProtectedRoute = observer(({ children }) => {
  // on regarde si on est connecté
  const sessionStore = useContext(sessionContext)

  if (!sessionStore.session) {
    // non, ben ça passe pas
    return <Navigate to="/login" />
  } else {
    // children c'est le composant <BackOffice />, on est redirigé
    return children
  }
})

ProtectedRoute.propTypes = {
  children: PropTypes.object
}

export default ProtectedRoute
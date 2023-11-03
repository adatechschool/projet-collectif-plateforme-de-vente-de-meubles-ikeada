import { makeObservable, observable, action } from "mobx"
import { createContext } from "react"

// store qui va contenir les données de session
class Session {
    user = "anon"
    session = null

    // on lui dis que "user" et "session" sont des trucs auxquels on va vouloir accèder
    // et que setSession est une méthode pour y assigner des données
    constructor() {
        makeObservable(this, {
            user: observable,
            session: observable,
            setSession: action
        })
    }

    setSession(data) {
        this.user = data.user
        this.session = data.session
    }
}

// on instancie le Store
export const sessionStore = new Session();
// on l'initialize pour pouvoir y accèder partout avec React
export const sessionContext = createContext(sessionStore);
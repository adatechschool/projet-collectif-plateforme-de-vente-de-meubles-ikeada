import { useState } from "react";
import { sessionStore } from "../auth/session";
import { useNavigate } from "react-router";
import supabase from "../auth/supabaseClient";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function Login() {
  // ca permet d'utiliser useNavigate ou on veux sinon React n'est pas d'accord
  const navigate = useNavigate();
  // on récupère ce que l'utilisateur tape dans les champs de formulaire
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // gère la connexion quand le formulaire est envoyé
  const handleLogin = async (e) => {
    // empêche le rafraichissement de la page à l'envoi du formulaire
    e.preventDefault();
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        // redirection vers login
        navigate("../login");
        console.error("Erreur de connexion :", error.message);
      } else {
        // envoie les données de session dans le Store
        sessionStore.setSession(data);
        console.log(sessionStore);
        // redirection vers back-office
        navigate("../back-office");
      }
    } catch (error) {
      console.error("Erreur de connexion :", error.message);
    }
  };

  return (
    <Form
      className="mx-auto p-2"
      style={{ minHeight: "90vh", width: "50vw", marginTop: "20px" }}
      onSubmit={handleLogin}
    >
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Adresse email</Form.Label>
        <Form.Control
          type="email"
          placeholder="Entrez votre adresse email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Mot de passe</Form.Label>
        <Form.Control
          type="password"
          placeholder="Entrez votre mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Se connecter
      </Button>
    </Form>
  );
}

export default Login;

import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { createClient } from '@supabase/supabase-js'

// attention c'est dans GitIgnore donc il faut vous faire la votre
import key from '../auth/myKey';
const url = 'https://bbrfovbvfzeszrjnhsdp.supabase.co'
import { useContext } from "react"
import { observer } from 'mobx-react-lite'
import { sessionContext } from '../auth/session';

// syntaxe reloue avec "observer" pour accèder et actualiser les données de session
const Login = observer(() => {
  // on récupère le Store
  const sessionStore = useContext(sessionContext)
  // on récupère ce que l'utilisateur tape dans les champs de formulaire
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // on lance le client Supabase
  const supabase = createClient(url, key)
  // gère la connexion quand le formulaire est envoyé
  const handleLogin = async (e) => {
    // empêche le rafraichissement de la page
    e.preventDefault();
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        console.error("Erreur de connexion :", error.message);
      } else {
        // on envoie les données de session dans le Store
        sessionStore.setSession(data)
        console.log(data.user)
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
})

export default Login

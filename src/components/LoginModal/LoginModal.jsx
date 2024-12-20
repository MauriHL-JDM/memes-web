import { useState, useContext } from "react";
import { Modal, Container, Text, TextInput, Button } from "@mantine/core";
import { AuthContext } from "../../context/AuthContext";

const LoginModal = ({ visible, setVisible }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { loginUser } = useContext(AuthContext);

  const handleSubmit = async () => {
    const success = await loginUser(username, password);
    if (success) setVisible(false);
    else alert("Inicio de sesión fallido");
  };

  return (
    <Modal opened={visible} onClose={() => setVisible(false)}>
      <Container>
        <Container>
          <Text>Iniciar Sesión</Text>
          <TextInput
            placeholder="Usuario"
            value={username}
            onChange={setUsername}
          />
          <TextInput
            placeholder="Contraseña"
            value={password}
            onChange={setPassword}
          />
          <Button title="Enviar" onClick={handleSubmit} />
          <Button title="Cerrar" onClick={() => setVisible(false)} />
        </Container>
      </Container>
    </Modal>
  );
};

export default LoginModal;

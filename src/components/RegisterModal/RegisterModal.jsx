import { useState } from "react";
import { Modal, Container, Text, TextInput, Button } from "@mantine/core";
import { register } from "../../services/memes";

const RegisterModal = ({ visible, setVisible }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  const handleSubmit = async () => {
    if (password !== confirmPass) {
      alert("Las contraseñas no coinciden");
      return;
    }

    const [_, error] = await register(username, password);
    if (error) {
      alert(error);
      return;
    }

    alert("Usuario registrado correctamente");
    setVisible(false);
  };

  return (
    <Modal opened={visible} onClose={() => setVisible(false)}>
      <Container>
        <Container>
          <Text>Registrar</Text>
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
          <TextInput
            placeholder="Confirmar Contraseña"
            value={confirmPass}
            onChange={setConfirmPass}
          />
          <Button title="Enviar" onClick={handleSubmit} />
          <Button title="Cerrar" onClick={() => setVisible(false)} />
        </Container>
      </Container>
    </Modal>
  );
};

export default RegisterModal;

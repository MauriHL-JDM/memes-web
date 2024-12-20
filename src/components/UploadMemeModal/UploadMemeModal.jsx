import { useState, useContext } from "react";
import { Container, Text, TextInput, Button, Modal } from "@mantine/core";
import { postMeme } from "../../services/memes";
import { AuthContext } from "../../context/AuthContext";

const UploadMemeModal = ({ visible, setVisible, refreshMemes }) => {
  const { credentials, isAuthenticated } = useContext(AuthContext);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setSelectedImage] = useState(null);

  const pickImage = null;

  const handleUpload = () => {
    if (!image || !title || !description) {
      alert("Por favor rellene todos los campos y seleccione una imagen.");
      return;
    }
    if (!isAuthenticated || !credentials) {
      alert("Debe iniciar sesión para poder subir un meme!");
      return;
    }
    postMeme(credentials.access_token, title, description, image).then(
      ([_, error]) => {
        if (error) {
          alert(error);
          return;
        }
        setVisible(false);
        refreshMemes();
      }
    );
  };

  return (
    <Modal opened={visible} onClose={() => setVisible(false)}>
      <Container>
        <Container>
          <Text>Subir Meme</Text>
          <TextInput placeholder="Título" value={title} onChange={setTitle} />
          <TextInput
            placeholder="Descripción"
            value={description}
            onChange={setDescription}
          />
          {image && <Text>{image.fileName}</Text>}
          <Button title="Seleccionar Imagen" onClick={pickImage} />
          <Button title="Subir" onClick={handleUpload} />
          <Button title="Cerrar" onClick={() => setVisible(false)} />
        </Container>
      </Container>
    </Modal>
  );
};

export default UploadMemeModal;

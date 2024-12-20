import { Modal, Container, Image, Text } from "@mantine/core";

const ImageModal = ({ visible, setVisible, imageUrl }) => {
  return (
    <Modal opened={visible} onClose={() => setVisible(false)}>
      <Container>
        <div onClick={() => setVisible(false)}>
          <Text>Cerrar</Text>
        </div>
        <Image src={imageUrl} />
      </Container>
    </Modal>
  );
};

export default ImageModal;

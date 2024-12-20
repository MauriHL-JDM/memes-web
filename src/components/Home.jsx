import { useState, useEffect, useContext, useRef } from "react";
import { Container, Button } from "@mantine/core";
import { FixedSizeList as List } from "react-window";
import MemeItem from "./MemeItem/MemeItem";
import ImageModal from "./ImageModal/ImageModal";
import LoginModal from "./LoginModal/LoginModal";
import UploadMemeModal from "./UploadMemeModal/UploadMemeModal";
import RegisterModal from "./RegisterModal/RegisterModal";
import { AuthContext } from "../context/AuthContext";
import useMemes from "../hooks/useMemes";

const Home = () => {
  const { isAuthenticated } = useContext(AuthContext);

  const { memes, isLoading, loadMoreMemes, refreshMemes } = useMemes();

  const [selectedImage, setSelectedImage] = useState(null);

  const [modalImageVisible, setModalImageVisible] = useState(false);
  const [modalLoginVisible, setModalLoginVisible] = useState(false);
  const [modalUploadVisible, setModalUploadVisible] = useState(false);
  const [modalRegisterVisible, setModalRegisterVisible] = useState(false);

  const listRef = useRef(null);

  const handleImagePress = (imgUrl) => {
    setSelectedImage(imgUrl);
    setModalImageVisible(true);
  };

  const handleScroll = () => {
    const bottom =
      listRef.current.scrollHeight ===
      listRef.current.scrollTop + listRef.current.clientHeight;
    if (bottom) {
      loadMoreMemes();
    }
  };

  useEffect(() => {
    const listElement = listRef.current;
    listElement.addEventListener("scroll", handleScroll);
    return () => listElement.removeEventListener("scroll", handleScroll);
  }, []);

  const Row = ({ index, style }) => {
    const meme = memes[index];
    return (
      <div style={style}>
        <MemeItem meme={meme} handleImagePress={handleImagePress} />
      </div>
    );
  };

  return (
    <Container>
      <div
        className="meme-list"
        style={{ maxHeight: "1000px", maxWidth: "600" }}
        ref={listRef}
      >
        <List height={400} itemCount={memes.length} itemSize={35} width={300}>
          {Row}
        </List>
        {isLoading && <div className="loading-text">Cargando...</div>}
      </div>

      <ImageModal
        imageUrl={selectedImage}
        visible={modalImageVisible}
        setVisible={setModalImageVisible}
      />

      <UploadMemeModal
        visible={modalUploadVisible}
        setVisible={setModalUploadVisible}
        refreshMemes={refreshMemes}
      />

      <RegisterModal
        visible={modalRegisterVisible}
        setVisible={setModalRegisterVisible}
      />

      <LoginModal
        visible={modalLoginVisible}
        setVisible={setModalLoginVisible}
      />

      <Container className="buttonContainer">
        {isAuthenticated ? (
          <Button title="Subir" onClick={() => setModalUploadVisible(true)} />
        ) : (
          <>
            <Button
              title="Ingresar"
              onClick={() => setModalLoginVisible(true)}
            />
            <Button
              title="Registrarse"
              onClick={() => setModalRegisterVisible(true)}
            />
          </>
        )}
      </Container>
    </Container>
  );
};

export default Home;

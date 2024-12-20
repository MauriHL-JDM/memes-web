import { useState, useContext } from "react";
import { Text, Container, Image } from "@mantine/core";
import { likeMeme } from "../../services/memes";
import { AuthContext } from "../../context/AuthContext";

function MemeItem({ meme, handleImagePress }) {
  const { credentials, isAuthenticated } = useContext(AuthContext);
  const [likes, setLikes] = useState(meme.likes);

  const handleLike = () => {
    if (!isAuthenticated || !credentials) {
      alert("Debe iniciar sesión para dar me gusta.");
    }

    likeMeme(credentials.access_token, meme._id).then(([newLikes, error]) => {
      if (error) {
        alert(error);
        return;
      }

      setLikes(newLikes);
    });
  };

  return (
    <Container>
      <Text>{meme.title}</Text>
      <Text>{meme.description}</Text>
      <div onClick={() => handleImagePress(meme.img_url)}>
        <Image src={meme.img_url} />
      </div>
      <Container>
        <div onClick={handleLike}>
          <Text>❤️ {likes}</Text>
        </div>
        <Text>Publicado por: {meme.user}</Text>
      </Container>
    </Container>
  );
}

export default MemeItem;

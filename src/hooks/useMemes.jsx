import { useState, useEffect } from "react";
import { getMemes } from "../services/memes";

const useMemes = () => {
  const [memes, setMemes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [sortBy, setSortBy] = useState("recent");

  const fetchMemes = (page) => {
    if (!hasMore) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    getMemes(page, 10)
      .then(([data, error]) => {
        if (error) {
          console.error(error);
          setIsLoading(false);
          return;
        }

        if (data.length < 10) {
          setHasMore(false);
        }

        if (data.length) {
          const sortedMemes = sortMemes(data);
          setMemes((prevMemes) => [...prevMemes, ...sortedMemes]);
        }
      })
      .catch((error) => console.error(error))
      .finally(() => setIsLoading(false));
  };

  const sortMemes = (memes) => {
    if (sortBy === "recent") {
      return memes.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
    } else if (sortBy === "likes") {
      return memes.sort((a, b) => b.likes - a.likes);
    }
    return memes;
  };

  const refreshMemes = () => {
    setMemes([]);
    setHasMore(true);
    setPage(1);
    fetchMemes(1);
  };

  const loadMoreMemes = () => {
    if (hasMore && !isLoading) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    fetchMemes(page);
  }, [page, sortBy]);

  return { memes, isLoading, loadMoreMemes, refreshMemes, setSortBy };
};

export default useMemes;

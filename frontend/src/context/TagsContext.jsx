// src/contexts/TagsContext.js
import PropTypes from "prop-types";
import { createContext, useState } from "react";

// Criação do contexto
export const TagsContext = createContext();

export const TagsProvider = ({ children }) => {
  const [tags, setTags] = useState([
    { id: 1, value: "frontend", label: "Frontend" },
    { id: 2, value: "backend", label: "Backend" },
    { id: 3, value: "design", label: "Design" },
  ]);

  const addTag = (newTag) => {
    const tagFormatted = {
      id: tags.length + 1,
      value: newTag,
      label: newTag,
    }
    setTags((prevTags) => [...prevTags, tagFormatted]);
  };

  const removeTag = (tagToRemove) => {
    setTags((prevTags) => prevTags.filter((tag) => tag !== tagToRemove));
  };

  return (
    <TagsContext.Provider value={{ tags, addTag, removeTag }}>
      {children}
    </TagsContext.Provider>
  );
};

TagsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

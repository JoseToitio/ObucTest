import PropTypes from "prop-types";
import { createContext, useState } from "react";

export const TagsContext = createContext();

export const TagsProvider = ({ children }) => {
  const [tags, setTags] = useState([
    { id: 1, value: "Frontend", label: "Frontend" },
    { id: 2, value: "Backend", label: "Backend" },
    { id: 3, value: "Design", label: "Design" },
  ]);

  const addTag = (newTag) => {
    const tagFormatted = {
      id: tags.length + 1,
      value: newTag.charAt(0).toUpperCase() + newTag.slice(1),
      label: newTag.charAt(0).toUpperCase() + newTag.slice(1),
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

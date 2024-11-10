import { FaPlus } from "react-icons/fa";
import "./Tags.css";
import { useState } from "react";
import InputText from "../../../components/InputText/InputText";
import Button from "../../../components/Button/Button";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import PropTypes from "prop-types";

export default function Tags({ tags, addTag, removeTag }) {
  const [newTag, setNewTag] = useState("");

  const handleEdit = () => {
    return;
  };

  const handleChange = (event) => {
    setNewTag(event.target.value);
  };

  return (
    <div className="tags-wrapper">
      <h1>Tags</h1>
      <div className="form-wrapper">
        <div className="tag-input-container">
          <InputText
            type="text"
            placeholder="Enter tag name"
            value={newTag}
            onChange={handleChange}
          />
          <Button onClick={() => {
            addTag(newTag);
            setNewTag("");
          }}>
            <FaPlus />
            Add Tag
          </Button>
        </div>
      </div>
      <div className="tag-list">
        <div className="tag-header">
          <span>Tag Name</span>
        </div>
        <ul className="tag-items">
          {tags.map((tag, index) => (
            <li key={index} className="tag-item">
              <span className="tag-name">{tag.value}</span>
              <div className="tag-actions">
                <button
                  className="action-button"
                  onClick={() => removeTag(tag)}
                >
                  <FiTrash2 />
                </button>
                <button
                  className="action-button"
                  onClick={() => handleEdit(tag.id)}
                >
                  <FiEdit2 />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

Tags.propTypes = {
  tags: PropTypes.array.isRequired,
  addTag: PropTypes.func,
  removeTag: PropTypes.func,
};

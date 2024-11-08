import { FaPlus } from "react-icons/fa";
import "./Tags.css";
import { useState } from "react";
import InputText from "../../../components/InputText/InputText";
import Button from "../../../components/Button/Button";
import { FiEdit2, FiTrash2 } from "react-icons/fi";

export default function Tags() {
  const [newTag, setNewTag] = useState("");
  const [tags, setTags] = useState([
    { id: 1, name: "Frontend" },
    { id: 2, name: "Backend" },
    { id: 3, name: "Design" },
  ]);

  const handleDelete = (id) => {
    setTags(tags.filter((tag) => tag.id !== id));
  };

  const handleEdit = (id) => {
    console.log("Editar tag com id:", id);
  };
  const handleTagSubmit = (event) => {
    event.preventDefault();
    if (!newTag) {
      return;
    }

    setTags((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        name: newTag,
      },
    ]);

    setNewTag("");
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
          <Button onClick={handleTagSubmit}>
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
              <span className="tag-name">{tag.name}</span>
              <div className="tag-actions">
                <button
                  className="action-button"
                  onClick={() => handleDelete(tag.id)}
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

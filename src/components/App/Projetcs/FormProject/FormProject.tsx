import { useState, useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../hook/redux';
import { fetchAllTags } from '../../../../store/reducer/tag';

import './style.scss';
import { postOneProject } from '../../../../store/reducer/projects';

function FormProject() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedTechnos, setSelectedTechnos] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [availability, setAvailability] = useState(false);
  const user_id = useAppSelector((state) => state.user.login.id);

  const dispatch = useAppDispatch();
  const dropdownRef = useRef(null);

  useEffect(() => {
    dispatch(fetchAllTags());
  }, [dispatch]);

  const handleSwitch = () => {
    setAvailability(!availability);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const selectedTagsIds = selectedTechnos.map((selectedTag) => {
      const tag = tags.find((tag) => tag.name === selectedTag);
      return tag ? tag.id : null;
    });

    const projectData = {
      title,
      description,
      tags: selectedTechnos,
      selectedTechnos: selectedTagsIds.filter((id) => id !== null),
      availability,
      user_id,
    };

    dispatch(postOneProject(projectData));
  };

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleTagSelect = (event) => {
    const selectedTagId = parseInt(event.target.value);
    setSelectedTechnos((prevSelectedTechnos) => {

      if (prevSelectedTechnos.includes(selectedTagId)) {
        return prevSelectedTechnos.filter((tagId) => tagId !== selectedTagId);
      } else {
        return [...prevSelectedTechnos, selectedTagId];

      }
      return [...prevSelectedTechnos, selectedTag];
    });
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleOutsideClick);
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  const tags = useAppSelector((state) => state.tag.list.data) || [];

  return (
    <div className="form-container">
      <h2>Créer votre projet</h2>
      <h3 className="form-title">Choisissez le titre du projet</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Titre..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <h3 className="form-title">Choisissez les technologies</h3>
        <div className="dropdown-container" ref={dropdownRef}>
          <div className="dropdown-toggle" onClick={handleToggle}>
            Technologies
          </div>
          {isOpen && (
            <div className="dropdown-options">
              <ul>
                {tags.map((tag) => (
                  <li key={tag.id}>
                    <label>
                      <input
                        type="checkbox"
                        value={tag.id}
                        checked={selectedTechnos.includes(tag.id)}
                        onChange={handleTagSelect}
                      />
                      {tag.name}
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <h3 className="form-title">Choisissez la description</h3>
        <textarea
          id="description"
          value={description}
          placeholder="Description..."
          onChange={(e) => setDescription(e.target.value)}
        />

        <div>
          <h3 className="form-title">Ouvert aux participants</h3>
          <label className="switch">
            <input
              type="checkbox"
              checked={availability}
              onChange={handleSwitch}
            />
            <span className="slider" />
          </label>
        </div>

        <button type="submit" className="validate-button">
          Valider
        </button>
      </form>
    </div>
  );
}

export default FormProject;

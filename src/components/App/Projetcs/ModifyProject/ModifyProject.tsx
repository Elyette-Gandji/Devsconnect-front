import { useState, useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../hook/redux';
import { fetchAllTags } from '../../../../store/reducer/tag';
import {
  deleteOneProject,
  fetchOneProject,
  putOneProject,
} from '../../../../store/reducer/projects';
import DeleteProject from './DeleteProject';

import './style.scss';
import { useParams } from 'react-router';

function ModifyProject() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedTechnos, setSelectedTechnos] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [availability, setAvailability] = useState(false);
  const [isOpenDeleteModale, setIsOpenDeleteModale] = useState(false);

  const user_id = useAppSelector((state) => state.user.login.id);
  const tags = useAppSelector((state) => state.tag.list.data);
  const projectId = useAppSelector((state) => state.projects.project.data?.id);

  const dispatch = useAppDispatch();
  const dropdownRef = useRef(null);

  const { id } = useParams();

  useEffect(() => {
    dispatch(fetchAllTags());
  }, [dispatch]);

  const handleSwitch = () => {
    setAvailability(!availability);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const projectData = {
      title,
      description,
      tag: selectedTechnos,
      availability,
      user_id,
    };

    dispatch(putOneProject({ projectData, id }));
  };

  const handleDeleteProjet = () => {
    if (projectId) {
      dispatch(deleteOneProject(projectId));
    }
  };

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleTagSelect = (event) => {
    const selectedTag = event.target.value;
    setSelectedTechnos((prevSelectedTechnos) => {
      if (prevSelectedTechnos.includes(selectedTag)) {
        return prevSelectedTechnos.filter((tag) => tag !== selectedTag);
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

  const handleDeleteModale = () => {
    setIsOpenDeleteModale(!isOpenDeleteModale);
  };

  return (
    <div className="form-container">
      <h2>Modifier votre projet</h2>
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
                        value={tag.name}
                        checked={selectedTechnos.includes(tag.name)}
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

        <button type="submit" className="validates-button">
          Valider les modifications
        </button>
      </form>
      <button
        className="deletes-button"
        onClick={handleDeleteModale}
        type="button"
      >
        Supprimer mon projet
      </button>
      {isOpenDeleteModale && (
        <DeleteProject
          isOpenDeleteModale={isOpenDeleteModale}
          setIsOpenDeleteModale={setIsOpenDeleteModale}
          projectId={projectId}
        />
      )}
    </div>
  );
}

export default ModifyProject;

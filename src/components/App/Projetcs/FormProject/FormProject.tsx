import { useState, useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../hook/redux';
import { fetchAllTags } from '../../../../store/reducer/tag';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import './style.scss';
import { postOneProject } from '../../../../store/reducer/projects';

function FormProject() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedTechnos, setSelectedTechnos] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [availability, setAvailability] = useState(false);
  const user_id = useAppSelector((state) => state.user.login.id);
  const [isProjectCreate, setIsProjectCreate] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [isCreateError, setIsCreateError] = useState(false);

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
      availability,
      user_id,
    };

    dispatch(postOneProject(projectData));
    setIsProjectCreate(true);
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

  useEffect(() => {
    if (isProjectCreate) {
      setShowSuccessAlert(true);

      setTimeout(() => {
        setShowSuccessAlert(false);
      }, 2000);
    }
  }, [isProjectCreate]);

  useEffect(() => {
    if (isCreateError) {
      setShowErrorAlert(true);
      setTimeout(() => {
        setShowErrorAlert(false);
      }, 2000);
    }
  }, [isCreateError]);

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
      {isProjectCreate && showSuccessAlert && (
        <Stack>
          <Alert severity="success">
            Le projet a été modifié avec succès !
          </Alert>
        </Stack>
      )}
      {isCreateError && showErrorAlert && (
        <Stack sx={{ width: '100%' }} spacing={2}>
          <Alert severity="error">
            Une erreur est survenue lors de la modification de votre projet
          </Alert>
        </Stack>
      )}
    </div>
  );
}

export default FormProject;

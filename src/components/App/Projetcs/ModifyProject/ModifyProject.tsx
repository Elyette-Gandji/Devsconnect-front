import { useState, useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../hook/redux';
import { fetchAllTags } from '../../../../store/reducer/tag';
import {
  deleteOneProject,
  fetchOneProject,
  putOneProject,
} from '../../../../store/reducer/projects';
import DeleteProject from './DeleteProject';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import './style.scss';
import { useParams } from 'react-router';

function ModifyProject() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedTechnos, setSelectedTechnos] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [availability, setAvailability] = useState(false);
  const [isOpenDeleteModale, setIsOpenDeleteModale] = useState(false);
  const [isProjectModified, setIsProjectModified] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [isModifyError, setIsModifyError] = useState(false);

  const dispatch = useAppDispatch();
  const dropdownRef = useRef(null);

  const { id } = useParams();

  useEffect(() => {
    dispatch(fetchAllTags());
  }, [dispatch]);

  const user_id = useAppSelector((state) => state.user.login.id);
  const tags = useAppSelector((state) => state.tag.list.data);
  const projectId = useAppSelector((state) => state.projects.project.data?.id);
  const currentProject = useAppSelector((state) => state.projects.project.data);

  const handleSwitch = () => {
    setAvailability(!availability);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const updatedTitle = title !== '' ? title : currentProject?.title;
    const updatedDescription =
      description !== '' ? description : currentProject?.description;
    const updatedTags =
      selectedTechnos.length !== 0
        ? selectedTechnos.map((tagId) => parseInt(tagId, 10))
        : currentProject?.tags;
    const updatedAvailability =
      availability !== null ? availability : currentProject?.availability;

    const projectData = {
      title: updatedTitle,
      description: updatedDescription,
      tags: updatedTags,
      availability: updatedAvailability,
      user_id: user_id,
    };

    console.log('Project Data:', projectData);

    const isTitleModified = title !== '' && title !== currentProject?.title;
    const isDescriptionModified =
      description !== '' && description !== currentProject?.description;
    const areTagsModified =
      selectedTechnos.length !== 0 && selectedTechnos !== currentProject?.tags;
    const isAvailabilityModified =
      availability !== null && availability !== currentProject?.availability;

    if (
      !isTitleModified &&
      !isDescriptionModified &&
      !areTagsModified &&
      !isAvailabilityModified
    ) {
      setIsModifyError(true);
      return;
    }

    dispatch(putOneProject({ projectData, id }));
    setIsProjectModified(true);
    console.log(id);
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
    const selectedTagId = event.target.value;
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

  const handleDeleteModale = () => {
    setIsOpenDeleteModale(!isOpenDeleteModale);
  };

  useEffect(() => {
    if (isProjectModified) {
      setShowSuccessAlert(true);

      setTimeout(() => {
        setShowSuccessAlert(false);
      }, 2000);
    }
  }, [isProjectModified]);

  useEffect(() => {
    if (isModifyError) {
      setShowErrorAlert(true);
      setTimeout(() => {
        setShowErrorAlert(false);
      }, 2000);
    }
  }, [isModifyError]);

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
                        value={tag.id}
                        checked={selectedTechnos.includes(String(tag.id))}
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
      {isProjectModified && showSuccessAlert && (
        <Stack>
          <Alert severity="success">
            Le projet a été modifié avec succès !
          </Alert>
        </Stack>
      )}
      {isModifyError && showErrorAlert && (
        <Stack sx={{ width: '100%' }} spacing={2}>
          <Alert severity="error">
            Une erreur est survenue lors de la modification de votre projet
          </Alert>
        </Stack>
      )}
    </div>
  );
}

export default ModifyProject;

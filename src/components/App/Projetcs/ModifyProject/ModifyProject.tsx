import { useState, useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../hook/redux';
import { technos } from '../../../../utils/technosPath';
import { putOneProject } from '../../../../store/reducer/projects';
import { fetchOneMember } from '../../../../store/reducer/members';
import DeleteProject from './DeleteProject';

import './style.scss';

function ModifyProject({ projectId }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [availability, setAvailability] = useState(false);
  const [isOpenDeleteModale, setIsOpenDeleteModale] = useState(false);
  const user_id = useAppSelector((state) => state.user.login.id);

  const dispatch = useAppDispatch();
  const dropdownRef = useRef(null);

  useEffect(() => {
    dispatch(fetchOneMember());
    fetchProjectDetails(projectId);
  }, [dispatch, projectId]);

  const fetchProjectDetails = async (projectId) => {
    try {
      const project = await fetchProject(projectId);
      setTitle(project.title);
      setDescription(project.description);
      setAvailability(project.availability);
    } catch (error) {
      console.error('Failed to fetch project details:', error);
    }
  };

  const handleSwitch = () => {
    setAvailability(!availability);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const projectData = {
      title,
      description,
      availability,
      user_id: user_id,
    };

    console.log('Project Data:', projectData);

    dispatch(putOneProject({ projectId, projectData }));
  };

  const handleToggle = () => {
    setIsOpen(!isOpen);
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
            <span className="slider"></span>
          </label>
        </div>

        <button type="submit" className="validate-button">
          Valider
        </button>
      </form>
      <button
        type="button"
        className="MyProfile--fourthField--button--delete"
        onClick={handleDeleteModale}
      >
        Supprimer le projet
      </button>

      {isOpenDeleteModale && (
        <DeleteProject
          isOpenDeleteModale={isOpenDeleteModale}
          setIsOpenDeleteModale={setIsOpenDeleteModale}
        />
      )}
    </div>
  );
}

export default ModifyProject;

import { useState, useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../hook/redux';
import { technos } from '../../../../utils/technosPath';
import { postOneProject } from '../../../../store/reducer/projects';
import { fetchOneMember } from '../../../../store/reducer/members';
import './style.scss';

function FormProject() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedTechnos, setSelectedTechnos] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const member = useAppSelector((state) => state.members.member.data);

  const dispatch = useAppDispatch();
  const dropdownRef = useRef(null);

  const handleSwitch = () => {
    setIsChecked(!isChecked);
  };

  useEffect(() => {
    if (member) {
      dispatch(fetchOneMember(member.id.toString()));
    }
  }, [dispatch, member]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const projectData = {
      title,
      description,
      selectedTechnos,
      user_id: member?.id,
      isChecked,
    };

    console.log('Project Data:', projectData);

    dispatch(postOneProject(projectData));
  };

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleTechnoSelect = (event) => {
    const selectedTechno = event.target.value;
    setSelectedTechnos((prevSelectedTechnos) => {
      if (prevSelectedTechnos.includes(selectedTechno)) {
        return prevSelectedTechnos.filter(
          (techno) => techno !== selectedTechno
        );
      } else {
        return [...prevSelectedTechnos, selectedTechno];
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
            Tehchnologies
          </div>
          {isOpen && (
            <div className="dropdown-options">
              <ul>
                {technos.map((techno) => (
                  <li key={techno.id}>
                    <label>
                      <input
                        type="checkbox"
                        value={techno.value}
                        checked={selectedTechnos.includes(techno.value)}
                        onChange={handleTechnoSelect}
                      />
                      {techno.label}
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
              checked={isChecked}
              onChange={handleSwitch}
            />
            <span className="slider"></span>
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

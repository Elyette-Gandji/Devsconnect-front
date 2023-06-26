import { useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteOneProject } from '../../../../store/reducer/projects';

import './style.scss';

function DeleteProject({ isOpenDeleteModale, setIsOpenDeleteModale }) {
  const flash = useSelector((state) => state.user.login.message);
  const modalRef = useRef(null);
  const projectId = useSelector((state) => state.projects.project.data?.id);
  const dispatch = useDispatch();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setIsOpenDeleteModale(!isOpenDeleteModale);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpenDeleteModale, setIsOpenDeleteModale]);

  const handleDeleteModale = () => {
    setIsOpenDeleteModale(!isOpenDeleteModale);
  };

  const handleDeleteModaleKeyDown = (event) => {
    if (event.key === 'enter' || event.key === ' ') {
      handleDeleteModale();
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('delete envoyé');
    setIsOpenDeleteModale(!isOpenDeleteModale);
    dispatch(deleteOneProject(projectId));
  };

  return (
    <div className="DeleteModale">
      <div className="DeleteModale--container" ref={modalRef}>
        {/* {flash && (
          <FlashMessage type={flash.type} duration={flash.duration ?? 3000}>
            {flash.children}
          </FlashMessage>
        )} */}
        <div className="DeleteModale--container--head">
          <h2 className="DeleteModale--title">Suppression</h2>
          <div
            className="DeleteModale--close"
            role="button"
            tabIndex={0}
            onClick={handleDeleteModale}
            onKeyDown={handleDeleteModaleKeyDown}
          >
            X
          </div>
        </div>

        <form className="DeleteModale--form" onSubmit={handleSubmit}>
          <h3>Voulez-vous vraiment supprimer votre projet ?</h3>
          <p>(Attention, cette action est irréversible.)</p>
          <div className="DeleteModale--form--submit">
            <button
              type="submit"
              onClick={handleDeleteModale}
              className="DeleteModale--form--submit--cancel"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="DeleteModale--form--submit--confirm"
            >
              Supprimer mon projet
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default DeleteProject;

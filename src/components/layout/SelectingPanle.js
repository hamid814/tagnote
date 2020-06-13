import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { setModal } from 'store/actions/modal';
import { openOptions } from 'store/actions/options';
import { unSelecteAll } from 'store/actions/note';
import { deleteSelectedNotes } from 'store/actions/note';

// styles
import './style/selectingPanle.scss';

const SelectingPanle = ({
  setModal,
  openOptions,
  unSelecteAll,
  deleteSelectedNotes,
  selected,
}) => {
  const [panelClass, setPanelClass] = useState('close');
  const [hasChanged, setHasChanged] = useState(false);
  const [selecting, setSelecting] = useState(false);

  useEffect(() => {
    if (hasChanged) {
      if (selected.length === 0) {
        setPanelClass('go');

        setTimeout(() => {
          setPanelClass('close');
        }, 280);
      } else if (selected.length === 1) {
        if (!selecting) {
          setPanelClass('come');

          setTimeout(() => {
            setPanelClass('open');
          }, 280);
        }
      }
    } else {
      setHasChanged(true);
    }

    if (selected.length === 0) {
      setSelecting(false);
    } else {
      setSelecting(true);
    }

    // eslint-disable-next-line
  }, [selected]);

  const onDeleteSelectedClicked = () => {
    setModal('on', 'ask-modal', {
      title: 'Delete notes?',
      text: 'Are you sure you want to Delete All selected Notes?',
      buttons: [
        {
          text: 'Delete',
          color: 'var(--red-color)',
          action: async () => {
            await deleteSelectedNotes();
            setModal('off');
          },
        },
        {
          text: 'No',
          color: 'var(--blue-color)',
          action: () => {
            setModal('off');
          },
        },
      ],
    });
  };

  const onSelectOptionsClicked = () => {
    openOptions({
      subject: 'selectedNotes',
    });
  };

  return (
    <div className={`navbar-seleting-panel ${panelClass}`}>
      <div>
        <button className="cancel-select-btn" onClick={unSelecteAll}>
          &times;
        </button>
        <span className="navbar-selected-count">{selected.length}</span>
      </div>
      <div>
        <button onClick={onDeleteSelectedClicked}>delete</button>
        <button onClick={onSelectOptionsClicked}>...</button>
      </div>
    </div>
  );
};

SelectingPanle.propTypes = {
  selected: PropTypes.array,
  setModal: PropTypes.func.isRequired,
  openOptions: PropTypes.func.isRequired,
  unSelecteAll: PropTypes.func.isRequired,
  deleteSelectedNotes: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  selected: state.note.selected,
});

export default connect(mapStateToProps, {
  setModal,
  openOptions,
  unSelecteAll,
  deleteSelectedNotes,
})(SelectingPanle);

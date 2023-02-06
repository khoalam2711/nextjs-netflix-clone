import { Modal } from '@mui/material';
import React from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/store';
import { modalClosed } from '../store/ui/HomePage';

const MoviePreviewModal = () => {
	const modalShow = useAppSelector((state) => state.ui.homePage.modal);
	const dispatch = useAppDispatch();

	const handleClose = () => {
		dispatch(modalClosed());
	}

	return (
		<Modal open={modalShow} onClose={handleClose}>
			<>Modal</>
		</Modal>
	);
};

export default MoviePreviewModal;

import * as React from 'react';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import BillForm from './BillForm';
import { Box, Modal, Typography, Snackbar, Alert } from '@mui/material';
import axios from 'axios';
import { Bill } from '@/models/Bill';

interface CreateBillModalProps {
    refetchBills: () => void;
    showAlert: (message: string, severity: 'success' | 'error') => void;
}

const CreateBillModal: React.FC<CreateBillModalProps> = ({ showAlert, refetchBills }) => {
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleSubmit = async (billData: Bill) => {
        try {
            const response = await axios.post(`/api/bill/create`, billData, {
                headers: { 'Content-Type': 'application/json' },
            });
            if (response.status === 201) {
                showAlert('Bill created successfully!', 'success');
                handleClose();
                refetchBills()
            }
        } catch (error) {
            showAlert('Error creating bill. Please try again.', 'error');
        }
    };

    return (
        <>
            <Button
                variant="outlined"
                color="primary"
                startIcon={<AddIcon />}
                sx={{
                    width: '300px',
                    height: '225px',
                    borderStyle: 'dashed',
                    borderWidth: 2,
                    borderColor: 'primary.main',
                    '&:hover': {
                        borderColor: 'primary.dark',
                    },
                }}
                onClick={handleOpen}
            >
                Create a new Bill
            </Button>

            <Modal open={open} onClose={handleClose}>
                <Box
                    sx={{
                        width: 400,
                        bgcolor: 'background.paper',
                        padding: 4,
                        borderRadius: 2,
                        boxShadow: 24,
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        maxHeight: '80vh',
                        overflowY: 'auto',
                    }}
                >
                    <Typography variant="h6" gutterBottom>
                        Create a New Bill
                    </Typography>
                    <BillForm onSubmit={handleSubmit} />
                </Box>
            </Modal>
        </>
    );
};

export default CreateBillModal;

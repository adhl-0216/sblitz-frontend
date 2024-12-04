import * as React from 'react';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import BillForm from '@/components/dashboard/billForm/BillForm';
import { Box, Modal, Typography } from '@mui/material';
import axios from 'axios';
import { Bill } from '@/models/Bill';
import { AlertSeverity } from '@/types/alert';
import { useAlert } from '@/hooks/useAlert';

interface CreateBillModalProps {
    refetchBills: () => void;
}

export default function CreateBillModal({ refetchBills }: CreateBillModalProps) {
    const [open, setOpen] = React.useState(false);
    const { showAlert } = useAlert()

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleSubmit = async (billData: Bill) => {
        try {
            const response = await axios.post(`/api/bill/create`, billData, {
                headers: { 'Content-Type': 'application/json' },
            });
            if (response.status === 201) {
                showAlert('Bill created successfully!', AlertSeverity.Success);
                handleClose();
                refetchBills()
            }
        } catch (error) {
            showAlert('Error creating bill. Please try again.', AlertSeverity.Error);
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
                        width: '28rem',
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
                    <BillForm mode='create' onSubmit={handleSubmit} />
                </Box>
            </Modal>
        </>
    );
};

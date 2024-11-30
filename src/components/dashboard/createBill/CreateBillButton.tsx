import * as React from 'react';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import CreateBillModal from './CreateBillModal';

const CreateBillButton = () => {
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

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

            <CreateBillModal open={open} onClose={handleClose} />
        </>
    );
};

export default CreateBillButton;

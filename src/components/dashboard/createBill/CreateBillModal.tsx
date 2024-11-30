import * as React from 'react';
import { Modal, Box, TextField, Button, Typography, Autocomplete, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { Item, SplitType } from '@/models/Item';
import { Member } from '@/models/Member';
import { UUID } from 'crypto';
import MemberSection from './MemberSection';
import ItemSection from './ItemSection';

interface CreateBillModalProps {
    open: boolean;
    onClose: () => void;
}

const currencies = [
    { label: 'USD', symbol: '$' },
    { label: 'EUR', symbol: '€' },
    { label: 'GBP', symbol: '£' },
    { label: 'JPY', symbol: '¥' },
    { label: 'AUD', symbol: 'A$' },
    { label: 'CAD', symbol: 'C$' },
    { label: 'CHF', symbol: 'CHF' },
    { label: 'CNY', symbol: '¥' },
    { label: 'SEK', symbol: 'kr' },
    { label: 'NZD', symbol: 'NZ$' }
];

const CreateBillModal: React.FC<CreateBillModalProps> = ({ open, onClose }) => {
    const [billData, setBillData] = React.useState<{
        title?: string;
        description?: string;
        currency?: string;
        totalAmount?: number;
        items?: Omit<Item, 'id'>[];
        members?: Omit<Member, 'id'>[];
    }>({
        title: '',
        description: '',
        currency: 'USD',
        totalAmount: 0,
        items: [],
        members: [],
    });


    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setBillData((prev) => ({ ...prev, [name]: value }));
    };

    const handleCurrencyChange = (event: any, newValue: any) => {
        if (newValue) {
            setBillData((prev) => ({ ...prev, currency: newValue.label }));
        }
    };

    const handleModalClose = () => {
        setBillData({
            title: '',
            description: '',
            currency: 'USD',
            totalAmount: 0,
            items: [],
            members: [],
        });
        onClose();
    };


    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log(billData)

        try {
            // const response = await fetch('/api/bill/create', {
            const response = await fetch('#', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(billData),
            });
            if (response.ok) {
                console.log('Bill created successfully');
                onClose(); // Close modal after successful submission
            } else {
                console.error('Error creating bill');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <Modal open={open} onClose={handleModalClose}>
            <Box sx={{
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
            }}>
                <Typography variant="h6" gutterBottom>
                    Create a New Bill
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Title"
                        name="title"
                        value={billData.title}
                        onChange={handleChange}
                        fullWidth
                        required
                        margin="normal"
                    />
                    <TextField
                        label="Description"
                        name="description"
                        value={billData.description}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                    />
                    <Autocomplete
                        options={currencies}
                        getOptionLabel={(option) => option.label + ' ' + option.symbol}
                        renderInput={(params) => (
                            <TextField {...params} label="Currency" margin="normal" fullWidth />
                        )}
                        onChange={handleCurrencyChange}
                        value={currencies.find(currency => currency.label === billData.currency) || null}
                    />

                    <ItemSection items={billData.items || []} setBillData={setBillData} />

                    <MemberSection members={billData.members || []} setBillData={setBillData} />


                    <Button type="submit" variant="contained" color="primary">
                        Submit
                    </Button>
                </form>
            </Box>
        </Modal>
    );
};

export default CreateBillModal;
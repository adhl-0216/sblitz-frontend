import React from 'react';
import ItemSection from '@/components/dashboard/billForm/ItemSection';
import MemberSection from '@/components/dashboard/billForm/MemberSection';
import { Autocomplete, Box, Button, TextField, Alert, Typography } from '@mui/material';
import { Item } from '@/models/Item';
import { Member } from '@/models/Member';
import { Bill } from '@/models/Bill';
import { Currencies } from '@/models/Currency';

interface BillFormProps {
    mode: 'create' | 'update';
    onSubmit: (bill: Bill) => void;
    initialData?: Partial<Bill>;
}

function BillForm({ mode, onSubmit, initialData = {} }: BillFormProps) {
    const [billData, setBillData] = React.useState<{
        title?: string;
        description?: string;
        currency?: string;
        totalAmount?: number;
        items?: Omit<Item, 'id'>[];
        members?: Omit<Member, 'id'>[];
    }>({
        title: initialData?.title || '',
        description: initialData?.description || '',
        currency: initialData?.currency || 'USD',
        totalAmount: initialData?.totalAmount || 0,
        items: initialData?.items || [],
        members: initialData?.members || [],
    });

    const [error, setError] = React.useState<string | null>(null);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setBillData((prev) => ({ ...prev, [name]: value }));
    };

    const handleCurrencyChange = (event: any, newValue: any) => {
        if (newValue) {
            setBillData((prev) => ({ ...prev, currency: newValue.label }));
        }
    };

    const validateBillData = (billData: {
        title?: string;
        description?: string;
        currency?: string;
        items?: Omit<Item, 'id'>[];
        members?: Omit<Member, 'id'>[];
    }) => {
        if (!billData.title) {
            return 'Title is required.';
        }

        if (!billData.currency) {
            return 'Currency is required.';
        }
        if (!billData.items || billData.items.length === 0) {
            return 'Please add at least one item to the bill.';
        }

        for (const item of billData.items) {
            if (!item.name) {
                return `Item name is required for "${item.name}".`;
            }
            if (item.price <= 0) {
                return `Item "${item.name}" must have a valid price greater than 0.`;
            }
            if (item.quantity <= 0) {
                return `Item "${item.name}" must have a valid quantity greater than 0.`;
            }
        }

        if (!billData.members || billData.members.length === 0) {
            return 'Please add at least one member to the bill.';
        }

        for (const member of billData.members) {
            if (!member.name) {
                return `Member name is required.`;
            }
        }

        return null;
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const validationError = validateBillData(billData);

        if (validationError) {
            setError(validationError);
            return;
        }

        setError(null);
        onSubmit(billData as Bill);
    };

    return (
        <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit}>
            {error && <Alert severity="error">{error}</Alert>}

            <TextField
                label="Title"
                name="title"
                value={billData.title}
                onChange={handleChange}
                fullWidth
                required
                margin="normal"
                error={!!error && !billData.title}
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
                options={Object.values(Currencies)}
                getOptionLabel={(option) => option.label + ' ' + option.symbol}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Currency"
                        margin="normal"
                        fullWidth
                        error={!!error && !billData.currency}
                    />
                )}
                onChange={handleCurrencyChange}
                value={Object.values(Currencies).find(currency => currency.label === billData.currency) || null}
            />

            <MemberSection members={billData.members || []} setBillData={setBillData} />
            <ItemSection items={billData.items || []} setBillData={setBillData} />

            <Typography variant="h6" sx={{ mt: 3 }}>
                Total Amount: {billData.currency} {billData.totalAmount?.toFixed(2) || '0.00'}
            </Typography>

            <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{ mt: 2, width: '100%' }}
            >
                {mode === 'create' ? 'Create Bill' : 'Update Bill'}
            </Button>
        </Box>
    );
}

export default BillForm;

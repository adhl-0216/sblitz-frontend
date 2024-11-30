import React from 'react'
import ItemSection from './ItemSection'
import MemberSection from './MemberSection'
import { Autocomplete, Box, Button, TextField } from '@mui/material'
import axios from 'axios';
import { Item } from '@/models/Item';
import { Member } from '@/models/Member';
import { Bill } from '@/models/Bill';


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


interface BillFormProps {
    onSubmit: (bill: Bill) => void
}

function BillForm({ onSubmit }: BillFormProps) {
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

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onSubmit(billData as Bill);
    };


    return (
        <Box
            component="form"
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit}>

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
        </Box>
    )
}

export default BillForm
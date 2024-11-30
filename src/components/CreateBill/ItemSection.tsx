import * as React from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { Item, SplitType } from '@/models/Item';
import { Member } from '@/models/Member';
import CurrencyInput, { CurrencyInputOnChangeValues } from 'react-currency-input-field';
import PriceInput from './PriceInput';

interface ItemSectionProps {
    items: Omit<Item, 'id'>[];
    setBillData: React.Dispatch<React.SetStateAction<{
        title?: string;
        description?: string;
        currency?: string;
        totalAmount?: number;
        items?: Omit<Item, 'id'>[];
        members?: Omit<Member, 'id'>[];
    }>>
}

const ItemSection: React.FC<ItemSectionProps> = ({ items, setBillData }) => {
    const [itemData, setItemData] = React.useState(items);

    const updateBill
        = (updatedItems: Omit<Item, 'id'>[]) => {
            const updatedTotalAmount = updatedItems.reduce((total, item) => total + item.price * item.quantity, 0);
            setBillData((prev) => ({
                ...prev,
                items: updatedItems,
                totalAmount: updatedTotalAmount,
            }));
        }

    const handleAddItem = () => {
        const newItem: Omit<Item, 'id'> = {
            name: '',
            price: 0.00,
            quantity: 0,
            splitType: SplitType.EQUAL,
            splits: []
        };

        setItemData((prev) => [
            ...prev,
            newItem,
        ]);
    };

    const handleNameChange = (index: number, newName: string) => {
        const updatedItems = [...itemData];
        updatedItems[index].name = newName;
        setItemData(updatedItems);
        updateBill(updatedItems)
    };

    const handleQuantityChange = (index: number, value: string) => {
        const updatedItems = [...itemData];
        const parsedQuantity = parseInt(value, 10);

        if (!isNaN(parsedQuantity) && parsedQuantity > 0) {
            updatedItems[index].quantity = parsedQuantity;
        } else {
            updatedItems[index].quantity = 0;
        }
        setItemData(updatedItems);
        updateBill(updatedItems)

    };

    const setItemPrice = (index: number, value: number): void => {
        const updatedItems = [...itemData];
        updatedItems[index].price = value;
        setItemData(updatedItems);
        updateBill(updatedItems)
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start', mb: '10px' }}>
            <Typography variant="subtitle1">Items</Typography>
            {itemData?.map((item, index) => (
                <Box key={index} sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', mb: 1 }}>
                    <TextField
                        label="Item Name"
                        value={item.name}
                        onChange={(e) => handleNameChange(index, e.target.value)}
                        fullWidth
                        required
                        margin="normal"
                        sx={{ mr: 1 }}
                    />
                    <PriceInput value={item.price} index={index} setItemPrice={setItemPrice} />
                    <TextField
                        label="Quantity"
                        value={item.quantity}
                        onChange={(e) => handleQuantityChange(index, e.target.value)}
                        fullWidth
                        required
                        margin="normal"
                        inputMode="numeric"
                    />
                </Box>
            ))}
            <Button
                variant="outlined"
                startIcon={<AddIcon />}
                sx={{ borderStyle: 'dashed', width: '100%' }}
                onClick={handleAddItem}
            >
                Add Item
            </Button>
        </Box>
    );
};

export default ItemSection;

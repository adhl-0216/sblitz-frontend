import * as React from 'react';
import { TextField } from '@mui/material';

interface PriceInputProps {
    value: number;
    index: number;
    setItemPrice: (index: number, value: number) => void;
}

const PriceInput: React.FC<PriceInputProps> = ({ value, index, setItemPrice }) => {
    const [inputValue, setInputValue] = React.useState<string>(value.toFixed(2));

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const input = e.target.value;

        if (/^\d+(\.\d{0,2})?$/.test(input) || input === "") {
            setInputValue(input);
        }
    };

    const handleBlur = () => {
        const numericValue = parseFloat(inputValue) || 0;
        setInputValue(numericValue.toFixed(2));
        setItemPrice(index, numericValue);
    };

    return (
        <TextField
            label="Price"
            title="Price"
            value={inputValue}
            onChange={handleInputChange}
            onBlur={handleBlur}
            fullWidth
            required
            margin="normal"
            inputMode="decimal"
        />
    );
};

export default PriceInput;

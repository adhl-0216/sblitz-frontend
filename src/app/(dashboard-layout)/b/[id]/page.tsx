'use client'
import { Bill } from '@/models/Bill';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { getErrorMessage } from '@/error';
import BillForm from '@/components/dashboard/billForm/BillForm';
import { Box, Stack, Typography } from '@mui/material';
import { AlertSeverity } from '@/types/alert';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { useAlert } from '@/hooks/useAlert';


export default function BillDetailsPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const [billDetails, setBillDetails] = useState<Bill | null>(null);
    const [error, setError] = useState<string | undefined>(undefined);
    const [billId, setBillId] = useState<string | null>(null);
    const { showAlert } = useAlert()

    useEffect(() => {
        const fetchBillId = async () => {
            const billIdParam = (await params).id;
            setBillId(billIdParam);
        };
        fetchBillId();
    }, []);

    useEffect(() => {
        if (billId) {
            fetchBillDetails();
        }
    }, [billId]);


    const fetchBillDetails = async () => {
        try {
            const response = await axios.get(`/api/bill/${billId}`);
            console.log(response.data)
            setBillDetails(response.data);
        } catch (error) {
            setError(getErrorMessage(error));
        }
    };

    if (error) {
        return <div>Error: {error}</div>;
    }


    const handleSubmit = async (billData: Bill) => {
        try {
            if (!billId) {
                console.error('Bill ID is required for updating.');
                return;
            }

            const response = await axios.put(`/api/bill/${billId}`, billData, {
                headers: { 'Content-Type': 'application/json' },
            });

            if (response.status == 200) {
                showAlert('Bill updated successfully!', AlertSeverity.Success);
                fetchBillDetails()
            }


        } catch (error) {
            console.error('Error submitting bill:', error);
        }
    };

    return (
        <>
            <Box>
                <Typography variant='h2'>Bill Details</Typography>

                {billDetails ? (
                    <Stack>
                        <Typography
                            sx={{
                                color: 'text.secondary',
                                mb: 1.5,
                                display: 'flex',
                                alignItems: 'center',
                            }}
                        >
                            <AccessTimeIcon fontSize="small" sx={{ mr: 1 }} />
                            {(() => {
                                const date = new Date(billDetails.updatedAt);
                                return date.toLocaleString('en-US', {
                                    year: 'numeric',
                                    month: '2-digit',
                                    day: '2-digit',
                                    hour: '2-digit',
                                    minute: '2-digit',
                                    hour12: false,
                                }).replace(',', ' at');
                            })()}

                        </Typography>
                        <BillForm
                            mode='update'
                            onSubmit={handleSubmit}
                            initialData={billDetails}
                        />
                    </Stack>

                ) : (
                    null
                )}
            </Box>
        </>
    );
}

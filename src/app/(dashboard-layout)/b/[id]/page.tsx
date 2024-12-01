'use client'
import { Bill } from '@/models/Bill';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { getErrorMessage } from '@/error';
import BillForm from '@/components/dashboard/billForm/BillForm';
import { Box } from '@mui/material';
import { AlertContext } from '@/app/(dashboard-layout)/layout';
import { AlertSeverity } from '@/types/alert';

export default function BillDetailsPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const [billDetails, setBillDetails] = useState<Bill | null>(null);
    const [error, setError] = useState<string | undefined>(undefined);
    const [billId, setBillId] = useState<string | null>(null);
    const alertContext = useContext(AlertContext);


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
                alertContext?.showAlert('Bill updated successfully!', AlertSeverity.Success);
                fetchBillDetails()
            }


        } catch (error) {
            console.error('Error submitting bill:', error);
        }
    };

    return (
        <>
            <Box>
                <h1>Bill Details</h1>
                {billDetails ? (
                    <BillForm
                        mode='update'
                        onSubmit={handleSubmit}
                        initialData={billDetails}
                    />
                ) : (
                    null
                )}
            </Box>
        </>
    );
}

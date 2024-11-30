'use client'
import { Bill } from '@/models/Bill';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { getErrorMessage } from '@/error';
import BillForm from '@/components/dashboard/billForm/BillForm';
import { Alert, Box, Snackbar } from '@mui/material';

export default function BillDetailsPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const [billDetails, setBillDetails] = useState<Bill | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | undefined>(undefined);
    const [billId, setBillId] = useState<string | null>(null);

    useEffect(() => {
        const fetchBillId = async () => {
            const billIdParam = (await params).id;
            setBillId(billIdParam);
        };

        fetchBillId();
    }, [params]);

    useEffect(() => {
        if (billId) {
            const fetchBillDetails = async () => {
                try {
                    const response = await axios.get(`/api/bill/${billId}`);
                    console.log(response.data)
                    setBillDetails(response.data);
                } catch (error) {
                    setError(getErrorMessage(error));
                } finally {
                    setLoading(false);
                }
            };

            fetchBillDetails();
        }
    }, [billId]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    const handleSubmit = (bill: Bill) => {
        // Handle the form submission logic here (e.g., save or update the bill)
        console.log('Submitted Bill:', bill);
    };

    // Map the fetched bill data to match the format expected by the BillForm component
    const initialFormData = billDetails ? {
        title: billDetails.title,
        description: billDetails.description || '',
        currency: billDetails.currency,
        totalAmount: billDetails.totalAmount,
        items: billDetails.items.map(item => ({
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            splitType: item.splitType,
            splits: item.splits
        })),
        members: billDetails.members.map(member => ({
            name: member.name,
            colorCode: member.colorCode
        }))
    } : null;

    return (
        <>

            <Box>
                <h1>Bill Details</h1>
                {initialFormData ? (
                    <BillForm
                        onSubmit={handleSubmit}
                        initialData={initialFormData}
                    />
                ) : (
                    <div>Loading bill form...</div>
                )}
                {/* <pre>
                {JSON.stringify(billDetails, null, 2)}
                </pre> */}
            </Box>
            {/* Snackbar for alerts */}
            {
                // alert && (
                //     <Snackbar open autoHideDuration={6000} onClose={handleAlertClose}>
                //         <Alert onClose={handleAlertClose} severity={alert.severity}>
                //             {alert.message}
                //         </Alert>
                //     </Snackbar>
                // )
            }
        </>
    );
}

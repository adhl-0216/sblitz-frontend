'use client';

import React, { useEffect, useState, useCallback } from 'react';
import axios, { AxiosError } from 'axios';
import BillCard from './BillCard';
import { getErrorMessage } from '@/error';
import { Bill } from '@/models/Bill';
import { Box, Grid2 as Grid, Skeleton, Typography, Button } from '@mui/material';
import CreateBillModal from '@/components/dashboard/billsContainer/CreateBillModal';
import { AlertSeverity } from '@/types/alert';

interface BillsContainerProps {
    showAlert: (message: string, severity: AlertSeverity) => void;
    onError?: (message: string) => void;
}

export default function BillsContainer({ showAlert, onError }: BillsContainerProps) {
    const [bills, setBills] = useState<Bill[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleError = useCallback((errorMessage: string) => {
        setError(errorMessage);
        showAlert(errorMessage, AlertSeverity.Error);
        if (onError) onError(errorMessage);
    }, [showAlert, onError]);

    const fetchBills = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get('/api/bill/all-bills');
            const billsData = response.data.map((bill: Bill) => ({
                ...bill,
                totalAmount: bill.totalAmount,
                createdAt: new Date(bill.createdAt),
                updatedAt: new Date(bill.updatedAt),
                items: bill.items || [],
                members: bill.members ? bill.members.map((member: any) => ({
                    name: member.name,
                    id: member.id,
                    colorCode: member.colorCode,
                })) : [],
            }));
            setBills(billsData);
        } catch (error) {
            const errorMessage = error instanceof AxiosError
                ? error.response?.data?.message || error.message
                : getErrorMessage(error);
            handleError(`Failed to fetch bills: ${errorMessage}`);
        } finally {
            setLoading(false);
        }
    }, [handleError]);

    useEffect(() => {
        fetchBills();
    }, [fetchBills]);

    const handleRetry = () => {
        fetchBills();
    };

    if (loading) {
        return (
            <Grid container spacing={2}>
                {[...Array(6)].map((_, index) => (
                    <Grid key={index}>
                        <Skeleton variant="rectangular" height={140} />
                        <Skeleton variant="text" />
                        <Skeleton variant="text" width="300px" />
                        <Skeleton variant="text" width="225px" />
                    </Grid>
                ))}
            </Grid>
        );
    }

    if (error) {
        return (
            <Box sx={{ textAlign: 'center', mt: 4 }}>
                <Typography variant="h6" color="error" gutterBottom>
                    {error}
                </Typography>
                <Button variant="contained" onClick={handleRetry} sx={{ mt: 2 }}>
                    Retry
                </Button>
            </Box>
        );
    }

    return (
        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, flexWrap: 'wrap' }}>
            <CreateBillModal
                refetchBills={fetchBills}
                showAlert={showAlert}
            />

            {bills.length === 0 ? (
                <Typography variant="body1">No bills found. Create a new bill to get started.</Typography>
            ) : (
                bills.map((bill) => (
                    <BillCard
                        key={bill.id}
                        billId={bill.id}
                        title={bill.title}
                        description={bill.description!}
                        lastUpdated={bill.updatedAt}
                        members={bill.members}
                        showAlert={showAlert}
                        refetchBills={fetchBills}
                    />
                ))
            )}
        </Box>
    );
}

'use client';

import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import BillCard from './BillCard';
import { getErrorMessage } from '@/error';
import { Bill } from '@/models/Bill';
import { Box, Grid2 as Grid, Skeleton } from '@mui/material';
import CreateBillModal from './createBill/CreateBillModal';

interface BillsContainerProps {
    showAlert: (message: string, severity: 'success' | 'error') => void
}

export default function BillsContainer({ showAlert }: BillsContainerProps) {
    const [bills, setBills] = useState<Bill[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | undefined>(undefined);

    const fetchBills = useCallback(async () => {
        setLoading(true);
        try {
            const response = await axios.get('/api/bill/all-bills');
            const billsData = response.data.map((bill: any) => ({
                ...bill,
                totalAmount: parseFloat(bill.total_amount),
                createdAt: new Date(bill.created_at),
                updatedAt: new Date(bill.updated_at),
                items: bill.items || [],
                members: bill.members ? bill.members.map((member: any) => ({
                    name: member.name,
                    id: member.id,
                    colorCode: member.colorCode,
                })) : [],
            }));
            setBills(billsData);
        } catch (error) {
            setError(getErrorMessage(error));
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchBills();
    }, [fetchBills]);

    const handleBillCreated = () => {
        fetchBills();
        showAlert('Bill created successfully!', 'success');
    };

    if (loading) {
        return (
            <Grid container spacing={2}>
                {[...Array(6)].map((_, index) => (
                    <Grid key={index}>
                        <Skeleton variant="rectangular" height={140} />
                        <Skeleton variant="text" />
                        <Skeleton variant="text" width="60%" />
                        <Skeleton variant="text" width="40%" />
                    </Grid>
                ))}
            </Grid>
        );
    }

    if (error) return <div>Error loading bills.</div>;

    return (
        <Box>
            <Grid container spacing={2}>
                <CreateBillModal refetchBills={fetchBills} showAlert={showAlert} />

                {bills.map((bill) => (
                    <BillCard
                        key={bill.id}
                        billId={bill.id}
                        title={bill.title}
                        description={bill.description!}
                        lastUpdated={bill.updatedAt}
                        members={bill.members}
                    />
                ))}
            </Grid>
        </Box>
    );
}

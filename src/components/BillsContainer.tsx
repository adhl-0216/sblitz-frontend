'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BillCard from './BillCard';
import { getErrorMessage } from '@/error';
import { Bill } from '@/models/Bill';
import { randomUUID, UUID } from 'crypto';
import { Member } from '@/models/Member';
import { v4 as uuidv4 } from 'uuid';
import { Grid2 as Grid, Skeleton } from '@mui/material';
import CreateBillButton from './CreateBill/CreateBillButton'; // Import CreateBillButton

export default function BillsContainer() {
    const [bills, setBills] = useState<Bill[]>([
        {
            id: uuidv4() as UUID,
            title: "Monthly Utility Bill",
            description: "This bill includes all utility charges for the month including electricity, water, and gas.",
            currency: "USD",
            totalAmount: 150,
            ownderId: "user-123",
            createdAt: new Date(),
            updatedAt: new Date(),
            items: [],
            members: [
                { name: 'Alice', memberId: "member-1" as UUID, colorCode: "#FF5733" },
                { name: 'Bob', memberId: "member-2" as UUID, colorCode: "#33FF57" },
                { name: 'Charlie', memberId: "member-3" as UUID, colorCode: "#3357FF" }
            ] as Member[]
        },
        {
            id: uuidv4() as UUID,
            title: "Dinner Bill",
            description: "This bill is for a dinner party with friends.",
            currency: "USD",
            totalAmount: 200,
            ownderId: "user-123",
            createdAt: new Date(),
            updatedAt: new Date(),
            items: [],
            members: [
                { name: 'David', memberId: "member-4" as UUID, colorCode: "#FF33A8" },
                { name: 'Eve', memberId: "member-5" as UUID, colorCode: "#33FFA8" }
            ] as Member[]
        },
        {
            id: uuidv4() as UUID,
            title: "Grocery Bill",
            description: "This bill includes all grocery purchases for the week.",
            currency: "USD",
            totalAmount: 75,
            ownderId: "user-456",
            createdAt: new Date(),
            updatedAt: new Date(),
            items: [],
            members: [
                { name: 'Frank', memberId: "member-6" as UUID, colorCode: "#FFB300" },
                { name: 'Grace', memberId: "member-7" as UUID, colorCode: "#00BFFF" }
            ] as Member[]
        },
        {
            id: uuidv4() as UUID,
            title: "Internet Bill",
            description: "Monthly internet service charge.",
            currency: "USD",
            totalAmount: 60,
            ownderId: "user-789",
            createdAt: new Date(),
            updatedAt: new Date(),
            items: [],
            members: [
                { name: 'Hank', memberId: "member-8" as UUID, colorCode: "#FF5733" },
                { name: 'Ivy', memberId: "member-9" as UUID, colorCode: "#33FF57" }
            ] as Member[]
        },
        {
            id: uuidv4() as UUID,
            title: "Electricity Bill",
            description: "Monthly electricity usage charge.",
            currency: "USD",
            totalAmount: 120,
            ownderId: "user-123",
            createdAt: new Date(),
            updatedAt: new Date(),
            items: [],
            members: [
                { name: 'Jack', memberId: "member-10" as UUID, colorCode: "#0000FF" },
                { name: 'Karen', memberId: "member-11" as UUID, colorCode: "#FFD700" }
            ] as Member[]
        }
    ]);

    const [loading] = useState(false); // Set loading to false since we're using hardcoded data
    const [error] = useState<string | undefined>(undefined); // No error handling needed for hardcoded data

    // Uncomment to fetch bills from API
    // useEffect(() => {
    //     const fetchBills = async () => {
    //         try {
    //             const response = await axios.get('/api/bill/all-bills');
    //             setBills(response.data);
    //         } catch (error) {
    //             setError(getErrorMessage(error));
    //         } finally {
    //             setLoading(false);
    //         }
    //     };
    //
    //     fetchBills();
    // }, []);

    if (loading) {
        return (
            <Grid container spacing={2}>
                {[...Array(6)].map((_, index) => ( // Display 6 skeletons as placeholders
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
        <div>
            <Grid container spacing={2}>
                <Grid  >
                    <CreateBillButton />
                </Grid>

                {/* Render bills */}
                {bills.length > 0 ? (
                    bills.map((bill) => (
                        <Grid key={bill.id}>
                            <BillCard
                                billId={bill.id}
                                title={bill.title}
                                description={bill.description!}
                                lastUpdated={bill.updatedAt}
                                members={bill.members}
                            />
                        </Grid>
                    ))
                ) : (
                    <div>No bills found.</div>
                )}
            </Grid>
        </div>
    );
}

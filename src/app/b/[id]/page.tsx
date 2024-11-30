'use client'
import { Bill } from '@/models/Bill';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { getErrorMessage } from '@/error';

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

    return (
        <div>
            <h1>Bill Details</h1>
            <pre>{JSON.stringify(billDetails, null, 2)}</pre>
        </div>
    );
}

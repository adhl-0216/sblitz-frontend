import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';
import MembersList from '@/components/dashboard/billsContainer/MembersList';
import { Member } from '@/models/Member';
import Link from 'next/link'; // Import Link from Next.js

interface BillCardProps {
    title: string;
    description: string;
    lastUpdated: Date;
    members: Member[];
    billId: string; // Add billId prop
}

export default function BillCard({ title, description, lastUpdated, members, billId }: BillCardProps) {
    const truncatedDescription = description.length > 100 ? `${description.substring(0, 97)}...` : description;

    return (
        <Card sx={{
            width: '300px', // Set a fixed width
            height: '225px', // Set height to maintain 4:3 aspect ratio
            position: 'relative',
            display: 'flex', // Use flexbox to align children
            flexDirection: 'column', // Stack children vertically
            color: 'inherit' // Inherit text color
        }} >
            <CardContent sx={{ flexGrow: 1, textDecoration: 'none', color: 'inherit' }} component={Link} href={billId}>
                <Typography gutterBottom variant="h6" component="div">
                    {title}
                </Typography>

                <Typography variant="body2">
                    {truncatedDescription}
                </Typography>
            </CardContent>
            <CardActions>
                <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>
                    Last Update: {lastUpdated.toLocaleString(undefined, {
                        year: 'numeric',
                        month: 'numeric',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: false
                    })}
                </Typography>
            </CardActions>
            <Box sx={{ position: 'absolute', bottom: 16, right: 16 }}>
                <MembersList members={members} />
            </Box>
        </Card>
    );
}

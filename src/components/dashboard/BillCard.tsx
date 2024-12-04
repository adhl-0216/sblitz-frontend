'use client'

import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Box, IconButton, Menu, MenuItem, ListItemIcon } from '@mui/material';
import MembersList from '@/components/dashboard/MembersList';
import { Member } from '@/models/Member';
import Link from 'next/link';
import axios from 'axios';

import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteIcon from '@mui/icons-material/Delete';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { AlertSeverity } from '@/types/alert';
import { useAlert } from '@/hooks/useAlert';


interface BillCardProps {
    title: string;
    description: string;
    lastUpdated: Date;
    members: Member[];
    billId: string;
    refetchBills: () => void;
}

export default function BillCard({ title, description, lastUpdated, members, billId, refetchBills }: BillCardProps) {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const { showAlert } = useAlert();

    const open = Boolean(anchorEl);

    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };



    const handleDelete = async () => {
        try {
            await axios.delete(`/api/bill/${billId}`);
            showAlert('Bill deleted successfully!', AlertSeverity.Success);
            refetchBills()
        } catch (error) {
            console.log(error)
            showAlert('Failed to delete the bill. Please try again.', AlertSeverity.Error);
        }
        handleMenuClose();
    };


    const truncatedDescription = description.length > 100 ? `${description.substring(0, 97)}...` : description;

    return (
        <Card
            sx={{
                width: '300px',
                height: '225px',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                color: 'inherit',
                transition: 'transform 0.3s ease-in-out',
                '&:hover': {
                    transform: 'scale(1.05)',
                },
            }}
        >
            <CardContent
                sx={{
                    flexGrow: 1,
                    textDecoration: 'none',
                    color: 'inherit',
                }}
                component={Link}
                href={`/b/${billId}`}
            >
                <Typography gutterBottom variant="h6" component="div">
                    {title}
                </Typography>

                <Typography variant="body2">{truncatedDescription}</Typography>
            </CardContent>
            <CardActions>
                <Typography
                    sx={{
                        color: 'text.secondary',
                        mb: 1.5,
                        display: 'flex',
                        alignItems: 'center',
                    }}
                >
                    <AccessTimeIcon fontSize="small" sx={{ mr: 1 }} />
                    {lastUpdated.toLocaleString(undefined, {
                        year: 'numeric',
                        month: 'numeric',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: false,
                    })}
                </Typography>
            </CardActions>

            <IconButton
                onClick={handleMenuOpen}
                sx={{
                    position: 'absolute',
                    top: 8,
                    right: 8,
                }}
            >
                <MoreVertIcon />
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleMenuClose}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
            >
                <MenuItem
                    onClick={handleDelete}
                    sx={{
                        color: 'error.main',
                        '&:hover': {
                            backgroundColor: 'error.dark',
                            color: 'white',
                        },
                    }}
                >
                    <ListItemIcon sx={{ color: 'inherit' }}>
                        <DeleteIcon fontSize="small" />
                    </ListItemIcon>
                    Delete
                </MenuItem>

            </Menu>
            <Box
                sx={{
                    position: 'absolute',
                    bottom: 16,
                    right: 16,
                }}
            >
                <MembersList members={members} />
            </Box>
        </Card>
    );
}

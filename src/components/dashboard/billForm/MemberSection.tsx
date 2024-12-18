import * as React from 'react';
import { Box, Button, IconButton, TextField, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { Member } from '@/models/Member';
import { UUID } from 'crypto';
import { Item } from '@/models/Item';

interface MemberSectionProps {
    members: Omit<Member, 'id'>[];
    setBillData: React.Dispatch<React.SetStateAction<{
        title?: string;
        description?: string;
        currency?: string;
        totalAmount?: number;
        items?: Omit<Item, 'id'>[];
        members?: Omit<Member, 'id'>[];
    }>>
}

const MemberSection: React.FC<MemberSectionProps> = ({ members, setBillData }) => {
    const handleAddMember = () => {
        const newMember = {
            name: '',
            memberId: crypto.randomUUID() as UUID,
            colorCode: '#FFFFFF'
        };
        setBillData((prev) => ({
            ...prev,
            members: [...(prev.members || []), newMember]
        }));
    };

    const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const updatedMembers = [...(members || [])];
        updatedMembers[index].colorCode = e.target.value;
        setBillData((prev) => ({
            ...prev,
            members: updatedMembers,
        }));
    };

    const handleNameChange = (index: number, newName: string) => {
        const updatedMembers = [...members!];
        updatedMembers[index].name = newName;
        setBillData((prevData) => ({
            ...prevData,
            members: updatedMembers,
        }));
    };

    const handleRemoveMember = (index: number) => {
        const updatedMembers = members.filter((_, i) => i !== index);
        setBillData((prevData) => ({
            ...prevData,
            members: updatedMembers,
        }));
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start', mb: 2 }}>
            <Typography variant="subtitle1">Members</Typography>
            {members?.map((member, index) => (
                <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 1, width: '100%', gap: 1 }}>
                    <IconButton
                        key={index}
                        sx={{
                            width: 48,
                            height: 48,
                            borderRadius: '50%',
                            backgroundColor: member.colorCode,
                            padding: 0,
                            cursor: 'pointer',
                            position: 'relative',
                        }}
                    >
                        <input
                            type="color"
                            value={member.colorCode}
                            onChange={(e) => handleColorChange(e, index)}
                            style={{
                                position: 'absolute',
                                opacity: 0,
                                width: '100%',
                                height: '100%',
                                cursor: 'pointer',
                                zIndex: 1,
                            }}
                        />
                    </IconButton>
                    <TextField
                        label="Member"
                        value={member.name}
                        onChange={(e) => handleNameChange(index, e.target.value)}
                        fullWidth
                        required
                        margin="normal"
                    />

                    <IconButton
                        onClick={() => handleRemoveMember(index)}
                        sx={{
                            color: 'error.main',
                        }}
                    >
                        <RemoveCircleOutlineIcon />
                    </IconButton>
                </Box>
            ))}
            <Button
                variant="outlined"
                startIcon={<AddIcon />}
                sx={{ borderStyle: 'dashed', width: '100%' }}
                onClick={handleAddMember}
            >
                Add Member
            </Button>
        </Box>
    );
};

export default MemberSection;

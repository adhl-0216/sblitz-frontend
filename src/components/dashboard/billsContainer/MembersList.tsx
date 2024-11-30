import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import { Member } from '@/models/Member';
import Link from 'next/link'; // Import Link for navigation
import { styled } from '@mui/material/styles'; // Import styled for custom styles

interface MembersListProps {
    members: Member[];
    displayMax?: number;
}

const StyledAvatar = styled(Avatar)(({ theme }) => ({
    textDecoration: 'none',
    transition: 'transform 0.3s ease',
    '&:hover': {
        transform: 'scale(1.2)',
        zIndex: 1,
    },
}));

function getInitials(name: string): string {
    const words = name.split(' ');
    const initials = words.map(word => word.charAt(0).toUpperCase()).join('');
    return initials;
}

export default function MembersList({ members, displayMax = 3 }: MembersListProps) {
    return (
        <AvatarGroup max={displayMax} spacing="small">
            {members.map((member) => {
                return (
                    <StyledAvatar
                        key={member.id}
                        alt={member.name}
                        title={member.name}
                        sx={{ bgcolor: member.colorCode }}
                    >
                        <Link href={`/u/${member.id}`} style={{ textDecoration: 'none', color: 'inherit' }} >
                            {getInitials(member.name)}
                        </Link>
                    </StyledAvatar>
                )
            })}
        </AvatarGroup>
    );
}

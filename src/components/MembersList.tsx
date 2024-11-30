import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import { Member } from '@/models/Member';
import Link from 'next/link'; // Import Link for navigation
import { styled } from '@mui/material/styles'; // Import styled for custom styles

interface MembersListProps {
    members: Member[];
}

const StyledAvatar = styled(Avatar)(({ theme }) => ({
    textDecoration: 'none',
    transition: 'transform 0.3s ease', // Animation for hover
    '&:hover': {
        transform: 'scale(1.2)', // Scale up on hover
        zIndex: 1, // Bring the hovered avatar to the front
    },
}));

function getInitials(name: string): string {
    const words = name.split(' ');
    const initials = words.map(word => word.charAt(0).toUpperCase()).join('');
    return initials;
}

export default function MembersList({ members }: MembersListProps) {
    return (
        <div>
            <AvatarGroup max={2} spacing="small">
                {members.map((member) => (
                    <StyledAvatar
                        key={member.memberId}
                        alt={member.name}
                        sx={{ bgcolor: member.colorCode }}
                    >
                        <Link href={`/u/${member.memberId}`} style={{ textDecoration: 'none', color: 'inherit' }} >
                            {getInitials(member.name)}
                        </Link>
                    </StyledAvatar>
                ))}
            </AvatarGroup>
        </div>
    );
}

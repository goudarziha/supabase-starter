import React, { useState, useEffect } from 'react';
import { Link as RouteLink } from 'react-router-dom';
import { Box, Center, Text, Stack, Avatar, Link } from '@chakra-ui/react';

interface IUserInfoBoxProps {
  user: any;
}

const UserInfoBox = ({
  user: { username, name, avatar_url, id, points },
}: IUserInfoBoxProps) => {
  return (
    <Box>
      <Link as={RouteLink} to={`/profile/${id}`}>
        <Center>
          <Stack direction={'column'}>
            <Avatar src={avatar_url} />
            <Text fontSize={'xs'}>{name}</Text>
            {points}
          </Stack>
        </Center>
      </Link>
    </Box>
  );
};
export default UserInfoBox;

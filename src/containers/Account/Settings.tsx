import { Heading, Box, Text } from '@chakra-ui/layout';
import React, { useState, useEffect } from 'react';

const Settings = () => {
  return (
    <Box px={{ base: '4', md: '10' }} maxW={'3xl'} py={16}>
      <Heading>Settings</Heading>
    </Box>
  );
};

export default Settings;

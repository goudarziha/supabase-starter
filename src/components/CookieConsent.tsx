import { Button, HStack, Link, StackProps, Text } from '@chakra-ui/react';
import * as React from 'react';

const CookieConsent = (props: StackProps) => (
  <HStack
    justify="center"
    spacing="4"
    p="4"
    bg="blue.700"
    zIndex={99}
    {...props}
  >
    <Text color="white" fontSize={{ base: 'sm', md: 'md' }}>
      By using our website, you agree to the use of cookies as described in our{' '}
      <Link href="#" textDecoration="underline">
        cookie policy
      </Link>
    </Text>
    <Button
      bg="white"
      color="black"
      _hover={{ bg: 'gray.100' }}
      size="sm"
      flexShrink={0}
    >
      Accept
    </Button>
  </HStack>
);

export default CookieConsent;

import {
  Box,
  Heading,
  HStack,
  SimpleGrid,
  Text,
  useColorModeValue as mode,
} from '@chakra-ui/react';
import * as React from 'react';
import { HiCheckCircle } from 'react-icons/hi';
import { PricingCard } from './PricingCard';

const FeatureItem: React.FC = ({ children }) => (
  <HStack>
    <Box
      flexShrink={0}
      as={HiCheckCircle}
      fontSize="xl"
      color={mode('blue.500', 'blue.300')}
    />
    <Text>{children}</Text>
  </HStack>
);

const Pricing = () => {
  return (
    <Box as="section" bg={mode('gray.50', 'gray.800')} py="20">
      <Box
        maxW={{ base: 'xl', md: '5xl' }}
        mx="auto"
        px={{ base: '6', md: '8' }}
      >
        <Box maxW="2xl" mx="auto" textAlign={{ sm: 'center' }}>
          <Text
            textTransform="uppercase"
            fontWeight="bold"
            letterSpacing="wide"
            mb="3"
            color={mode('gray.600', 'gray.400')}
          >
            Pricing
          </Text>
          <Heading
            as="h1"
            size="3xl"
            fontWeight="extrabold"
            letterSpacing="tight"
          >
            Simple pricing method
          </Heading>
          <Text mt="6" fontSize="xl" color={mode('gray.600', 'gray.400')}>
            Either pay for the simple features, or really get into it with
            analytics and more custom workouts
          </Text>
        </Box>
        <SimpleGrid
          alignItems="flex-start"
          mt="16"
          columns={{ base: 1, lg: 2 }}
          spacing="10"
        >
          <PricingCard
            colorScheme="blue"
            name="Beginner"
            price={0}
            duration="/ forever"
            description="Simple workout free forever"
            features={[
              '3 free workout creations',
              '2000 libero doloribus modi nostru',
              'Unlimited basic esse repudiandae exceptur',
              '90 cupiditate adipisci quibusdam',
            ]}
          />
          <PricingCard
            colorScheme="teal"
            name="Pro"
            price={2.99}
            duration="/ mo"
            description="Full features with all the bells and whistles"
            features={[
              'Unlimited workouts to create',
              'Unlimited workouts to remix',
              '20K libero doloribus modi nostru',
              'Unlimited ipsa esse repudiandae exceptur',
            ]}
          />
        </SimpleGrid>
        <Box
          mt="10"
          bg={mode('white', 'gray.700')}
          shadow="md"
          rounded="lg"
          px="10"
          pt="10"
          pb="12"
          mx="auto"
          maxW={{ base: 'lg', lg: 'unset' }}
        >
          <Text
            color={mode('blue.500', 'blue.300')}
            textTransform="uppercase"
            fontWeight="bold"
            letterSpacing="wide"
          >
            Features & Services
          </Text>
          <Text fontSize="3xl" mt="2" fontWeight="bold">
            Included in all plans
          </Text>
          <SimpleGrid columns={{ base: 1, lg: 2 }} mt="5" spacing="5">
            <FeatureItem>Pre-approvals & role-based control</FeatureItem>
            <FeatureItem>
              Explore all the available made workouts by other users
            </FeatureItem>
            <FeatureItem>
              Individual limits and policies for each person
            </FeatureItem>
            <FeatureItem>
              Full visibility over all payments in real time
            </FeatureItem>
          </SimpleGrid>
        </Box>
      </Box>
    </Box>
  );
};

export default Pricing;

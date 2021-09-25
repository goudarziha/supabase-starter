import React from "react";
import {
  Center,
  SimpleGrid,
  Text,
  Box,
  Stack,
  useColorModeValue as mode,
} from "@chakra-ui/react";
import {
  FaArrowRight,
  FaFileSignature,
  FaHandsHelping,
  FaHeadset,
} from "react-icons/fa";

interface IFeatureProps {
  icon: React.ReactElement;
  title: string;
  children: React.ReactNode;
}

const Feature = (props: IFeatureProps) => {
  const { title, children, icon } = props;
  return (
    <Box>
      <Box color={mode("blue.500", "blue.300")} fontSize="5xl">
        {icon}
      </Box>
      <Stack mt="6">
        <Text
          as="h3"
          color={mode("blue.500", "blue.300")}
          fontSize="xl"
          fontWeight="extrabold"
        >
          {title}
        </Text>
        <Text pr="6" lineHeight="tall">
          {children}
        </Text>
      </Stack>
    </Box>
  );
};
const Features = () => {
  return (
    <Center>
      <SimpleGrid
        columns={{ base: 1, md: 3 }}
        spacing={{ base: "12", md: "8" }}
      >
        <Feature title="Share files" icon={<FaFileSignature />}>
          Weather you are a beginner or a professional body-builder. Anyone can
          find workouts that suits them.
        </Feature>
        <Feature title="Connect with users" icon={<FaHeadset />}>
          Do you have the best workout routine, but no one to share it with?
          Well here is your chance to show the greatest routine to the world
        </Feature>
        <Feature title="Collaborate with partners" icon={<FaHandsHelping />}>
          This is a like-mindd community, dedicated to helping each other grow.
          Contribute to someone else's workout or get constructive comments on
          yours
        </Feature>
      </SimpleGrid>
    </Center>
  );
};

export default Features;

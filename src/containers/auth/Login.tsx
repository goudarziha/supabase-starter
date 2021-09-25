import React, { useState, useEffect } from 'react';
import { useHistory, Link as RouteLink } from 'react-router-dom';
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { supabase } from '../../supabase';

export default function SimpleCard() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const history = useHistory();
  const toast = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (values: any) => {
    try {
      setIsLoading(true);
      const { email, password } = values;
      const { data, error } = await supabase.auth.signIn({
        email,
        password,
      });
      if (error) {
        toast({
          title: 'Failure',
          description: error?.message,
          status: 'error',
          duration: 9000,
          isClosable: true,
        });
      }
      if (data) {
        toast({
          title: 'Success',
          description: 'You have logged in successfully!',
          status: 'success',
          position: 'top-right',
          duration: 9000,
          isClosable: true,
        });
        history.push('/account', {});
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}
    >
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>Sign in to your account</Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            to enjoy all of our cool <Link color={'blue.400'}>features</Link> ✌️
          </Text>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={4}>
              <FormControl id="email">
                <FormLabel>Email address</FormLabel>
                <Input
                  type="email"
                  {...register('email', { required: true })}
                />
              </FormControl>
              <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  {...register('password', {
                    required: true,
                  })}
                />
              </FormControl>
              <Stack spacing={10}>
                <Stack
                  direction={{ base: 'column', sm: 'row' }}
                  align={'start'}
                  justify={'space-between'}
                >
                  <Checkbox>Remember me</Checkbox>
                  <RouteLink to={'/forgot'} color={'blue.400'}>
                    Forgot password?
                  </RouteLink>
                </Stack>
                <Button
                  type={'submit'}
                  bg={'blue.400'}
                  color={'white'}
                  _hover={{
                    bg: 'blue.500',
                  }}
                >
                  Sign in
                </Button>
              </Stack>
            </Stack>
          </form>
        </Box>
        <Stack justify={'center'}>
          <RouteLink to="/register">Don't have an account?</RouteLink>
        </Stack>
      </Stack>
    </Flex>
  );
}

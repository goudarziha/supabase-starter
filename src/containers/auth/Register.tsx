import React, { useState, useEffect } from 'react';
import { Link as RouteLink, useHistory } from 'react-router-dom';
import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Checkbox,
    Stack,
    LinkOverlay,
    Button,
    Heading,
    Text,
    useColorModeValue,
    useToast,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { supabase } from '../../supabase';

const Register = () => {
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
            const { username, email, password } = values;
            const { user, session, error } = await supabase.auth.signUp({
                email,
                password,
            });
            if (user) {
                history.push('/', {});
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
                    <Heading fontSize={'4xl'}>
                        Sign up for a new account
                    </Heading>
                    <Text fontSize={'lg'} color={'gray.600'}>
                        to enjoy all of our cool{' '}
                        <RouteLink to="/features">features</RouteLink> ✌️
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
                            <FormControl id="username" isInvalid={errors.name}>
                                <FormLabel>Username</FormLabel>
                                <Input
                                    type="text"
                                    {...register('username', {
                                        required: true,
                                    })}
                                />
                            </FormControl>
                            <FormControl id="email" isInvalid={errors.name}>
                                <FormLabel>Email address</FormLabel>
                                <Input
                                    type="email"
                                    {...register('email', {
                                        required: true,
                                    })}
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
                            <FormControl id="confirm_password">
                                <FormLabel>Repeat Password</FormLabel>
                                <Input
                                    type="password"
                                    {...register('confirm_password', {
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
                                    <RouteLink to="/forgot" color={'blue.400'}>
                                        Forgot password?
                                    </RouteLink>
                                </Stack>
                                <Button
                                    isLoading={isLoading}
                                    type="submit"
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
                    <RouteLink to="/login" color={'blue.400'}>
                        Already have an account?
                    </RouteLink>
                </Stack>
            </Stack>
        </Flex>
    );
};

export default Register;

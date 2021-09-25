import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
    Button,
    FormControl,
    Flex,
    Heading,
    Input,
    Stack,
    Text,
    useColorModeValue,
    useToast,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { supabase } from '../../supabase';

type ForgotPasswordFormInputs = {
    email: string;
};

const ForgotPassword = () => {
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
            const { email } = values;
            const { data, error } =
                await supabase.auth.api.resetPasswordForEmail(email);
            if (error) throw error;
            history.push('/', {});
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
            <Stack
                spacing={4}
                w={'full'}
                maxW={'md'}
                bg={useColorModeValue('white', 'gray.700')}
                rounded={'xl'}
                boxShadow={'lg'}
                p={6}
                my={12}
            >
                <Heading lineHeight={1.1} fontSize={{ base: '2xl', md: '3xl' }}>
                    Forgot your password?
                </Heading>
                <Text
                    fontSize={{ base: 'sm', sm: 'md' }}
                    color={useColorModeValue('gray.800', 'gray.400')}
                >
                    You&apos;ll get an email with a reset link
                </Text>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <FormControl id="email">
                        <Input
                            placeholder="your-email@example.com"
                            _placeholder={{ color: 'gray.500' }}
                            type="email"
                            {...register('email', { required: true })}
                        />
                    </FormControl>
                    <Stack spacing={6}>
                        <Button
                            type="submit"
                            isLoading={isLoading}
                            bg={'blue.400'}
                            color={'white'}
                            _hover={{
                                bg: 'blue.500',
                            }}
                        >
                            Request Reset
                        </Button>
                    </Stack>
                </form>
            </Stack>
        </Flex>
    );
};

export default ForgotPassword;

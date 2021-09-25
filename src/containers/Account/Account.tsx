import React, { useState, useEffect } from 'react';
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  HStack,
  Input,
  Stack,
  StackDivider,
  Text,
  Textarea,
  useColorModeValue,
  VStack,
  StackProps,
  SelectProps,
  Select,
  useToast,
} from '@chakra-ui/react';
import { HiCloudUpload } from 'react-icons/hi';
import { Link as RouteLink } from 'react-router-dom';
import { FaGithub, FaGoogle } from 'react-icons/fa';
import { supabase } from '../../supabase';
import { useAuth } from '../../Auth';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import {
  ICountry,
  ICurrency,
  ILanguage,
  IUser,
  IUserProfile,
} from '../../types';
import { UserCard } from '../../components';

interface FieldGroupProps extends StackProps {
  title?: string;
}

interface CustomSelectProps extends SelectProps {
  countries?: Array<ICountry>;
  currencies?: Array<ICurrency>;
  languages?: Array<ILanguage>;
  register?: any;
}

interface IUserProfileForm {
  name?: string;
  city?: string;
  country?: string;
  description?: string;
  website?: string;
  facebook?: string;
  instagram?: string;
  twitter?: string;
}

const FieldGroup = (props: FieldGroupProps) => {
  const { title, children, ...flexProps } = props;
  return (
    <Stack
      direction={{ base: 'column', md: 'row' }}
      spacing="6"
      py="4"
      {...flexProps}
    >
      <Box minW="3xs">
        {title && (
          <Heading as="h2" fontWeight="semibold" fontSize="lg" flexShrink={0}>
            {title}
          </Heading>
        )}
      </Box>
      {children}
    </Stack>
  );
};

const LanguageSelect = ({ register, languages }: CustomSelectProps) => (
  <FormControl id="language">
    <FormLabel>Display Language</FormLabel>
    <Select maxW="2xs" {...register('language')}>
      <option>English</option>
      <option>Spanish</option>
    </Select>
  </FormControl>
);

const CurrencySelect = ({ register, currencies }: CustomSelectProps) => (
  <FormControl id="currency">
    <FormLabel>Display currency</FormLabel>
    <Select maxW="2xs" {...register('currency')}>
      <option>USD ($)</option>
      <option>EUR (€)</option>
    </Select>
  </FormControl>
);

const CountrySelect = ({ register, countries }: CustomSelectProps) => (
  <FormControl id="country">
    <FormLabel>Country</FormLabel>
    <Select maxW={'full'} {...register('country')}>
      {countries &&
        countries?.map((country) => {
          return (
            <option key={country.id} value={country.id}>
              {country.name}
            </option>
          );
        })}
    </Select>
  </FormControl>
);

const Account = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [countries, setCountries] = useState<Array<ICountry>>([]);
  const [userProfile, setUserProfile] = useState<IUserProfile>();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const history = useHistory();
  const { user } = useAuth();
  const toast = useToast();

  useEffect(() => {
    getUserProfile(user);
    getCountriesList(setCountries);
  }, [user]);

  useEffect(() => {
    userProfile && setUserProfileData(userProfile);
  }, [userProfile]);

  const getUserProfile = async (user: IUser) => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('profiles')
        .select('*,country(*)')
        .eq('id', user.id)
        .single();

      if (error) throw error;
      if (data) setUserProfile(data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const getCountriesList = async (setCountries: any) => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase.from('countries').select();
      if (error) throw error;
      setCountries(data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = async (profile: IUserProfileForm) => {
    try {
      setIsLoading(true);
      const {
        name,
        description,
        website,
        twitter,
        instagram,
        facebook,
        country,
      } = profile;
      const countryCode = Number(country);
      const { data, error } = await supabase.from('profiles').update({
        name,
        description,
        website,
        twitter,
        instagram,
        facebook,
        country: countryCode,
      });
      if (error) throw error;
      if (data) {
        toast({
          title: 'Success',
          description: 'You have updated your profile.',
          status: 'success',
          position: 'top-right',
          duration: 9000,
          isClosable: true,
        });
        history.push('/account');
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const setUserProfileData = (data: IUserProfile) => {
    setValue('name', data?.name);
    setValue('description', data?.description);
    setValue('city', data?.city);
    setValue('country', data?.country?.id);
    setValue('website', data?.website);
    setValue('facebook', data?.facebook);
    setValue('twitter', data?.twitter);
    setValue('instagram', data?.instagram);
  };

  return (
    <Box px={{ base: '4', md: '10' }} py="16" maxWidth="3xl" mx="auto">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing="4" divider={<StackDivider />}>
          <Heading size="lg" as="h1" paddingBottom="4">
            Account Settings
          </Heading>
          <FieldGroup title="Personal Info">
            <VStack width="full" spacing="6">
              <FormControl id="name">
                <FormLabel>Name</FormLabel>
                <Input type="text" maxLength={255} {...register('name')} />
              </FormControl>

              <FormControl id="email">
                <FormLabel>Email</FormLabel>
                <Input type="email" isReadOnly value={user?.email} />
              </FormControl>

              <FormControl id="city">
                <FormLabel>City</FormLabel>
                <Input type="text" maxLength={255} {...register('city')} />
              </FormControl>

              <CountrySelect countries={countries} register={register} />

              <FormControl id="bio">
                <FormLabel>Bio</FormLabel>
                <Textarea rows={5} {...register('description')} />
                <FormHelperText>
                  Brief description for your profile. URLs are hyperlinked.
                </FormHelperText>
              </FormControl>
            </VStack>
          </FieldGroup>
          <FieldGroup title="Profile Photo">
            <Stack direction="row" spacing="6" align="center" width="full">
              <Avatar
                size="xl"
                name="Alyssa Mall"
                src="https://images.unsplash.com/photo-1488282396544-0212eea56a21?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
              />
              <Box>
                <HStack spacing="5">
                  <Button leftIcon={<HiCloudUpload />}>Change photo</Button>
                  <Button variant="ghost" colorScheme="red">
                    Delete
                  </Button>
                </HStack>
                <Text
                  fontSize="sm"
                  mt="3"
                  color={useColorModeValue('gray.500', 'whiteAlpha.600')}
                >
                  .jpg, .gif, or .png. Max file size 700K.
                </Text>
              </Box>
            </Stack>
          </FieldGroup>

          <FieldGroup title="Socials">
            <VStack width="full" spacing="6">
              <FormControl id="website">
                <FormLabel>Website</FormLabel>
                <Input type="text" {...register('website')} />
              </FormControl>
              <FormControl id="facebook">
                <FormLabel>Facebook</FormLabel>
                <Input type="text" {...register('facebook')} />
              </FormControl>
              <FormControl id="instagram">
                <FormLabel>Instagram</FormLabel>
                <Input type="text" {...register('instagram')} />
              </FormControl>
              <FormControl id="twitter">
                <FormLabel>Twitter</FormLabel>
                <Input type="text" {...register('twitter')} />
              </FormControl>
            </VStack>
          </FieldGroup>

          <FieldGroup title="Language">
            <VStack width="full" spacing="6">
              <LanguageSelect register={register} />
              <CurrencySelect register={register} />
            </VStack>
          </FieldGroup>
          <FieldGroup title="Notifications">
            <Stack width="full" spacing="4">
              <Checkbox>Get updates about the latest meetups.</Checkbox>
              <Checkbox>
                Get notifications about your account activities
              </Checkbox>
            </Stack>
          </FieldGroup>
          {/* <FieldGroup title="Connect accounts">
          <HStack width="full">
            <Button variant="outline" leftIcon={<FaGithub />}>
              Connect Github
            </Button>
            <Button
              variant="outline"
              leftIcon={<Box as={FaGoogle} color="red.400" />}
            >
              Connect Google
            </Button>
          </HStack>
        </FieldGroup> */}
        </Stack>
        <FieldGroup mt="8">
          <HStack width="full">
            <Button type="submit" colorScheme="blue" isLoading={isLoading}>
              Save Changes
            </Button>
            <Button variant="outline" as={RouteLink} to="/">
              Cancel
            </Button>
          </HStack>
        </FieldGroup>
      </form>
    </Box>
  );
};

export default Account;

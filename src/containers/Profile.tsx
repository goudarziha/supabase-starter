import React, { useState, useEffect } from "react";
import { Box, Flex, Stack, Text } from "@chakra-ui/layout";
import { RouteComponentProps } from "react-router";
import { UserCard } from "../components";
import { supabase } from "../supabase";
import { IWorkout } from "../types";

interface IProfileProps {
  uid: string;
}

const Profile = ({
  match: {
    params: { uid },
  },
}: RouteComponentProps<IProfileProps>) => {
  const [isLoading, setisLoading] = useState<boolean>(false);
  const [workouts, setworkouts] = useState<Array<IWorkout>>();

  useEffect(() => {
    getUserWorkouts(uid);
  }, [uid]);

  const getUserWorkouts = async (uid: string) => {
    try {
      setisLoading(true);
      const { data, error } = await supabase
        .from("workout")
        .select("*,creator(*)")
        .eq("creator", uid);
      if (error) throw error;
      if (data) setworkouts(data);
    } catch (error) {
      console.log(error);
    } finally {
      setisLoading(false);
    }
  };

  return (
    <Box as={"section"} py={12}>
      <Box
        maxW={{ base: "xl", md: "7xl" }}
        mx="auto"
        px={{ base: "6", md: "8" }}
      >
        <Flex direction={"row"}>
          <Box>
            <UserCard uid={uid} />
          </Box>
        </Flex>
      </Box>
    </Box>
  );
};

export default Profile;

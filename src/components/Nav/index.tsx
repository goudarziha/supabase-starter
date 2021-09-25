import {
  Box,
  Center,
  useColorModeValue as mode,
  Button,
  Link,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
} from "@chakra-ui/react";
import * as React from "react";
import { Link as RouteLink } from "react-router-dom";
import { Logo } from "../Logo";
import { Navbar } from "./Navbar";
import { NavLink } from "./NavLink";
import { UserProfile } from "./UserProfile";
import { useAuth } from "../../Auth";
import { IUser } from "../../types";
import { supabase } from "../../supabase";
import { useHistory } from "react-router-dom";
import {
  CalendarIcon,
  InfoIcon,
  LockIcon,
  SettingsIcon,
  StarIcon,
} from "@chakra-ui/icons";

const Navigation = () => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const { user } = useAuth();
  const history = useHistory();
  React.useEffect(() => {
    getUserProfile(user);
  }, [user]);

  const getUserProfile = async (user: IUser) => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from("profiles")
        .select()
        .eq("id", user.id)
        .single();

      if (error) {
        throw error;
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      history.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box minH="8rem">
      <Navbar>
        <Navbar.Brand>
          <Center marginEnd="10">
            <Logo h="6" iconColor={mode("blue.600", "blue.300")} />
          </Center>
        </Navbar.Brand>
        <Navbar.Links>
          <NavLink>Pricing</NavLink>
          <NavLink as={RouteLink} to={"/about"}>
            About
          </NavLink>
        </Navbar.Links>
        {user ? (
          <Navbar.UserProfile>
            <Menu isLazy>
              <MenuButton>
                <UserProfile
                  name={user?.name}
                  avatarUrl="https://ca.slack-edge.com/T024F7F15-UJVQ359SP-81fc55875723-512"
                  email={user?.email}
                />
              </MenuButton>
              <MenuList>
                <MenuItem as={RouteLink} to={"/account"} icon={<InfoIcon />}>
                  Account
                </MenuItem>
                <MenuItem
                  as={RouteLink}
                  to={"/analytics"}
                  icon={<CalendarIcon />}
                >
                  Analytics
                </MenuItem>
                <MenuItem
                  as={RouteLink}
                  to={"/settings"}
                  icon={<SettingsIcon />}
                >
                  Settings
                </MenuItem>
                <MenuDivider />
                <MenuItem onClick={handleLogout} icon={<LockIcon />}>
                  Log Out
                </MenuItem>
              </MenuList>
            </Menu>
          </Navbar.UserProfile>
        ) : (
          <Navbar.Register>
            <Link as={RouteLink} to={"/login"}>
              <Text fontWeight={"bold"}>Sign in</Text>
            </Link>
            <Button
              as={RouteLink}
              to={"/register"}
              bg={"blue.600"}
              color={"white"}
            >
              Sign Up
            </Button>
          </Navbar.Register>
        )}
      </Navbar>
    </Box>
  );
};

export default Navigation;

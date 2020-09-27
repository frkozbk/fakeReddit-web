import React from "react";
import NextLink from "next/link";
import { Button, Flex } from "@chakra-ui/core";
import { DarkModeSwitch } from "../components/DarkModeSwitch";
const Header = () => {
    return (
        <Flex
            as="nav"
            align="center"
            justify="flex-end"
            wrap="wrap"
            padding="1.9rem"
            bg="blue.900"
            color="white"
        >
            <NextLink href="/login">
                <Button variantColor="white" mr="6" variant="link">
                    Login
                </Button>
            </NextLink>

            <Button variantColor="white" variant="link">
                Logout
            </Button>
        </Flex>
    );
};

export default Header;

import React, { useEffect } from "react";
import NextLink from "next/link";
import { Button, Flex } from "@chakra-ui/core";
import { isServer } from "../utils/isServer";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";
const Header = () => {
    const [{ fetching: logoutFetching }, logout] = useLogoutMutation();
    const [{ data, fetching }] = useMeQuery({
        pause: isServer(),
    });
    useEffect(() => {
        console.log(data?.me);
    });
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
            {data?.me ? (
                <Button
                    as="a"
                    variantColor="white"
                    variant="link"
                    onClick={() => logout()}
                >
                    Logout
                </Button>
            ) : (
                <NextLink href="/login">
                    <Button as="a" variantColor="white" mr="6" variant="link">
                        Login
                    </Button>
                </NextLink>
            )}
        </Flex>
    );
};

export default Header;

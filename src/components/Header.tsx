import React, { useEffect } from "react";
import NextLink from "next/link";
import { isServer } from "../utils/isServer";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";
import { useAuth } from "../Hocs/withAuth";

const Header = () => {
    const { user } = useAuth();
    useEffect(() => {
        console.log(user);
    });
    return (
        <nav className="flex items-center justify-between h-16 px-5 xl:px-64 bg-gradient-to-r to-blue-500 from-green-500">
            <h4 className="text-2xl text-white">FakeReddit</h4>
            <div className="flex items-center">
                {user ? (
                    <p className="text-white mr-2">{user.username}</p>
                ) : (
                    <></>
                )}
                {user ? (
                    <>
                        <button className="text-white" onClick={() => {}}>
                            Logout
                        </button>
                    </>
                ) : (
                    <NextLink href="/login">
                        <a className="text-white">Login</a>
                    </NextLink>
                )}
            </div>
        </nav>
    );
};

export default Header;

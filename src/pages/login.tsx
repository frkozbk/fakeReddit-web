import React from "react";
import {
    Button,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
} from "@chakra-ui/core";
import styles from "../styles/register.module.css";
import { DarkModeSwitch } from "../components/DarkModeSwitch";
import { useRouter } from "next/router";
import { useLoginMutation } from "../generated/graphql";
import { useForm } from "react-hook-form";

import { withoutAuth } from "../Hocs/withAuth";
interface Inputs {
    usernameOrEmail: string;
    password: string;
}

const Login = () => {
    const router = useRouter();
    const [loginMutation, { loading, data }] = useLoginMutation();
    const { register, handleSubmit, setError, errors } = useForm<Inputs>();
    const onSubmit = async (loginData: Inputs) => {
        const { data } = await loginMutation({ variables: loginData });
        if (data?.login.user) {
            router.push("/");
            return;
        }
        if (data?.login.errors?.length) {
            const { errors } = data.login;
            errors.forEach((error: any) => {
                setError(error.field, {
                    type: "manual",
                    message: error.message,
                });
            });
        }
    };
    return (
        <div className={styles.register}>
            <DarkModeSwitch />
            <form
                className={styles.formContainer}
                onSubmit={handleSubmit(onSubmit)}
            >
                <FormControl mb="2" isInvalid={!!errors.usernameOrEmail}>
                    <FormLabel htmlFor="usernameOrEmail">
                        Username or Email Address
                    </FormLabel>
                    <Input
                        type="text"
                        id="usernameOrEmail"
                        name="usernameOrEmail"
                        defaultValue="frk_ozbk"
                        aria-describedby="usernameOrEmail-helper-text"
                        ref={register({ required: true })}
                    />
                    <FormErrorMessage>
                        {errors.usernameOrEmail?.message}
                    </FormErrorMessage>
                </FormControl>
                <FormControl mb="5" isInvalid={!!errors.password}>
                    <FormLabel htmlFor="password">Password</FormLabel>
                    <Input
                        type="password"
                        id="password"
                        name="password"
                        defaultValue="123qwe"
                        aria-describedby="password-helper-text"
                        ref={register({ required: true })}
                    />
                    <FormErrorMessage>
                        {errors.password?.message}
                    </FormErrorMessage>
                </FormControl>
                <Button
                    type="submit"
                    isLoading={loading}
                    loadingText="Submitting"
                    variantColor="teal"
                    variant="solid"
                    size="md"
                    mx="auto"
                >
                    Login
                </Button>
            </form>
        </div>
    );
};

export default withoutAuth(Login);

import React from "react";
import {
    Button,
    FormControl,
    FormHelperText,
    FormLabel,
    Input,
    FormErrorMessage,
} from "@chakra-ui/core";
import styles from "../styles/register.module.css";
import { DarkModeSwitch } from "../components/DarkModeSwitch";
import { useRegisterMutation } from "../generated/graphql";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { withoutAuth } from "../Hocs/withAuth";

type Inputs = {
    username: string;
    email: string;
    password: string;
};

const Register = () => {
    const router = useRouter();
    const [registerMutation, { loading }] = useRegisterMutation();
    const { register, handleSubmit, setError, errors } = useForm<Inputs>();
    const onSubmit = async (args: Inputs) => {
        const { data } = await registerMutation({ variables: args });
        if (data?.register.user) {
            router.push("/");
            return;
        }
        if (data?.register.errors?.length) {
            const { errors } = data.register;
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
                <FormControl mb="2" isInvalid={!!errors.username}>
                    <FormLabel htmlFor="username">Username</FormLabel>
                    <Input
                        type="text"
                        name="username"
                        id="username"
                        aria-describedby="username-helper-text"
                        ref={register({ required: true })}
                    />
                    <FormErrorMessage>
                        {errors.username?.message}
                    </FormErrorMessage>
                </FormControl>
                <FormControl mb="2" isInvalid={!!errors.email}>
                    <FormLabel htmlFor="email">Email Address</FormLabel>
                    <Input
                        type="email"
                        name="email"
                        id="email"
                        aria-describedby="email-helper-text"
                        ref={register({ required: true })}
                    />
                    <FormHelperText id="email-helper-text">
                        We'll never share your email.
                    </FormHelperText>
                    <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
                </FormControl>
                <FormControl mb="5" isInvalid={!!errors.password}>
                    <FormLabel htmlFor="password">Password</FormLabel>
                    <Input
                        type="password"
                        id="password"
                        name="password"
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
                    size="lg"
                    mx="auto"
                >
                    Register
                </Button>
            </form>
        </div>
    );
};

export default withoutAuth(Register);

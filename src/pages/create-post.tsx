import {
    Button,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
    Textarea,
} from "@chakra-ui/core";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { LoginMutation, useCreatePostMutation } from "../generated/graphql";

type Inputs = {
    title: string;
    content: string;
};

const createPost = () => {
    const router = useRouter();
    const { register, handleSubmit, errors } = useForm<Inputs>();
    const [{ fetching }, loginMutation] = useCreatePostMutation();
    const onSubmit = async (args: Inputs) => {
        await loginMutation(args);
    };

    return (
        <form
            className="w-full px-5 max-w-2xl mx-auto"
            onSubmit={handleSubmit(onSubmit)}
        >
            <FormControl mb="2" isInvalid={!!errors.title}>
                <FormLabel htmlFor="title">Title</FormLabel>
                <Input
                    type="text"
                    name="title"
                    id="title"
                    placeholder="Title"
                    aria-describedby="title-helper-text"
                    ref={register({
                        required: "This input is required.",
                        maxLength: {
                            value: 100,
                            message: "This input exceed maxLength.",
                        },
                    })}
                />
                <FormErrorMessage>{errors.title?.message}</FormErrorMessage>
            </FormControl>
            <FormControl mb="2" isInvalid={!!errors.content}>
                <FormLabel htmlFor="title">Content</FormLabel>
                <Textarea
                    name="content"
                    id="content"
                    className="mb-2"
                    placeholder="Here is a sample placeholder"
                    ref={register({
                        required: "This input is required.",
                        maxLength: {
                            value: 100,
                            message: "This input exceed maxLength.",
                        },
                    })}
                />
                <FormErrorMessage>{errors.content?.message}</FormErrorMessage>
            </FormControl>
            <Button
                type="submit"
                isLoading={fetching}
                loadingText="Submitting"
                variantColor="teal"
                variant="solid"
                size="md"
                mx="auto"
                w="100%"
            >
                Create a Post
            </Button>
        </form>
    );
};

export default createPost;

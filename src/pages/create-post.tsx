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
import {
    CreatePostDocument,
    LoginMutation,
    PostsDocument,
    useCreatePostMutation,
} from "../generated/graphql";
import {
    useAuth,
    withAuth,
    withAuthRedirect,
    withoutAuth,
} from "../Hocs/withAuth";

type Inputs = {
    title: string;
    content: string;
};

const CreatePost: React.FC = () => {
    const router = useRouter();
    const { register, handleSubmit, errors } = useForm<Inputs>();
    const [loginMutation, { loading }] = useCreatePostMutation();
    const onSubmit = (args: Inputs) => {
        loginMutation({
            variables: { ...args },
            optimisticResponse: {
                __typename: "Mutation",
                createPost: {
                    __typename: "Post",
                    content: args.content,
                    title: args.title,
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString(),
                    id: Math.random() * 999999999,
                    voteCount: 5,
                },
            },
            // update: (cache, { data: post }) => {
            //     const data = cache.readQuery({ query: PostsDocument });
            //     cache.writeQuery({
            //         query: PostsDocument,
            //         data: {
            //             ...data,
            //             posts: [post, ...data.posts],
            //         },
            //     });
            // },
        });
        router.push("/");
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

export default withAuth(CreatePost);

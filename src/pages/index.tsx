import { Button, Flex } from "@chakra-ui/core";
import Link from "next/link";
import { useEffect } from "react";
import { UseQueryResponse } from "urql";
import Header from "../components/Header";
import Post from "../components/Post";
import { PostsQuery, usePostsQuery } from "../generated/graphql";
type PropType = {
    posts: post[];
};

export type post = {
    id: number;
    createdAt: string;
    updatedAt: string;
    title: string;
    content: string;
    voteCount: number;
};
const Index = (props: PropType) => {
    const [{ fetching, data }, reFetchPost] = usePostsQuery();
    return (
        <>
            <Header />
            <main className="max-w-4xl mx-auto p-5">
                <Flex as="div" justify="flex-end" mb="2">
                    <Link href="/create-post">
                        <Button as="a">Create A Post</Button>
                    </Link>
                </Flex>
                {data?.posts.map((post) => (
                    <Post {...post} />
                ))}
            </main>
        </>
    );
};
export default Index;

import { Button, Flex } from "@chakra-ui/core";
import Link from "next/link";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import Post from "../components/Post";
import {
    Post as PostType,
    PostsDocument,
    PostsQuery,
    usePostsQuery,
    useVoteMutation,
} from "../generated/graphql";
import { useAuth } from "../Hocs/withAuth";
import withApollo from "../utils/withApolloClient";
type PropType = {
    posts: PostsQuery[];
};
const Index = (props: PropType) => {
    const { user } = useAuth();
    const [voteMutation] = useVoteMutation();
    const { data, fetchMore, loading } = usePostsQuery();
    const handleVote = (newVoteStatus: number, postId: number): void => {
        voteMutation({
            variables: { postId, voteStatus: newVoteStatus },
            update: (cache) => {
                const { posts: oldPosts }: any = cache.readQuery({
                    query: PostsDocument,
                });
                const newPosts = oldPosts.map((post: PostType) => {
                    if (post.id === postId) {
                        return {
                            ...post,
                            voteStatus: newVoteStatus,
                            voteCount: post.voteStatus
                                ? post.voteCount + 2 * newVoteStatus
                                : post.voteCount + newVoteStatus,
                        };
                    }
                    return post;
                });
                cache.writeQuery({
                    query: PostsDocument,
                    data: {
                        posts: newPosts,
                    },
                });
            },
        });
    };
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
                    <Post {...post} key={post.id} handleVoteFn={handleVote} />
                ))}
            </main>
        </>
    );
};
export default Index;

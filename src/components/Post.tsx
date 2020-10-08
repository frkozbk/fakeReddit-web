import React from "react";
import ChevronUp from "./Icons/ChevronUp";
import ChevronDown from "./Icons/ChevronDown";
import {
    Post as PostType,
    PostsDocument,
    useVoteMutation,
} from "../generated/graphql";
const Post = ({
    content,
    createdAt,
    id,
    title,
    updatedAt,
    voteCount,
    voteStatus,
    handleVoteFn,
}: PostType & { handleVoteFn: Function }) => {
    const [voteMutation] = useVoteMutation();
    const handleVote = (newVoteStatus: number, postId: number) => {
        if (voteStatus === newVoteStatus) return;
        handleVoteFn(newVoteStatus, postId);
    };
    return (
        <div className="post flex flex-col lg:flex-row lg:max-w-full mx-auto p-2 border-2 border-gray-400 rounded-md mb-5">
            <div className="post-vote order-2 flex lg:order-none lg:flex-col lg:w-12 lg:items-center lg:justify-center">
                <button
                    className="post-vote__up w-6"
                    onClick={() => handleVote(1, id)}
                >
                    <ChevronUp size={24} selected={voteStatus === 1} />
                </button>
                <p className="mx-1 lg:w-4 text-center text-accent-1">
                    {voteCount}
                </p>
                <button
                    className="post-vote__down w-6"
                    onClick={() => handleVote(-1, id)}
                >
                    <ChevronDown size={24} selected={voteStatus === -1} />
                </button>
            </div>
            <div className="post-content">
                <p className="title text-gray-900 font-semibold">{title}</p>
                <p className="content">{content}</p>
            </div>
        </div>
    );
};

export default Post;

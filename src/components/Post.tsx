import React from "react";
import ChevronUp from "./Icons/ChevronUp";
import ChevronDown from "./Icons/ChevronDown";
import { post } from "../pages";
const Post = (props: post) => {
    const { content, createdAt, id, title, updatedAt, voteCount } = props;
    return (
        <div className="post flex flex-col lg:flex-row lg:max-w-full mx-auto p-2 border-2 border-gray-400 rounded-md mb-5">
            <div className="post-vote order-2 flex lg:order-none lg:flex-col lg:w-12 lg:items-center">
                <button className="post-vote__up w-6">
                    <ChevronUp />
                </button>
                <p>{voteCount}</p>
                <button className="post-vote__down w-6">
                    <ChevronDown />
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

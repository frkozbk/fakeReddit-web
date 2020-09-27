import React from "react";
import { Box } from "@chakra-ui/core";
import ChevronUp from "./Icons/ChevronUp";
import ChevronDown from "./Icons/ChevronDown";
const Post = () => {
    return (
        <div className="mr-1">
            <div className="post-vote">
                <button className="post-vote__up voteBtn">
                    <ChevronUp />
                </button>
                <button className="post-vote__down voteBtn">
                    <ChevronDown />
                </button>
            </div>
            <div className="post-content">
                <p className="title">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Magnam vitae repudiandae enim aliquam fugiat accusamus
                    sequi, rem maxime corporis numquam a modi magni earum neque
                    placeat, quasi saepe, deleniti quo?
                </p>
                <p className="">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Dolor quas dolorum neque doloribus in? Aperiam placeat,
                    sunt, repellat facilis distinctio id quia provident, unde
                    mollitia expedita ipsa. Dicta, quos atque!
                </p>
            </div>
        </div>
    );
};

export default Post;

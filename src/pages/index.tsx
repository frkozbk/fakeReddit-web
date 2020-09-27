import { Flex } from "@chakra-ui/core";
import { Container } from "../components/Container";

import Header from "../components/Header";
import Post from "../components/Post";

const Index = () => (
    <>
        <Header />
        <Container>
            <Post />
        </Container>
    </>
);

export default Index;

import React from "react";
import {
  Box,
  Flex,
  HStack,
  useDisclosure,
  Image,
} from "@chakra-ui/react";
import LayerControlMenu from "./LayerControlMenu";
import GeneratePointData from "./GeneratePointData";

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box
        padding={1}
        background="#171716"
        position="relative"
        _after={{
          content: '""',
          position: "absolute",
          left: 0,
          bottom: 0,
          width: "100%",
          height: "10px",
          background:
            "linear-gradient(to top, #2b95ff 0%, rgba(43, 149, 255,0.5) 5%, rgba(89,235,186,0) 100%)",
          transition: "opacity 0.5s ease",
          opacity: 0.1,
        }}
        _hover={{
          _after: {
            opacity: 10,
          },
        }}
      >
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <Box fontWeight="">
            <Image src={"logo.png"} height={"50px"} />
          </Box>
          <HStack
            spacing={6}
            alignItems={"center"}
            display={{ base: "none", md: "flex" }}
            marginRight={2}
          >
            <GeneratePointData/>
            <LayerControlMenu/>
          </HStack>
        </Flex>
      </Box>
    </>
  );
};

export default Navbar;

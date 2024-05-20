"use client";

import React from "react";
import {
  Box,
  Image,
  Text,
  List,
  ListItem,
  ListIcon,
  keyframes,
} from "@chakra-ui/react";
import { FaSalesforce, FaQuestionCircle, FaTools } from "react-icons/fa";
import Sonora from "../../public/sonora.svg";

const levitate = keyframes`
  0% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0); }
`;

const SonoraInfo = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="100%"
      padding={4}
    >
      <Image
        src={Sonora.src}
        alt="Sonora"
        width={250}
        height={250}
        animation={`${levitate} 2s ease-in-out infinite`}
      />
      <Text fontWeight={700} fontSize="xl" textAlign="center" mb={5}>
        {"Hi! I'm Sonora, your personal assistant. How can I help you today?"}
      </Text>
      <Box width="100%" maxWidth="600px">
        <List spacing={3}>
          <ListItem display="flex" alignItems="center" color="gray.500">
            <ListIcon as={FaSalesforce} color="gray.500" height={6} width={6} />
            <Text marginLeft={2}>
              I can assist you with managing your records in Salesforce.
            </Text>
          </ListItem>
          <ListItem display="flex" alignItems="center" color="gray.500">
            <ListIcon
              as={FaQuestionCircle}
              color="gray.500"
              height={5}
              width={6}
            />
            <Text marginLeft={2}>
              I offer advanced FAQ systems to improve your customer service.
            </Text>
          </ListItem>
          <ListItem display="flex" alignItems="center" color="gray.500">
            <ListIcon as={FaTools} color="gray.500" height={5} width={6} />
            <Text marginLeft={2}>
              I can help you troubleshoot and resolve various technical issues.
            </Text>
          </ListItem>
        </List>
      </Box>
    </Box>
  );
};

export default SonoraInfo;

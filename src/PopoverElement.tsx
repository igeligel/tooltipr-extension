import {
  Box,
  Heading,
  Text,
  Button,
  Icon,
  VStack,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  HStack,
  Tag,
  Portal,
} from '@chakra-ui/react';
import React, { ReactNode, useEffect } from 'react';
import { FiCheck, FiSettings } from 'react-icons/fi';

type PopoverElementProps = {
  title: ReactNode;
  description: ReactNode;
  tags: Array<string>;
};

export const PopoverElement: React.FC<PopoverElementProps> = (props) => {
  return (
    <Popover placement="bottom" closeOnBlur={false} trigger={'hover'}>
      <PopoverTrigger>
        <Text
          as={'span'}
          backgroundColor={'cyan.50'}
          style={{ cursor: 'pointer' }}
        >
          {props.children}
        </Text>
      </PopoverTrigger>
      <PopoverContent
        color="white"
        bg="white"
        borderColor="transparent"
        display="flex"
        textColor={'gray.800'}
        boxShadow={'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px'}
        borderRadius={'lg'}
      >
        {/* <PopoverHeader pt={4} fontWeight="bold" border="0">
        Manage Your Channels
      </PopoverHeader> */}
        {/* <PopoverCloseButton /> */}
        <PopoverBody padding={'4'}>
          <VStack>
            <Box
              display="flex"
              justifyContent="space-between"
              width="100%"
              color={'gray.200'}
            >
              <HStack>
                <Button
                  colorScheme="cyan"
                  variant="ghost"
                  size="xs"
                  color={'gray.200'}
                  _hover={{
                    color: 'cyan.900',
                  }}
                >
                  <Icon as={FiCheck} w={6} h={6} />
                </Button>
              </HStack>
              <HStack>
                <Button
                  colorScheme="cyan"
                  variant="ghost"
                  size="xs"
                  color={'gray.200'}
                  _hover={{
                    color: 'cyan.900',
                  }}
                >
                  <Icon as={FiSettings} w={6} h={6} />
                </Button>
              </HStack>
            </Box>
            <Box
              display="flex"
              flexDirection={'column'}
              alignItems="flex-start"
              textAlign={'left'}
              width={'100%'}
              paddingTop={'2'}
            >
              <Heading fontSize={'lg'}>{props.title}</Heading>
              <Text color={'gray.500'} fontSize={'md'} marginTop={'1'}>
                {props.description}
              </Text>
              <HStack marginTop={'2'} spacing={'1'}>
                {props.tags.map((e) => {
                  return (
                    <Tag size={'sm'} key={e} variant="solid" colorScheme="cyan">
                      {e}
                    </Tag>
                  );
                })}
              </HStack>
              <Box>Logo</Box>
            </Box>
          </VStack>
        </PopoverBody>
        {/* <PopoverFooter
        border="0"
        d="flex"
        alignItems="center"
        justifyContent="space-between"
        pb={4}
      >
        <Box fontSize="sm">Step 2 of 4</Box>
        <ButtonGroup size="sm">
          <Button colorScheme="green">Setup Email</Button>
          <Button colorScheme="blue">Next</Button>
        </ButtonGroup>
      </PopoverFooter> */}
      </PopoverContent>
    </Popover>
  );
};

import { Box, IconButton, Image, Link, Text, Flex, Stack, HStack, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerOverlay, useDisclosure } from "@chakra-ui/react";
import logo from "../../assets/LOGO_full.svg";
import Noise from '../../../bg/noise.svg';
import cloud2 from "../../assets/s2Cloud.svg";
import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons";
import { useState } from "react";
import { motion } from "framer-motion";
import { ConnectButton } from "@rainbow-me/rainbowkit";

// Logo component
function Logo(props) {
    return (
        <Box {...props}>
            <Image src={logo} alt="LOGO" width="100%" height="auto" />
        </Box>
    );
}

// MenuToggle component
function MenuToggle({ toggle, isOpen }) {
    return (
        <Box display={{ base: "block", md: "block", lg: "none" }} onClick={toggle} zIndex={1} mt={4}>
            {isOpen ? <IconButton icon={<CloseIcon />} /> : <IconButton icon={<HamburgerIcon />} />}
        </Box>
    );
}

// MenuItem component
function MenuItem({ children, to = "/", ...rest }) {
    return (
        <Link display="block" href={to} {...rest}>
            <Text fontFamily="Amatic SC" fontSize={['16px', '20px', '24px']} color={"white"}>{children}</Text>
        </Link>
    );
}

// MenuLinks component

function MenuLinks({ isOpen, onClose }) {
    return (
        <Drawer isOpen={isOpen} placement="right" onClose={onClose} size={{base: "xs", md: "sm"}}>
            <DrawerOverlay />
            <DrawerContent bg="#7149C6" backgroundImage={Noise}>
                <DrawerCloseButton />
                <DrawerBody>
                    <Stack spacing={8} align="center" justify="center" direction="column" pt={4} mt={10}>
                        <MenuItem to="/">Home</MenuItem>
                        <MenuItem to="/mint">Compose And Mint</MenuItem>
                        <MenuItem to="/governance">Governance</MenuItem>
                        <MenuItem to="https://opensea.io" isExternal>
                            Explore
                        </MenuItem>
                       <ConnectButton />
                    </Stack>
                </DrawerBody>
            </DrawerContent>
        </Drawer>
    );
}

// MenuLinksBox component
function MenuLinksBox({ children, ...rest }) {
    return (
        <Box
            display={{ base: 'none', md: 'none', lg: "block" }}
            flexShrink={0}
            borderRadius="24px"
            boxShadow="6px 7px 0px 0px rgba(0, 0, 0, 0.8)"
            zIndex={2}
            height="35px"
            mt={4}
            {...rest}
        >
            <HStack
                spacing={12}
                align="center"
                justify='center'
                fontStyle="normal"
                fontWeight={600}
                lineHeight="normal"
                letterSpacing="2px"
                textTransform="uppercase"
                height="100%"
            >
                {children}
            </HStack>
        </Box>
    );
}

// NavBarContainer component
const NavBarContainer = ({ children, ...props }) => {
    return (
        <Flex
            as="nav"
            // align="center"
            justify="space-between"
            wrap="wrap"
            w="100%"
            maxHeight={["auto", "80px"]}
            p={3}
            bg="#7149C6"
            backgroundImage={Noise}
            color={["white", "white", "White", "black"]}
            {...props}
        >
            {children}
        </Flex>
    );
}

// Animated Clouds component
export function Clouds({ src, ...props }) {
    return (
        <Box position="absolute" zIndex={0} {...props}>
            <motion.div
                animate={{ y: ["0%", "2%", "0%"], x: ["0%", "2%", "0%"] }}
                transition={{
                    repeat: Infinity, // Repeat the animation indefinitely
                    repeatType: "loop", // Loop the animation smoothly
                    duration: 8,
                    ease: "linear", // Use linear easing for a smoother loop
                }}
            >
                <Image src={src} width="100%" height="auto" />
            </motion.div>
        </Box>
    );
}

// NavBar component
export default function NavBar(props) {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => {
        setIsOpen(!isOpen)
    }

    return (
        <>
            <NavBarContainer {...props}>
                <Logo width={["100px", "120px"]} height='auto' />
                <MenuLinksBox background="#FFF" width="50%">
                    <MenuItem to="/">Home</MenuItem>
                    <MenuItem to="/mint">Compose and Mint</MenuItem>
                    <MenuItem to="/governance">Governance</MenuItem>
                    <MenuItem to='https://opensea.io' isExternal>Explore</MenuItem>
                </MenuLinksBox>
                <Box 
                zIndex={2}
                >
                <MenuLinks isOpen={isOpen} onClose={() => setIsOpen(false)}/>
                <Box
                    zIndex={2}
                    height="35px"
                    mt={4}
                >
                    <ConnectButton
                        accountStatus={{ smallScreen: 'avatar', largeScreen: 'full', }}
                        chainStatus="icon"
                    />
                </Box>
                </Box>
                <MenuToggle toggle={toggle} isOpen={isOpen} />
                <Clouds src={cloud2} top={4} right={4} width={["40%", "15%"]} />
                <Clouds src={cloud2} top={3} right={["15%", "calc(35% + 10px)"]} width="15%" display={{ base: 'none', md: 'block', lg: "block" }} />
            </NavBarContainer>
        </>
    );
}

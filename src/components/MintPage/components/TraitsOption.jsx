import { Box, Text, Image, Flex, Button } from "@chakra-ui/react";
import { getBackgrounds, getBodies, getFaces, getHeads, getPets } from "./ImportImages";


const backgrounds = getBackgrounds();
const bodies = getBodies();
const faces = getFaces();
const heads = getHeads();
const pets = getPets();

const activeTrait = backgrounds;

export function TopBar({ children, textColor, ...rest }) {
    return (
        <Box
            w="100%"
            h="10%"
            borderWidth="0.5px"
            borderLeft={0}
            borderColor="gray.400"
            p={3}
            boxShadow="0px 4px 4px rgba(0, 0, 0, 0.8)"
            {...rest}
        >
            <Text color={textColor}
                fontSize={['16px', '20px', '20px']}
                fontWeight={{ base: 200, md: 300 }}
            >
                {children}
            </Text>
        </Box>
    )

}

function ButtonsWithImages({ path, label }) {
    return (
        <>
            <Box align="center" padding={1}>
                <Button
                    p={0}
                    m={2}
                    borderRadius="10px"
                    bg="gray.200"
                    w={{ base: "60px", md: "90px" }}
                    h={{ base: "60px", md: "90px" }}
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                >
                    <Image src={path} alt={label} width="100%" height="100%" borderRadius="10px" />
                </Button>
                <Box mt={1}><Text fontWeight={700}>{label}</Text></Box>
            </Box>
        </>
    )
}

const ButtonList = ({ activeTrait }) => (
    <Flex flexWrap="wrap" padding={2}>
        {activeTrait.map((button, index) => (
            <ButtonsWithImages key={index} path={button.path} label={button.label} />
        ))}
    </Flex>
);

export default function TraitsOption({ activeTrait }) {
    return (
        <Box
            as="aside"
            w={{ base: "100%", md: "30%" }}
            position="relative"
            bg={"white"}
        >
            <TopBar bg={"white"} display={{ base: "none", md: "block" }} textColor={"black"}>Select Traits</TopBar>
            <ButtonList activeTrait={activeTrait} />
        </Box>
    )
}
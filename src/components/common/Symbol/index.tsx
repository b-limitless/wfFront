import { Box, Card, Image, Link, Text } from "trolly/common";
import { history } from "config";

interface ISymbolComponent {
  name?: string;
  symbol?: string;
  id?: string;
  image?: string;
}
const SymbolComponent: React.FC<ISymbolComponent> = ({
  name,
  symbol,
  id,
  image,
}) => {
  const onSymbolCLick = (id: string | undefined) => () => {
    history.push(`/trade/ticker/${id}`);
  };
  return (
    <Link
      fontWeight={700}
      color="secondary"
      onClick={onSymbolCLick(id)}
      fontColor="#000"
      variant="header"
    >
      <Box
        display="flex"
        flexDirection="row"
        alignContent="center"
        alignItems="center"
      >
        <Card padding="6px" mr="5px" borderRadius="12px">
          <Image width="45px" height="45px" src={image} color="secondary" />
        </Card>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="flex-start"
          overflow="hidden"
        >
          <Text fontSize="14px" fontWeight={700} mb="3px">
            {symbol}
          </Text>
          <Text
            fontSize="12px"
            fontWeight={500}
            color="text.secondary"
            textOverflow="ellipsis"
            overflow="hidden"
            maxWidth="100px"
            whiteSpace="nowrap"
          >
            {name}
          </Text>
        </Box>
      </Box>
    </Link>
  );
};

export default SymbolComponent;

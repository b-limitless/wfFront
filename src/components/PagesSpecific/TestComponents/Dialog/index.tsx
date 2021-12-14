import React, { useState } from "react";
import { Box, Button, Dialog, Text } from "trolly/common";

const DialogComp: React.FC<{ color: any }> = ({ color }) => {
  const [openFirst, setOpenFirst] = useState<boolean>(false);
  const [openSecond, setOpenSecond] = useState<boolean>(false);
  const [openThird, setOpenThird] = useState<boolean>(false);
  const [openFourth, setOpenFourth] = useState<boolean>(false);

  return (
    <Box gridTemplateColumns="1fr" gridGap="15px">
      <Box>
        <Button
          variant="contained"
          color={color}
          onClick={() => setOpenFirst(true)}
        >
          Open Dialog
        </Button>
        <Dialog
          open={openFirst}
          onClose={() => setOpenFirst(false)}
          animationVariant="zoom"
          closeIconPosition="end"
          withAnimation={true}
          color={color}
          withColoredHeader={true}
          contentWrapperStyles={{ padding: "15px" }}
          titlePadding="10px"
          dialogTitle={<p>Hello there</p>}
        >
          <Text>Dialog with close icon at end and colored header</Text>
        </Dialog>
      </Box>
      <Box>
        <Button
          variant="contained"
          color={color}
          onClick={() => setOpenSecond(true)}
        >
          Open Dialog
        </Button>
        <Dialog
          open={openSecond}
          onBackdropClick={() => setOpenSecond(false)}
          animationVariant="zoom"
          closeIconPosition="end"
          withAnimation={true}
          color={color}
          withColoredHeader={true}
          contentWrapperStyles={{ padding: "15px" }}
        >
          <Text>
            Dialog without close icon so no colored header , even with header
            props
          </Text>
        </Dialog>
      </Box>
      <Box>
        <Button
          variant="contained"
          color={color}
          onClick={() => setOpenThird(true)}
        >
          Open Dialog
        </Button>
        <Dialog
          open={openThird}
          onClose={() => setOpenThird(false)}
          animationVariant="fade"
          closeIconPosition="start"
          withAnimation={true}
          contentWrapperStyles={{ padding: "15px" }}
        >
          <Text>
            Dialog with close icon at start and no colored header, fade
            animation
          </Text>
        </Dialog>
      </Box>
      <Box>
        <Button
          variant="contained"
          color={color}
          onClick={() => setOpenFourth(true)}
        >
          Open Dialog
        </Button>
        <Dialog
          open={openFourth}
          onClose={() => setOpenFourth(false)}
          onBackdropClick={() => setOpenFourth(false)}
          animationVariant="slide"
          transitionProps={{
            direction: "down",
          }}
          closeIconPosition="end"
          withColoredHeader={true}
          color={color}
          withAnimation={true}
          contentWrapperStyles={{ padding: "15px" }}
          actions={
            <>
              <Button fullWidth={true} color={color} variant="contained">
                Test Button
              </Button>
              <Button fullWidth={true} color={color} variant="outlined">
                Test Button
              </Button>
            </>
          }
        >
          <Text>
            Dialog with close icon at start and colored header , with down slide
            animation and close on backdrop click
          </Text>
        </Dialog>
      </Box>
    </Box>
  );
};

export default DialogComp;

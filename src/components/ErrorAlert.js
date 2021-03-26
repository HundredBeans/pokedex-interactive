import React from "react";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";

function ErrorAlert(props) {
  return (
    <Alert
      status="error"
      variant="subtle"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      height="200px"
    >
      <AlertIcon boxSize="40px" mr={0} />
      <AlertTitle mt={4} mb={1} fontSize="lg">
        {props.errorTitle}
      </AlertTitle>
      <AlertDescription maxWidth="sm">
        {props.errorDescription}
      </AlertDescription>
    </Alert>
  );
}

export default ErrorAlert;

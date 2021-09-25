// import React, { useRef } from 'react';
// import { InputGroup } from '@chakra-ui/react';
// import { UseFormRegisterReturn } from 'react-hook-form';

// type FileUploadProps = {
//   register: UseFormRegisterReturn;
//   accept?: string;
//   multiple?: boolean;
//   children?: React.ReactNode;
//   preview?: boolean;
// };

// type FormValues = {
//   file_: FileList;
// };

// const FileUpload = (props: FileUploadProps) => {
//   const { register, accept, multiple, children, preview } = props;
//   const inputRef = useRef<HTMLInputElement | null>(null);
//   const { ref, ...rest } = register as {
//     ref: (instance: HTMLInputElement | null) => void;
//   };

//   const handleClick = () => inputRef.current?.click();

//   return (
//     <InputGroup onClick={handleClick}>
//       <input
//         type={'file'}
//         multiple={multiple || false}
//         hidden
//         accept={accept}
//         {...rest}
//         ref={(e) => {
//           ref(e);
//           inputRef.current = e;
//         }}
//       />
//       <>{children}</>
//     </InputGroup>
//   );
// };

// export default FileUpload
import React from 'react';
import { Box, Text, Flex, Button, Input, flexbox } from '@chakra-ui/react';

const FileUpload = () => {
  return (
    <Box width={'50%'} m={'100px auto'} padding={'2'} shadow={'base'}>
      <Flex direction={'column'} alignItems={'center'} mb={5}>
        <Text fontSize={'2xl'} mb={4}>
          Upload a document
        </Text>

        <Button>Accpeted File ypes</Button>
        <Box mt={10}>
          <Input type={'file'} variant={'unstyled'} />
        </Box>
      </Flex>
    </Box>
  );
};

export default FileUpload;

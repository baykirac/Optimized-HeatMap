import {
  Button,
  CloseButton,
  Dialog,
  For,
  HStack,
  Portal,
  NumberInput,
  Flex,
  Box,
} from "@chakra-ui/react";
import { Toaster, toaster } from "@/components/ui/toaster";
import { useContext, useState } from "react";
import Context from "@/context/Context";
import bogusApi from "@/api/bogusApi";

const GeneratePointData = () => {
  const [count, setCount] = useState(10);
  const [isLoading, setIsLoading] = useState(false);
  const { setIsPageLoading } = useContext(Context);
  return (
    <HStack>
      <Dialog.Root size="xs">
        <Dialog.Trigger asChild>
          <Button variant="outline" backgroundColor={"white"}>Point Üret</Button>
        </Dialog.Trigger>
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content>
              <Dialog.Header>
                <Dialog.Title>Dialog Title</Dialog.Title>
              </Dialog.Header>
              <Dialog.Body>
                <Flex
                  h={16}
                  alignItems={"center"}
                  justifyContent={"space-between"}
                >
                  <Box>
                    <p style={{ marginBottom: 5 }}>
                      Üretmek istediğiniz point sayısını giriniz:
                    </p>
                    <NumberInput.Root
                      size="lg"
                      defaultValue={count}
                      min={0}
                      max={1000000}
                      onChange={(e) => setCount(e.target.value)}
                    >
                      <NumberInput.Control />
                      <NumberInput.Input />
                    </NumberInput.Root>
                  </Box>
                </Flex>
              </Dialog.Body>
              <Dialog.Footer>
                <Dialog.ActionTrigger asChild>
                  <Button variant="outline">İptal</Button>
                </Dialog.ActionTrigger>
                <Button
                  disabled={isLoading}
                  onClick={async () => {
                    setIsLoading(true);
                    setIsPageLoading(true);
                    await bogusApi
                      .GenerateFakePointData(count)
                      .then((response) => {
                        if (response.success) {
                          toaster.create({
                            title: "Ekleme işlemi başarılı.",
                            type: "success",
                          });
                        } else {
                          toaster.create({
                            title: "Ekleme işleminde hata gerçekleşti.",
                            type: "error",
                          });
                        }
                      });
                    setIsPageLoading(false);
                    setIsLoading(false);
                  }}
                >
                  Üret
                </Button>
              </Dialog.Footer>
              <Dialog.CloseTrigger asChild>
                <CloseButton size="sm" />
              </Dialog.CloseTrigger>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
      <Toaster />
    </HStack>
  );
};

export default GeneratePointData;

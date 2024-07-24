import { AlertDialogContent } from "@gluestack-ui/themed";
import { Heading } from "@gluestack-ui/themed";
import { Icon } from "@gluestack-ui/themed";
import { Text } from "@gluestack-ui/themed";
import { AlertDialogFooter } from "@gluestack-ui/themed";
import { Button } from "@gluestack-ui/themed";
import { ButtonText } from "@gluestack-ui/themed";
import { ButtonGroup } from "@gluestack-ui/themed";
import { AlertDialogBody } from "@gluestack-ui/themed";
import { CloseIcon } from "@gluestack-ui/themed";
import { AlertDialogCloseButton } from "@gluestack-ui/themed";
import { AlertDialogHeader } from "@gluestack-ui/themed";
import { AlertDialogBackdrop } from "@gluestack-ui/themed";
import { AlertDialog } from "@gluestack-ui/themed";
import { ItemTaskType } from "../../models/ItemTask";
import { useDeleteTaskMutation } from "../../services/taskService";
import { ActivityIndicator } from "react-native";
import { useEffect } from "react";

interface DeleteTaskModalProps {
    isOpen: boolean;
    onClose: () => void;
    itemSelected: ItemTaskType;
    onSave: () => void;
}
export default function DeleteTaskModal({ isOpen, itemSelected, onClose, onSave }: DeleteTaskModalProps) {
    const [loadDelTask, { isLoading: isDeleting }] = useDeleteTaskMutation();
    function onDelete() {
        loadDelTask(itemSelected.id).then(() => {
            onSave()
            onClose();
        })
    }

    return (
        <AlertDialog
            isOpen={isOpen}
            onClose={onClose}
        >
            <AlertDialogBackdrop />
            <AlertDialogContent>
                <AlertDialogHeader>
                    <Heading size="lg">Delete Task</Heading>
                    <AlertDialogCloseButton>
                        <Icon as={CloseIcon} />
                    </AlertDialogCloseButton>
                </AlertDialogHeader>
                <AlertDialogBody>
                    <Text size="sm">
                        Are you sure you want to delete this task? Your data will
                        be permanently removed and cannot be undone.
                    </Text>
                </AlertDialogBody>
                <AlertDialogFooter>
                    <ButtonGroup space="lg">
                        <Button
                            variant="outline"
                            action="secondary"
                            onPress={onClose}
                        >
                            <ButtonText>Cancel</ButtonText>
                        </Button>
                        <Button
                            bg="$error600"
                            action="negative"
                            onPress={onDelete}

                            isDisabled={isDeleting}

                        >
                            <ButtonText>Yes</ButtonText>
                        </Button>
                    </ButtonGroup>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
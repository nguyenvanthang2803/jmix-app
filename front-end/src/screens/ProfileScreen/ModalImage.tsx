// import { ActionsheetIcon, ActionsheetItemText } from "@gluestack-ui/themed";
// import { Box } from "@gluestack-ui/themed";
// import { Actionsheet, ActionsheetBackdrop, ActionsheetContent, ActionsheetDragIndicator, ActionsheetDragIndicatorWrapper, ActionsheetItem } from "@gluestack-ui/themed";
// import { CameraIcon, Images } from "lucide-react-native";
// import ImageCropPicker from "react-native-image-crop-picker";

// interface ModalImageProps {
//     isOpen: boolean;
//     onClose: () => void
// }
// const onCameraPress = () => {
//     ImageCropPicker.openPicker({
//         width: 300,
//         height: 400,
//         cropping: true
//     }).then(image => {
//         console.log(image);
//     });
// }
// export default function ModalImage({ isOpen, onClose }: ModalImageProps) {
//     return (
//         <Actionsheet isOpen={isOpen} onClose={onClose} zIndex={999}>
//             <ActionsheetBackdrop />
//             <ActionsheetContent h="$72" zIndex={999}>
//                 <ActionsheetDragIndicatorWrapper>
//                     <ActionsheetDragIndicator />
//                 </ActionsheetDragIndicatorWrapper>
//                 <ActionsheetItem onPress={() => { onCameraPress }} >
//                     <Box bg="$coolGray300" h={30} w={30} justifyContent="center" alignItems="center" borderRadius="$full">
//                         <ActionsheetIcon as={Images} size="sm" color="#000" ></ActionsheetIcon>
//                     </Box>

//                     <ActionsheetItemText fontWeight='$bold'>Chọn ảnh từ thư viện</ActionsheetItemText>
//                 </ActionsheetItem>
//             </ActionsheetContent>
//         </Actionsheet>
//     )

// }
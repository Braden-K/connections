import { Modal, Text, View } from "react-native";
import { permissionsModalStyles } from "../styles/createTabStyles";
import { PermissionType } from "../types/PuzzleBoard";
import { CheckBox } from "@rneui/themed";
import { Permission } from "../types/PuzzleBoard";

const PuzzlePermissionsModal = (props: {
  visible: boolean;
  onClose: () => void;
  permission: PermissionType;
  setPermission: (permissionType: PermissionType) => void;
}) => {
  return (
    <Modal transparent={true} visible={props.visible}>
      <View style={permissionsModalStyles.modalContainer}>
        <View style={permissionsModalStyles.modalContent}>
          <Text style={{ fontFamily: "code", fontSize: 20 }}>
            Who can see your puzzle?
          </Text>
          <View>
            <CheckBox
              checked={props.permission === Permission.PUBLIC}
              onPress={() => props.setPermission(Permission.PUBLIC)}
              checkedIcon="dot-circle-o"
              uncheckedIcon="circle-o"
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default PuzzlePermissionsModal;

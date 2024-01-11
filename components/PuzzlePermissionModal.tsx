import { Modal, Text, View } from "react-native";
import { permissionsModalStyles } from "../styles/createTabStyles";
import { PermissionType } from "../types/PuzzleBoard";
import { CheckBox } from "@rneui/themed";
import { Permission } from "../types/PuzzleBoard";
import PillButton from "./PillButton";

const PuzzlePermissionsModal = (props: {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  onCreate: () => void;
  permission: PermissionType;
  setPermission: (permissionType: PermissionType) => void;
  invalidInput: boolean;
  setInvalidInput: (invalidInput: boolean) => void;
}) => {
  return (
    <Modal transparent={true} visible={props.visible}>
      <View style={permissionsModalStyles.modalContainer}>
        <View style={permissionsModalStyles.modalContent}>
          {props.invalidInput ? (
            <>
              <Text
                style={{
                  fontFamily: "code",
                  fontSize: 20,
                  alignItems: "center",
                  marginBottom: 100,
                }}
              >
                Puzzle fields cannot be blank or duplicated...
              </Text>
              <PillButton
                text="Fix"
                color="black"
                width={100}
                onPress={() => {
                  props.setVisible(false);
                  props.setInvalidInput(false);
                }}
              />
            </>
          ) : (
            <>
              <Text
                style={{
                  fontFamily: "code",
                  fontSize: 20,
                  alignItems: "center",
                }}
              >
                Who can see your puzzle?
              </Text>
              <View style={permissionsModalStyles.checkBoxOuter}>
                <View style={permissionsModalStyles.checkBoxInner}>
                  <CheckBox
                    checked={props.permission === Permission.PUBLIC}
                    onPress={() => props.setPermission(Permission.PUBLIC)}
                    checkedIcon="dot-circle-o"
                    uncheckedIcon="circle-o"
                  />
                  <Text style={permissionsModalStyles.checkBoxText}>
                    Anyone
                  </Text>
                </View>
                <View style={permissionsModalStyles.checkBoxInner}>
                  <CheckBox
                    checked={props.permission === Permission.FRIENDS_ONLY}
                    onPress={() => props.setPermission(Permission.FRIENDS_ONLY)}
                    checkedIcon="dot-circle-o"
                    uncheckedIcon="circle-o"
                  />
                  <Text style={permissionsModalStyles.checkBoxText}>
                    Friends only
                  </Text>
                </View>
                <View style={permissionsModalStyles.checkBoxInner}>
                  <CheckBox
                    checked={props.permission === Permission.PRIVATE}
                    onPress={() => props.setPermission(Permission.PRIVATE)}
                    checkedIcon="dot-circle-o"
                    uncheckedIcon="circle-o"
                  />
                  <Text style={permissionsModalStyles.checkBoxText}>
                    Just me
                  </Text>
                </View>
              </View>
              <PillButton
                text="create"
                color="black"
                width={100}
                onPress={props.onCreate}
              />
            </>
          )}
        </View>
      </View>
    </Modal>
  );
};

export default PuzzlePermissionsModal;

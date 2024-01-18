import { Modal, Text, View } from "react-native";
import { permissionsModalStyles } from "../styles/createTabStyles";
import { PermissionType } from "../types/PuzzleBoard";
import { CheckBox } from "@rneui/themed";
import { Permission } from "../types/PuzzleBoard";
import PillButton from "./PillButton";
import { COLOR_ONE, COLOR_THREE, COLOR_TWO } from "../styles/constants";

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
                  fontFamily: "poppins",
                  fontSize: 20,
                  alignSelf: "center",
                  marginBottom: 100,
                  color: COLOR_TWO,
                }}
              >
                Puzzle fields cannot be blank or duplicated...
              </Text>
              <PillButton
                text="Fix"
                color={COLOR_THREE}
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
                  fontFamily: "poppins",
                  fontSize: 20,
                  alignItems: "center",
                  color: COLOR_TWO,
                }}
              >
                Who can see your puzzle?
              </Text>
              <View style={permissionsModalStyles.checkBoxOuter}>
                <View style={permissionsModalStyles.checkBoxInner}>
                  <CheckBox
                    checked={props.permission === Permission.PUBLIC}
                    onPress={() => props.setPermission(Permission.PUBLIC)}
                    checkedColor="COLOR_TWO"
                    uncheckedColor="COLOR_ONE"
                    style={{ backgroundColor: COLOR_ONE }}
                  />
                  <Text style={permissionsModalStyles.checkBoxText}>
                    Anyone
                  </Text>
                </View>
                <View style={permissionsModalStyles.checkBoxInner}>
                  <CheckBox
                    checked={props.permission === Permission.FRIENDS_ONLY}
                    onPress={() => props.setPermission(Permission.FRIENDS_ONLY)}
                    checkedColor="COLOR_TWO"
                    uncheckedColor="TILE_TEXT_COLOR"
                  />
                  <Text style={permissionsModalStyles.checkBoxText}>
                    Friends only
                  </Text>
                </View>
                <View style={permissionsModalStyles.checkBoxInner}>
                  <CheckBox
                    checked={props.permission === Permission.PRIVATE}
                    onPress={() => props.setPermission(Permission.PRIVATE)}
                    checkedColor="COLOR_TWO"
                    uncheckedColor="COLOR_TWO"
                  />
                  <Text style={permissionsModalStyles.checkBoxText}>
                    Just me
                  </Text>
                </View>
              </View>
              <PillButton
                text="create"
                color={COLOR_TWO}
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

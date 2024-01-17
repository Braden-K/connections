import { Category, PuzzleBoardPostQuery } from "../types/PuzzleBoard";
import { TextInput, View, Text } from "react-native";
import { Fragment, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { createPuzzleScreenStyles } from "../styles/createTabStyles";
import { postApiPuzzle } from "../firestoreApi/puzzles";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { pushUserPuzzle } from "../redux/puzzleSlice";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { CreateStackParamList } from "../types/navigation";
import RectangularButton from "./RectangularButton";
import PuzzlePermissionsModal from "./PuzzlePermissionModal";
import { Permission } from "../types/PuzzleBoard";
import { COLOR_TWO, CREATE_FORM_LABELS } from "../styles/constants";

export const CreatePuzzleForm = (props: {
  navigation: NativeStackNavigationProp<CreateStackParamList, "MyPuzzles">;
  setIsLoading: (isLoading: boolean) => void;
}) => {
  const user = useSelector((state: RootState) => state.user.user);
  const dispatch = useDispatch();
  const [permissionsModalVisible, setPermissionsModalVisible] =
    useState<boolean>(false);
  const [permissionType, setPermissionType] = useState<Permission>(
    Permission.PUBLIC
  );
  const [puzzleFormData, setPuzzleFormData] = useState<string[]>(
    Array.from("".repeat(21))
  );
  const [invalidInput, setInvalidInput] = useState<boolean>(false);

  const invalidInputExists = () => {
    const entrySet = new Set<string>(
      puzzleFormData.map((entry) => {
        if (!entry) {
          return "";
        } else {
          return entry;
        }
      })
    );

    if (entrySet.size < 21 || entrySet.has("")) {
      return true;
    }
    return false;
  };

  const handleInitialSubmit = () => {
    if (invalidInputExists()) {
      setInvalidInput(true);
    }
    setPermissionsModalVisible(true);
  };

  const handleFinalSubmit = async () => {
    props.setIsLoading(true);
    const pfd = [...puzzleFormData];

    const c1: Category = {
      descriptor: pfd[0],
      tiles: [pfd[1], pfd[2], pfd[3], pfd[4]],
    };
    const c2: Category = {
      descriptor: pfd[5],
      tiles: [pfd[6], pfd[7], pfd[8], pfd[9]],
    };
    const c3: Category = {
      descriptor: pfd[10],
      tiles: [pfd[11], pfd[12], pfd[13], pfd[14]],
    };
    const c4: Category = {
      descriptor: pfd[15],
      tiles: [pfd[16], pfd[17], pfd[18], pfd[19]],
    };

    const puzzleBoard: PuzzleBoardPostQuery = {
      label: pfd[20],
      puzzle: [c1, c2, c3, c4],
      permission: permissionType,
    };

    const puzzleId = await postApiPuzzle(user.id, puzzleBoard);
    dispatch(
      pushUserPuzzle({
        puzzleId,
        label: puzzleBoard.label,
        puzzle: puzzleBoard.puzzle,
        permission: permissionType,
      })
    );
    props.navigation.navigate("MyPuzzles");
    props.setIsLoading(false);
  };

  const setFormDataAtIndex = (index: number, data: string) => {
    setPuzzleFormData([
      ...puzzleFormData.slice(0, index),
      data,
      ...puzzleFormData.slice(index + 1, 21),
    ]);
  };

  return (
    <SafeAreaView style={createPuzzleScreenStyles.container}>
      <PuzzlePermissionsModal
        visible={permissionsModalVisible}
        setVisible={setPermissionsModalVisible}
        onCreate={handleFinalSubmit}
        permission={permissionType}
        setPermission={setPermissionType}
        invalidInput={invalidInput}
        setInvalidInput={setInvalidInput}
      />
      <View style={{ alignItems: "center", marginBottom: 20 }}>
        <RectangularButton
          text={"Create Puzzle"}
          color={COLOR_TWO}
          width={200}
          onPress={handleInitialSubmit}
        />
      </View>
      {CREATE_FORM_LABELS.map((label, index) => {
        return (
          <Fragment key={index}>
            <Text
              style={
                index % 5 == 0
                  ? createPuzzleScreenStyles.categoryInputText
                  : createPuzzleScreenStyles.tileInputText
              }
            >
              {label}
            </Text>
            <TextInput
              style={
                index % 5 == 0
                  ? createPuzzleScreenStyles.categoryInput
                  : createPuzzleScreenStyles.tileInput
              }
              onChangeText={(text: string) => setFormDataAtIndex(index, text)}
              value={puzzleFormData[index]}
            />
          </Fragment>
        );
      })}
      <View style={{ alignItems: "center", marginTop: 10 }}>
        <RectangularButton
          onPress={handleInitialSubmit}
          text={"Create Puzzle"}
          color={COLOR_TWO}
          width={200}
        />
      </View>
    </SafeAreaView>
  );
};

export default CreatePuzzleForm;

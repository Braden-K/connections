import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  Category,
  PuzzleBoard,
  PuzzleBoardPostQuery,
} from "../types/PuzzleBoard";
import {
  ScrollView,
  TextInput,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { createPuzzleScreenStyles } from "../styles/createTabStyles";
import { getApiPuzzlesByUserId, postApiPuzzle } from "../firestoreApi/puzzles";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { pushUserPuzzle } from "../redux/puzzleSlice";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { CreateStackParamList } from "../types/navigation";

export const CreatePuzzleForm = (props: {
  navigation: NativeStackNavigationProp<CreateStackParamList, "MyPuzzles">;
}) => {
  const user = useSelector((state: RootState) => state.user.user);
  const dispatch = useDispatch();

  const [des1, setDes1] = useState<string>("");
  const [t1a, setT1a] = useState<string>("");
  const [t1b, setT1b] = useState<string>("");
  const [t1c, setT1c] = useState<string>("");
  const [t1d, setT1d] = useState<string>("");

  const [des2, setDes2] = useState<string>("");
  const [t2a, setT2a] = useState<string>("");
  const [t2b, setT2b] = useState<string>("");
  const [t2c, setT2c] = useState<string>("");
  const [t2d, setT2d] = useState<string>("");

  const [des3, setDes3] = useState<string>("");
  const [t3a, setT3a] = useState<string>("");
  const [t3b, setT3b] = useState<string>("");
  const [t3c, setT3c] = useState<string>("");
  const [t3d, setT3d] = useState<string>("");

  const [des4, setDes4] = useState<string>("");
  const [t4a, setT4a] = useState<string>("");
  const [t4b, setT4b] = useState<string>("");
  const [t4c, setT4c] = useState<string>("");
  const [t4d, setT4d] = useState<string>("");

  const handleSubmit = async () => {
    const c1: Category = { descriptor: des1, tiles: [t1a, t1b, t1c, t1d] };
    const c2: Category = { descriptor: des2, tiles: [t2a, t2b, t2c, t2d] };
    const c3: Category = { descriptor: des3, tiles: [t3a, t3b, t3c, t3d] };
    const c4: Category = { descriptor: des4, tiles: [t4a, t4b, t4c, t4d] };

    const puzzleBoard: PuzzleBoardPostQuery = [c1, c2, c3, c4];

    const puzzleId = await postApiPuzzle(user.id, puzzleBoard);
    dispatch(pushUserPuzzle({ puzzleId, puzzle: puzzleBoard }));
    props.navigation.navigate("MyPuzzles");
  };

  return (
    <SafeAreaView style={createPuzzleScreenStyles.container}>
      <Text>1st Category name:</Text>
      <TextInput
        style={createPuzzleScreenStyles.categoryInput}
        onChangeText={(text: string) => setDes1(text)}
        value={des1}
      />
      <Text>1st Option:</Text>
      <TextInput
        style={createPuzzleScreenStyles.tileInput}
        onChangeText={(text: string) => setT1a(text)}
        value={t1a}
      />
      <Text>2nd Option:</Text>
      <TextInput
        style={createPuzzleScreenStyles.tileInput}
        onChangeText={(text: string) => setT1b(text)}
        value={t1b}
      />
      <Text>3rd Option:</Text>
      <TextInput
        style={createPuzzleScreenStyles.tileInput}
        onChangeText={(text: string) => setT1c(text)}
        value={t1c}
      />
      <Text>4th Option:</Text>
      <TextInput
        style={createPuzzleScreenStyles.tileInput}
        onChangeText={(text: string) => setT1d(text)}
        value={t1d}
      />
      <Text>2nd Category name:</Text>
      <TextInput
        style={createPuzzleScreenStyles.categoryInput}
        onChangeText={(text: string) => setDes2(text)}
        value={des2}
      />
      <Text>1st Option:</Text>
      <TextInput
        style={createPuzzleScreenStyles.tileInput}
        onChangeText={(text: string) => setT2a(text)}
        value={t2a}
      />
      <Text>2nd Option:</Text>
      <TextInput
        style={createPuzzleScreenStyles.tileInput}
        onChangeText={(text: string) => setT2b(text)}
        value={t2b}
      />
      <Text>3rd Option:</Text>
      <TextInput
        style={createPuzzleScreenStyles.tileInput}
        onChangeText={(text: string) => setT2c(text)}
        value={t2c}
      />
      <Text>4th Option:</Text>
      <TextInput
        style={createPuzzleScreenStyles.tileInput}
        onChangeText={(text: string) => setT2d(text)}
        value={t2d}
      />
      <Text>3rd Category name:</Text>
      <TextInput
        style={createPuzzleScreenStyles.categoryInput}
        onChangeText={(text: string) => setDes3(text)}
        value={des3}
      />
      <Text>1st Option:</Text>
      <TextInput
        style={createPuzzleScreenStyles.tileInput}
        onChangeText={(text: string) => setT3a(text)}
        value={t3a}
      />
      <Text>2nd Option:</Text>
      <TextInput
        style={createPuzzleScreenStyles.tileInput}
        onChangeText={(text: string) => setT3b(text)}
        value={t3b}
      />
      <Text>3rd Option:</Text>
      <TextInput
        style={createPuzzleScreenStyles.tileInput}
        onChangeText={(text: string) => setT3c(text)}
        value={t3c}
      />
      <Text>4th Option:</Text>
      <TextInput
        style={createPuzzleScreenStyles.tileInput}
        onChangeText={(text: string) => setT3d(text)}
        value={t3d}
      />
      <Text>4th Category name:</Text>
      <TextInput
        style={createPuzzleScreenStyles.categoryInput}
        onChangeText={(text: string) => setDes4(text)}
        value={des4}
      />
      <Text>1st Option:</Text>
      <TextInput
        style={createPuzzleScreenStyles.tileInput}
        onChangeText={(text: string) => setT4a(text)}
        value={t4a}
      />
      <Text>2nd Option:</Text>
      <TextInput
        style={createPuzzleScreenStyles.tileInput}
        onChangeText={(text: string) => setT4b(text)}
        value={t4b}
      />
      <Text>3rd Option:</Text>
      <TextInput
        style={createPuzzleScreenStyles.tileInput}
        onChangeText={(text: string) => setT4c(text)}
        value={t4c}
      />
      <Text>4th Option:</Text>
      <TextInput
        style={createPuzzleScreenStyles.tileInput}
        onChangeText={(text: string) => setT4d(text)}
        value={t4d}
      />
      <TouchableOpacity onPress={handleSubmit}>
        <Text>Create Puzzle</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default CreatePuzzleForm;

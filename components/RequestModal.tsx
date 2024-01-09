import { Modal, View, Text, TouchableOpacity } from "react-native";
import { requestModalStyles } from "../styles/friendsTabStyles";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { User } from "../types/User";
import { loadUser } from "../redux/userSlice";
import UserListing from "./UserSearchListing";
import {
  deleteApiUserFriendRequest,
  getApiUserById,
  putApiUserFriendById,
} from "../firestoreApi/users";
import { width } from "../styles/friendsTabStyles";
import PillButton from "./PillButton";

const RequestModal = (props: {
  visible: boolean;
  close: () => void;
  requestingUsers: User[];
  setRequestingUsers: (users: User[]) => void;
}) => {
  const currentUser = useSelector((state: RootState) => state.user.user);
  const dispatch = useDispatch();

  const handleAddBack = async (friendId: string) => {
    await deleteApiUserFriendRequest(friendId, currentUser.id);
    await putApiUserFriendById(currentUser.id, friendId);
    const refreshedUser = await getApiUserById(currentUser.id);
    if (refreshedUser) {
      dispatch(loadUser({ user: refreshedUser }));
    }
  };

  return (
    <Modal
      transparent={true}
      visible={props.visible}
      onRequestClose={props.close}
    >
      <View style={requestModalStyles.modalContainer}>
        <View style={requestModalStyles.modalContent}>
          <View style={requestModalStyles.modalHeader}>
            {props.requestingUsers.length >= 1 && (
              <TouchableOpacity onPress={props.close}>
                <Text style={{ fontSize: 15, fontWeight: "bold" }}>X</Text>
              </TouchableOpacity>
            )}
            <Text style={{ fontFamily: "code", fontSize: 20 }}>
              {props.requestingUsers.length >= 1 ? "Requests" : ""}
            </Text>
            <Text></Text>
          </View>

          <View>
            {props.requestingUsers.length >= 1 ? (
              props.requestingUsers.map((user, index) => {
                return (
                  <UserListing
                    key={index}
                    isSearch={true}
                    username={user.username}
                    requested={true}
                    added={false}
                    onPress={() => handleAddBack(user.id)}
                  />
                );
              })
            ) : (
              <View style={{ alignItems: "center" }}>
                <Text
                  style={{
                    fontSize: 25,
                    fontFamily: "code",
                    marginTop: 80,
                    marginBottom: 20,
                  }}
                >
                  No Pending Requests!
                </Text>
                <PillButton
                  text={"close"}
                  color={"black"}
                  width={100}
                  onPress={props.close}
                />
              </View>
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default RequestModal;

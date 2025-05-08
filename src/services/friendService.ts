import { MyFriend } from "../models/MyFriend";

export const getAllFriends = async () => {
  return await MyFriend.findAll();
};

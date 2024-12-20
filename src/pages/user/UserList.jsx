import { useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineDelete } from "react-icons/ai";
import { CiEdit } from "react-icons/ci";
import { RxCrossCircled } from "react-icons/rx";
import { Link } from "react-router-dom";
import { useDeleteUserMutation, useGetUserListQuery } from "../../api/apiSlice";
import { CardHeader } from "../../components/CardHeader";
import CardWrapper from "../../components/CardWrapper";
import ConfirmDialog from "../../components/ConfirmDialog";
import UserForm from "./UserForm";
// import UserForm from "./UserForm";

const UserList = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedUserId, setSelectUserId] = useState(null);

  const { data: userList, isLoading, isError } = useGetUserListQuery();
  const [deleteUser] = useDeleteUserMutation();

  const onClose = () => setIsPopupOpen(false);

  const handleOpen = (id = null) => {
    setIsPopupOpen(true);
    setSelectUserId(id);
  };

  const handleDeleteUser = async (id) => {
    const confirm = () =>
      toast(
        (t) => (
          <ConfirmDialog
            onConfirm={async () => {
              toast.dismiss(t.id);
              try {
                deleteUser(id).then((res) => {
                  if (res.error != null) {
                    toast.error(res.error.data.message);
                  } else {
                    toast.success("User deleted successfully");
                  }
                });
              } catch (error) {
                toast.error(error.message || "Failed to delete user");
              }
            }}
            onCancel={() => toast.dismiss(t.id)}
            title="User"
          />
        ),
        { duration: Infinity }
      );
    confirm();
  };

  let content;

  if (isLoading && isError) return "Loading...";

  if (!isLoading && isError) return "Error";

  if (!isLoading && !isError && userList)
    content = userList?.data?.map((user, index) => (
      <div
        key={user?.id}
        className="w-full flex flex-wrap justify-between items-center text-[13px] px-3 py-3 border-t border-dark-border-color dark:border-opacity-10"
      >
        <div className="dark:text-white w-[5%]">
          <h3>{++index}</h3>
        </div>

        <div className="dark:text-white w-[15%]">
          <Link to={`/user/profile/${user?.id}`}>
            <h3>{user?.first_name + " " + user?.last_name}</h3>
          </Link>
        </div>

        <div className="dark:text-white w-[15%]">
          <h3>{user?.email}</h3>
        </div>

        <div className="dark:text-white w-[15%]">
          <h3>{user?.role}</h3>
        </div>
        <div className="dark:text-white w-[10%]">
          <h3>{user?.status}</h3>
        </div>
        <div className="dark:text-white w-[10%]">
          <h3>{user?.createdAt}</h3>
        </div>
        <div className="dark:text-white w-[15%]">
          <div className="flex flex-wrap justify-start gap-2">
            {/* edit button */}
            <div className="w-8 h-8 bg-green-400 rounded-sm p-2 flex justify-center items-center cursor-pointer">
              <CiEdit
                size={20}
                className="text-white"
                onClick={() => handleOpen(user?.id)}
              />
            </div>

            {/* delete button */}
            <div
              className="w-8 h-8 bg-red-500 text-center flex justify-center items-center rounded-sm p-2 cursor-pointer text-white"
              onClick={() => handleDeleteUser(user?.id)}
            >
              <AiOutlineDelete size={20} />
            </div>
          </div>
        </div>
      </div>
    ));

  return (
    <>
      <CardWrapper>
        <CardHeader title="User List" handleOpen={handleOpen} />

        {/* CSV Upload Section */}

        <div className="px-6 py-3">
          {/* header */}
          <div className="w-full bg-light-bg dark:bg-dark-box rounded-sm py-3 px-3 flex flex-wrap justify-between text-sm">
            <div className="dark:text-white w-[5%]">
              <h3>SL</h3>
            </div>
            <div className="dark:text-white w-[15%]">
              <h3>Name</h3>
            </div>
            <div className="dark:text-white w-[15%]">
              <h3>Email</h3>
            </div>
            <div className="dark:text-white w-[15%]">
              <h3>Role</h3>
            </div>
            <div className="dark:text-white w-[10%]">
              <h3>Status</h3>
            </div>
            <div className="dark:text-white w-[10%]">
              <h3>Created At</h3>
            </div>
            <div className="dark:text-white w-[15%]">
              <h3>Actions</h3>
            </div>
          </div>

          {/* body */}
          {content}
        </div>
        {isPopupOpen && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white dark:bg-dark-card rounded-lg p-6 w-full max-w-4xl">
              <div className="flex justify-between items-center pb-3 border-b border-gray-200 dark:border-dark-border-color dark:border-opacity-5">
                <h3 className="text-lg font-medium text-gray-800 dark:text-white">
                  Add User
                </h3>

                <button
                  className="text-gray-500 hover:text-gray-800"
                  onClick={() => setIsPopupOpen(false)}
                >
                  <RxCrossCircled fontSize={20} />
                </button>
              </div>
              <div className="mt-4">
                <UserForm selectedUserId={selectedUserId} onClose={onClose} />
              </div>
            </div>
          </div>
        )}
      </CardWrapper>
    </>
  );
};

export default UserList;

import { AuthUserResponse, updateProfile } from "@/api/authService";
import { login } from "@/redux/slices/userSlice";
import { RootState } from "@/redux/store";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export const UpdateProfileForm = () => {
  const state = useSelector((state: RootState) => state);
  const dispatch = useDispatch();
  const { user } = state;
  const [fullName, setFullName] = useState(user.userInfo.full_name);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [previewAvatar, setPreviewAvatar] = useState(
    user.userInfo.avatar || "./defaultProfile.png"
  );

  const isDisabled =
    fullName === user.userInfo.full_name && avatarFile === null;

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setAvatarFile(file);
      setPreviewAvatar(URL.createObjectURL(file));
    }
  };

  const handleSaveChanges = async () => {
    if (isDisabled) return;
    setLoading(true);

    const formData = new FormData();
    formData.append("email", user.userInfo.email);
    formData.append("full_name", fullName);
    if (avatarFile) {
      formData.append("avatar", avatarFile);
    }

    try {
      const response: AuthUserResponse = await updateProfile(formData);
      console.log(response);
      dispatch(login({ ...response.data.user, role: user.userInfo.role }));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <article className="flex grow justify-center items-center w-full mt-10">
      <form
        className="lg:w-1/2 flex flex-col items-center gap-10"
        onSubmit={(e) => e.preventDefault()}
      >
        {/* Image input */}
        <div className="flex flex-col items-center">
          <label htmlFor="avatar" className="cursor-pointer">
            <img
              src={previewAvatar}
              alt="Profile"
              className="rounded-full w-32 h-32"
            />
          </label>
          <input
            type="file"
            id="avatar"
            className="hidden"
            onChange={handleAvatarChange}
          />
        </div>
        {/* Form fields : Name */}
        <div className="w-full">
          <label htmlFor="name">Full Name</label>
          <input
            type="text"
            id="name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="border border-gray-300 rounded-md p-2 w-full"
          />
        </div>
        <div className="w-full">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            value={user.userInfo.email}
            disabled
            className="border border-gray-300 rounded-md p-2 w-full disabled:bg-gray-300 cursor-not-allowed"
          />
        </div>
        <div className="w-full">
          <label htmlFor="role">Role</label>
          <input
            type="text"
            id="role"
            value={user.userInfo.role}
            disabled
            className="border border-gray-300 rounded-md p-2 w-full disabled:bg-gray-300 cursor-not-allowed"
          />
        </div>
        <button
          className={`px-4 py-2 rounded-md disabled:bg-gray-400 disabled:cursor-not-allowed text-white ${
            isDisabled ? "bg-gray-400 cursor-not-allowed" : "bg-brand-primary"
          }`}
          disabled={isDisabled || loading}
          onClick={handleSaveChanges}
        >
          Save Changes
        </button>
      </form>
    </article>
  );
};

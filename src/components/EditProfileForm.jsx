import React, { useState } from "react";
import { Loader } from ".";
import { useAuth } from "../hooks";
import {
  initialProfileState,
  PROFILE_PIC_PLACEHOLDER,
  uploadImages,
  validURL,
} from "../utils";

const EditProfileForm = ({ profile, toggleModal }) => {
  const { updateUserInfo } = useAuth();
  const [loading, setLoading] = useState(false);
  const [profileImage, setProfileImage] = useState(
    profile.profilePictureURL ?? PROFILE_PIC_PLACEHOLDER
  );
  const [profileInfo, setProfileInfo] = useState(profile);
  return (
    <form
      className="p-3 modal-form text-dark bg-light"
      onSubmit={async (e) => {
        e.preventDefault();
        setLoading(true);
        if (profileImage) {
          const urls = await uploadImages([profileImage]);

          const _profileInfo = {
            ...profileInfo,
            profilePictureURL: urls[0],
          };
          await updateUserInfo(_profileInfo);
        } else {
          const _profileInfo = {
            ...profileInfo,
            profilePictureURL: undefined,
          };
          await updateUserInfo(_profileInfo);
        }
        setProfileInfo(initialProfileState);
        toggleModal();
        setLoading(false);
      }}
    >
      <label className="text-2xl mb-2 block text-center  font-normal">
        Update Profile
      </label>
      <div className="col gap-1 mb-2">
        <div className="col gap-1">
          <label htmlFor="name">Full name</label>
          <input
            type="text"
            placeholder="Enter full name"
            className="input"
            id="name"
            value={profileInfo.name}
            onChange={(e) =>
              setProfileInfo({ ...profileInfo, name: e.target.value })
            }
            required
          />
        </div>

        <div className="col gap-2 w-full">
          <div className="col gap-1">
            {profileImage && (
              <div className="relative w-fit">
                <i
                  onClick={() => {
                    setProfileImage(null);
                  }}
                  className="cursor-pointer absolute fa fa-close r-0 t-0 bg-error text-light grid place-content-center bx-sh-3 img-rounded w-8 h-8"
                />
                <img
                  src={
                    validURL(profileImage)
                      ? profileImage
                      : URL.createObjectURL(profileImage)
                  }
                  alt="profileImage"
                  className="object-cover w-52"
                />
              </div>
            )}
            <label
              htmlFor="coverImage"
              className="cursor-pointer flex items-center bg-primary p-2 text-light"
            >
              <i className="fa fa-image mr-1" />
              {profileImage ? "Change " : "Choose "}Profile Picture
            </label>
            <input
              id="coverImage"
              className="hidden "
              type="file"
              accept="image/*"
              multiple={false}
              onChange={(e) => {
                setProfileImage(e.target.files[0]);
              }}
            />
          </div>
        </div>
      </div>
      <button className="btn btn-dark w-full text-lg mb-2" disabled={loading}>
        {loading ? <Loader isButtonLoader={true} /> : "Update"}
      </button>
    </form>
  );
};

export default EditProfileForm;

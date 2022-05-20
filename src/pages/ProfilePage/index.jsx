import React, { useEffect, useState } from "react";
import { FaUserEdit } from "react-icons/fa";
import { IoIosCreate } from "react-icons/io";
import { Layout, Loader } from "../../components";
import EditProfileForm from "../../components/EditProfileForm";
import Modal from "../../components/Modal";
import { useAuth } from "../../hooks";
import "./ProfilePage.css";
import ProfileTab from "./ProfileTab";
const ProfilePage = () => {
  const { profile, getUserInfo } = useAuth();
  useEffect(() => {
    (async () => await getUserInfo())();
  }, []);
  const [showModal, setShowModal] = useState(false);
  const toggleModal = () => setShowModal(!showModal);
  return (
    <Layout>
      <Modal showModal={showModal} toggleModal={toggleModal}>
        <EditProfileForm toggleModal={toggleModal} profile={profile?.data} />
      </Modal>
      <section className="bx-sh-3  profile mt-3 br-sm    bg-light ">
        {profile.loading ? (
          <Loader />
        ) : (
          <>
            <div className="col items-center justify-center gap-1 profile-header  p-3 ">
              <div className="col items-center gap-1  ">
                <img
                  src={profile.data.profilePictureURL}
                  alt=""
                  className=" b-solid br-info profile-img img-rounded w-20"
                />
                <div className="profile-desc col items-center text-dark ">
                  <h3 className=" text-xl font-medium ">{profile.data.name}</h3>
                  <span>{profile.data.email}</span>
                </div>
              </div>
              <div className="row gap-025 text-white">
                <div
                  onClick={() => toggleModal()}
                  className="cursor-pointer bg-info row gap-05 p-05 pl-1 pr-1  br-sm items-center"
                >
                  <FaUserEdit />
                  <span>Edit Profile</span>
                </div>
                <div className="bg-tertiary row gap-025 p-05 pl-1 pr-1  br-sm">
                  <span>Score</span>
                  <span className="font-medium">{profile.data.totalScore}</span>
                </div>
              </div>
            </div>
            <div className="col gap-025 p-1 profile-bottom  text-white font-medium">
              <ProfileTab
                title="Create Your Quiz"
                to="quizzes"
                icon={<IoIosCreate size={20} />}
              />
            </div>
          </>
        )}
      </section>
    </Layout>
  );
};

export default ProfilePage;

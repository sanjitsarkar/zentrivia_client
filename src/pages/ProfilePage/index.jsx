import React from "react";
import { FaHistory, FaUserEdit } from "react-icons/fa";
import { IoIosCreate } from "react-icons/io";
import { MdExplore, MdLeaderboard } from "react-icons/md";
import { Layout, Loader } from "../../components";
import { useAuth } from "../../hooks";
import "./ProfilePage.css";
import ProfileTab from "./ProfileTab";
const ProfilePage = () => {
  const { user } = useAuth();

  return (
    <Layout>
      <section className="bx-sh-3  profile mt-3 br-sm    bg-light ">
        {user.loading ? (
          <Loader />
        ) : (
          <>
            <div className="col items-center justify-center gap-1 profile-header  p-3 ">
              <div className="col items-center gap-1  ">
                <img
                  src={user.data.profilePictureURL}
                  alt=""
                  className=" b-solid br-info profile-img img-rounded w-20"
                />
                <div className="profile-desc col items-center text-dark ">
                  <h3 className=" text-xl font-medium ">{user.data.name}</h3>
                  <span>{user.data.email}</span>
                </div>
              </div>
              <div className="row gap-025 text-white">
                <div className="cursor-pointer bg-info row gap-05 p-05 pl-1 pr-1  br-sm items-center">
                  <FaUserEdit />
                  <span>Edit Profile</span>
                </div>
                <div className="bg-tertiary row gap-025 p-05 pl-1 pr-1  br-sm">
                  <span>Score</span>
                  <span className="font-medium">{user.data.totalScore}</span>
                </div>
              </div>
            </div>
            <div className="col gap-025 p-1 profile-bottom  text-white font-medium">
              <ProfileTab
                title="Recent Quiz"
                to="quizzes?type=recent"
                icon={<FaHistory size={20} />}
              />
              <ProfileTab
                title="Browse Your Quizzes"
                to="quizzes"
                icon={<MdExplore size={20} />}
              />
              <ProfileTab
                title="Create Your Quizzes"
                to="quizzes/create"
                icon={<IoIosCreate size={20} />}
              />
              <ProfileTab
                title="Leaderboard"
                to="leaderboard"
                icon={<MdLeaderboard size={20} />}
              />
            </div>
          </>
        )}
      </section>
    </Layout>
  );
};

export default ProfilePage;

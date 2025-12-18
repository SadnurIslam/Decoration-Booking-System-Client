import useAuth from "../../hooks/useAuth";

const MyProfile = () => {
  const { user } = useAuth();

  return (
    <div className="max-w-3xl">
      <h1 className="text-3xl font-bold mb-6">My Profile</h1>

      <div className="card bg-base-200 rounded-2xl">
        <div className="card-body flex flex-col sm:flex-row gap-6 items-center">

          <img
            src={user?.photoURL}
            alt="profile"
            className="w-28 h-28 rounded-full object-cover ring-4 ring-primary/30"
          />

          <div className="space-y-2 text-center sm:text-left">
            <h2 className="text-xl font-semibold">
              {user?.displayName}
            </h2>

            <p className="text-sm text-base-content/70">
              {user?.email}
            </p>

            <span className="badge badge-primary badge-outline">
              User
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;

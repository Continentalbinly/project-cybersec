import React, { useEffect, useState } from "react";
import axios from "axios";

function AdminDataTable() {
  axios.defaults.baseURL = "http://localhost:8080/api/v1";
  const [activeUsers, setActiveUsers] = useState([]);
  const [inactiveUsers, setInactiveUsers] = useState([]);

  useEffect(() => {
    fetchAllUsers();
  }, []);

  const fetchAllUsers = async () => {
    try {
      const response = await axios.get("/auth/fetchalluser");
      if (response.data.success) {
        const allUsers = response.data.users;
        const active = allUsers.filter((user) => user.status !== 0);
        const inactive = allUsers.filter((user) => user.status === 0 && user.role === "user");
        setActiveUsers(active);
        setInactiveUsers(inactive);
      } else {
        console.error("Error fetching users:", response.data.message);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleApprove = async (userId) => {
    try {
      const response = await axios.put("/auth/update-user-status", {
        userId: userId,
        status: 1, // Assuming status 1 means approved
      });
      if (response.data.success) {
        fetchAllUsers(); // Update the user list after approving
      } else {
        console.error("Error updating user status:", response.data.message);
      }
    } catch (error) {
      console.error("Error updating user status:", error);
    }
  };

  const handleDeny = async (userId) => {
    try {
      const response = await axios.put("/auth/update-user-status", {
        userId: userId,
        status: 2, // Assuming status 2 means denied
      });
      if (response.data.success) {
        fetchAllUsers(); // Update the user list after denying
      } else {
        console.error("Error updating user status:", response.data.message);
      }
    } catch (error) {
      console.error("Error updating user status:", error);
    }
  };
  
  return (
    <>
      <div className="text-xl font-semibold">
        <h5>ຄຳຂໍອະນຸມັດລົງທະບຽນຮຽນ</h5>
      </div>
      <br />

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                ນາມ
              </th>
              <th scope="col" className="px-6 py-3">
                ຊື່ຜູ້ຮ້ອງຂໍ
              </th>
              <th scope="col" className="px-6 py-3">
                ອີເມວ
              </th>
              <th scope="col" className="px-6 py-3 flex justify-center">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {inactiveUsers.map((user) => (
              <tr key={user._id}>
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white "
                >
                  {user.userId}
                </th>
                <td className="px-6 py-4">{user.userName}</td>
                <td className="px-6 py-4">{user.userEmail}</td>
                <td className="px-6 py-4 flex justify-center">
                  <button
                    onClick={() => handleApprove(user.userId)}
                    className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800"
                  >
                    <span className="relative px-3 py-2 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                      ອະນຸມັດ
                    </span>
                  </button>
                  <button
                    onClick={() => handleDeny(user.userId)}
                    type="button"
                    className="px-3 py-2 text-xs font-medium text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 rounded-lg me-2 mb-2 dark:bg-gray-800 dark:text-red-600 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                  >
                    ປະຕິເສດ
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <br />
      <div className="text-xl font-semibold">
        <h5>ປະຫວັດການອະນຸມັດ</h5>
      </div>
      <br />
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                ນາມ
              </th>
              <th scope="col" className="px-6 py-3">
                ຊື່ຜູ້ຮ້ອງຂໍ
              </th>
              <th scope="col" className="px-6 py-3">
                ອີເມວ
              </th>
              <th scope="col" className="px-6 py-3 flex justify-center">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {activeUsers.map((user) => (
              <tr key={user._id}>
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {user.userId}
                </th>
                <td className="px-6 py-4">{user.userName}</td>
                <td className="px-6 py-4">{user.userEmail}</td>
                <td className="px-6 py-4 flex justify-center">
                  {user.status === 1 ? (
                    <span className="inline-block px-2 py-1 text-green-500 rounded-md">
                      ອະນຸມັດ
                    </span>
                  ) : user.status === 2 ? (
                    <span className="inline-block px-2 py-1 text-red-500 rounded-md">
                      ປະຕິເສດ
                    </span>
                  ) : (
                    <span className="inline-block px-2 py-1 text-gray-500 rounded-md">
                      ບໍ່ພົບຂໍ້ມູນ
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default AdminDataTable;

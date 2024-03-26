export const useAuth = () => {
  const user = localStorage.getItem("@auth");
  if (user) {
    return true;
  } else {
    return false;
  }
};

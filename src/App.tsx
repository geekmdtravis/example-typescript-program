import { useEffect, useState } from "react";
import { CclReturnData, getUserData } from "./data";
import { User } from "./data";

export default () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    getUserData(1)
      .then((res) => {
        if (userResolveDataHasError(res)) return;
        setUser(res.DATA[0]);
      })
      .then((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  }
  return (
    <div>
      <p>{JSON.stringify(user)}</p>
    </div>
  );
};

function userResolveDataHasError(res: CclReturnData<User>): boolean {
  console.log(res.META);
  if (!res.DATA) {
    window.alert("no valid data was found for the user");
    return true;
  }
  if (res.DATA.length === 0) {
    window.alert("there was no data for the user");
    return true;
  }
  if (res.DATA.length > 1) {
    console.warn("more than one user was found; was expecting only one");
    return true;
  }
  return false;
}

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
        const { error, msg } = getUserDataHasError(res);
        if (error) {
          console.error(msg);
          return;
        }
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

function getUserDataHasError(res: CclReturnData<User>): {
  error: boolean;
  msg?: string;
} {
  console.log(res.META);
  if (!res.DATA) {
    return { error: true, msg: "no valid data was found for the user" };
  }
  if (res.DATA.length === 0) {
    return { error: true, msg: "there was no data for the user" };
  }
  if (res.DATA.length > 1) {
    return {
      error: true,
      msg: "more than one user was found; was expecting only one",
    };
  }
  return { error: false };
}

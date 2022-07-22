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
        const { error, msg } = validateGetUser(res);
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

type ValidationError = {
  error: boolean;
  msg?: string;
};

const makeValidationError = (msg: string): ValidationError => ({
  error: true,
  msg,
});

function validateGetUser(res: CclReturnData<User>): ValidationError {
  if (!res.DATA) {
    return makeValidationError("no valid data was found for the user");
  }
  if (res.DATA.length === 0) {
    return makeValidationError("there was no data for the user");
  }
  if (res.DATA.length > 1) {
    return makeValidationError(
      "more than one user was found; was expecting only one"
    );
  }
  return { error: false };
}

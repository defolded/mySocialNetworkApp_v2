import { ChangeEvent, useEffect, useState } from "react";

interface PropsType {
  status: string;
  isAuth: boolean;

  setUserStatus: (status: string) => void;
}

interface StateType {
  status: string;
  editMode?: boolean;
}

const ProfileInfo = (props: PropsType & StateType) => {
  const [editMode, setEditMode] = useState(false);
  const [status, setStatus] = useState(props.status);

  useEffect(() => {
    setStatus(props.status);
    props.editMode && setEditMode(true);
  }, [props.status]);

  const activateEditMode = () => {
    if (props.isAuth) {
      setEditMode(true);
    }
  };

  const deactivateEditMode = () => {
    setEditMode(false);
    props.setUserStatus(status);
  };

  const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
    setStatus(e.currentTarget.value);
  };

  return (
    <div>
      {!editMode ? (
        <div>
          <span onClick={activateEditMode}>{props.status}</span>
        </div>
      ) : (
        <div>
          <input
            autoFocus
            onBlur={deactivateEditMode}
            value={status ? status : ""}
            onChange={onStatusChange}
          />
        </div>
      )}
    </div>
  );
};

export default ProfileInfo;

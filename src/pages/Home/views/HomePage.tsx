import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { getListUser } from '../../../redux/slice/user/listUserSlice';

export const Home = () => {
  const { listUser } = useAppSelector((state) => state.listUser);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getListUser());
  }, [dispatch]);

  console.log(listUser, 'listUser');

  return (
    <div>
      Test config <p className="home-text">List User</p>
      <ul>
        {listUser?.length ? listUser?.map((user: any, index: number) => <li key={index}>{user?.username}</li>) : ''}
      </ul>
    </div>
  );
};

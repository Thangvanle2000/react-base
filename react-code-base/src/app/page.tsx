"use client";
import { useEffect } from "react";
import authReducer, { getUser } from "../redux/services/authSlice/page";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";

export default function Home() {
  const dispatch = useDispatch();
  const { listUser } = useSelector((state: any) => state.authReducer);
  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  const postTitles =
    listUser &&
    listUser?.map((user: any) => (
      <li key={user?.id}>
        <Link href={`/posts/${user?.id}`}>{user?.name}</Link>
      </li>
    ));
  return (
    <>
      <ul>{postTitles}</ul>
    </>
  );
}

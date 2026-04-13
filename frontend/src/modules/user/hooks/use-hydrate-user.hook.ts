import { useEffect } from "react";
import { useAppDispatch } from "../../store/store";
import { fetchProfileAction } from "../actions/user.actions";

export const useHydrateUser = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchProfileAction());
    }, [dispatch]);
};

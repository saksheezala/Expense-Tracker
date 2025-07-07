import { useContext, useEffect } from "react"
import { UserContext } from "../context/UserContext"
import { useNavigate } from "react-router-dom";
import axoisInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/apiPaths";

export const useUserAuth = () => {
    const {user ,updateUser , clearUser} = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() =>{
        let isMounted = true;
    
        const fetchUserInfo = async () =>{
            try {
                const response = await axoisInstance.get(API_PATHS.AUTH.GET_USER);
    
                if(isMounted && response.data.data.user){
                    updateUser(response.data.data.user);
                }
            } catch (error) {
                console.error("Error fetching user info:", error);
                if(isMounted){
                    clearUser();
                    navigate("/login");
                }
            }
        }
    
        fetchUserInfo();
    
        return () => {
            isMounted = false;
        }
    },[]);
}
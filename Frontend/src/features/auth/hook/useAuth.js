import { setLoading,setUser } from "../state/auth.slice";
import { register,login ,getMe} from "../service/auth.api";
import { useDispatch } from "react-redux";  

export const useAuth = () => {
    
    const dispatch = useDispatch()

    const handleRegister = async ({email,contact,password,fullname,isSeller = false}) => {
        const data = await register({email,contact,password,fullname,isSeller})
        dispatch(setUser(data.user))
        return data.user
    }

    const handleLogin = async ({email,password}) => {
        const data = await login({email,password})
        dispatch(setUser(data.user))
        return data.user
    }

    const handleGetMe = async () => {
        try{
            dispatch(setLoading(true))
            const data = await getMe()
            dispatch(setUser(data.user))
        }catch(error){
            console.error("Failed to fetch user data:", error)
        }finally{
            dispatch(setLoading(false))
        }
    }

    

    return {handleRegister,handleLogin,handleGetMe}
}
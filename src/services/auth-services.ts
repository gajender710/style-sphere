import networkClient from "./api-client";


const login = async (payload:any) : Promise<any> => {
    return networkClient.post('login',payload);
}

const signUp = async (payload:any) : Promise<any> => {
    return networkClient.post('sign-up',payload);
}

const authServices = {
    login,
    signUp,
}

export default authServices;
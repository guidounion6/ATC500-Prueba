import axios from "axios"
import { jwtDecode } from "jwt-decode"

interface DecodedToken {
    exp: number
}

export const refreshToken = async () => {
    const refreshToken = localStorage.getItem("refreshToken")

    try {
        const response = await axios.get("users/refresh-token", {
            headers: {
                Authorization: `Bearer ${refreshToken}`,    
            }
        })
        const { accesToken, refreshToken: newRefreshToken } = response.data

        localStorage.setItem("token", accesToken)
        localStorage.setItem("refreshToken", newRefreshToken)
    } catch (error) {
        localStorage.remoteItem("token")
        localStorage.removeItem("refreshToken")
        return null
    }
}

export const checkTokenExpiration = async (): Promise<boolean> => {
    const token = localStorage.getItem("token")
    if (!token) return false

    const decoded = jwtDecode<DecodedToken>(token)
    if (!decoded.exp || decoded.exp * 1000 < Date.now()) return false

    try {
        await refreshToken()
        return true
    } catch (error) {
        localStorage.removeItem("token")
        localStorage.removeItem("refreshToken")
        return false
    }
}
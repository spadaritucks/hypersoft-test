"use server"
import { env } from "@/env/env";
import { AuthRequestDTO } from "@/types/auth/AuthRequestDTO";
import { AuthResponseDTO } from "@/types/auth/AuthResponseDTO";
import { cookies } from "next/headers";

export async function AuthService(authRequestDTO: AuthRequestDTO): Promise<AuthResponseDTO> {

    const credentials = new URLSearchParams({
            username: authRequestDTO.username,
            password: authRequestDTO.password,
            grant_type: "password",
            client_id: env.NEXT_KEYCLOCK_CLIENT_ID
        })

        const body = credentials.toString();
   

    const response = await fetch(`${env.NEXT_KEYCLOCK_URL}/realms/${env.NEXT_KEYCLOCK_REALM}/protocol/openid-connect/token`, {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: body
    })

   
    const data = await response.json()

    if (!response.ok) {
        throw new Error(data.error_description || "Erro ao se autenticar")
    }

    const cookiesStore = await cookies();
    cookiesStore.set("access_token", data.access_token, {
        httpOnly: true,
        sameSite: "strict",
        maxAge: data.expires_in
    })
    cookiesStore.set("refresh_token", data.refresh_token, {
        httpOnly: true,
        sameSite: "strict",
        maxAge: data.refresh_expires_in 
    })

    return data;
}

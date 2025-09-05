"use server"
import { cookies } from "next/headers";

export async function getAccessToken() : Promise<string> {

    const cookiesStore = await cookies();
    const access_token = cookiesStore.get("access_token")?.value;

    if(!access_token){
        throw new Error("Não foi possivel localizar o token de autenticação")

    }

    return access_token;
}
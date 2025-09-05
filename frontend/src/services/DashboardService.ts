'use server'

import { env } from "@/env/env"
import { DashboardResponseDTO } from "@/types/dashboard/DashboardResponseDTO";
import { getAccessToken } from "@/utils/getAccessToken"

export async function GetDashboardService(): Promise<DashboardResponseDTO> {
    const access_token = await getAccessToken();

    const response = await fetch(`${env.NEXT_API_URL}/dashboard`, {
        method: "GET",
        cache: "no-cache",
        headers: {
            "Authorization": `Bearer ${access_token}`
        }
    })

    const data = await response.json()

    if (!response.ok) {
        throw new Error(data.message || "Erro ao buscar dados do dashboard")
    }

    return data;
}

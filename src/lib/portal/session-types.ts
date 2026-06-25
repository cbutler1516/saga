export type PortalSessionMode = "supabase" | "dev";

export type PortalSessionPayload = {
  mode: PortalSessionMode;
  userId: string;
  email: string;
  companyId: string;
  accessToken?: string;
  refreshToken?: string;
  exp: number;
};

export type PortalSession = PortalSessionPayload & {
  companyName: string;
};

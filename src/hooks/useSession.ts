import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type SessionStore = {
  isLogged: boolean;
  email: string;
  role: string;
  name: string;
  userNameLab?: string;
  token: string;
  changePassword: boolean;
  currentPassword: string;
  session?: string;
  ticket?: string;
  nameInactive?: string;
  crmInactive?: string;
  inactiveType?: string;
  refresh: boolean;
  motivo?: string;
  nameLaudo?: string;
  cpfLaudo?: string;
  namePatient?: string;
  cpfPatient?: string;
  proceduresId?: any;
  isLoading?: boolean;
  idUser?: string;
  idClient?: string;
  idClientProgram?: string;
  imageBase64?: string;
  setImageBase64: (imageBase64: string) => void;
  setUserId?: (idUser: string) => void;
  setClientId?: (idClient: string) => void;
  setClientProgramId?: (idClientProgram: string) => void;
  setIsLoading?: (isLoading: boolean) => void;
  setProceduresId?: (proceduresId: any) => void;
  setUserNameLab: (userNameLab: string) => void;
  setNamePatient: (namePatient: string) => void;
  setCpfPatient: (cpfPatient: string) => void;
  setNameLaudo: (nameLaudo: string) => void;
  setCpfLaudo: (cpfLaudo: string) => void;
  setMotivo: (motivo: string) => void;
  setNameInactive: (nameInactive: string) => void;
  setCrmInactive: (crmInactive: string) => void;
  setRefresh: (refresh: boolean) => void;
  setInactiveType: (inactiveType: string) => void;
  setTicket: (ticket: string) => void;
  setSession: (session: string) => void;
  setName: (name: string) => void;
  setEmail: (email: string) => void;
  setRole: (role: string) => void;
  setToken: (token: string) => void;
  setChangePassword: (changePassword: boolean) => void;
  setCurrentPassword: (currentPassword: string) => void;
  onLogin: () => void;
  onLogout: () => void;
};

const useSession = create(
  persist<SessionStore>(
    (set) => ({
      isLogged: false,
      email: "",
      role: "",
      name: "",
      token: "",
      changePassword: false,
      currentPassword: "",
      session: "",
      ticket: "",
      inactiveType: "",
      refresh: false,
      motivo: "",
      nameLaudo: "",
      cpfLaudo: "",
      namePatient: "",
      cpfPatient: "",
      userNameLab: "",
      nameInactive: "",
      idClient: "",
      idClientProgram: "",
      crmInactive: "",
      proceduresId: "",
      isLoading: false,
      idUser: "",
      imageBase64: "",
      setImageBase64: (imageBase64) => set({ imageBase64: imageBase64 }),
      setUserId: (idUser) => set({ idUser: idUser }),
      setIsLoading: (isLoading) => set({ isLoading: isLoading }),
      setProceduresId: (proceduresId) => set({ proceduresId: proceduresId }),
      setUserNameLab: (userNameLab) => set({ userNameLab: userNameLab }),
      setNamePatient: (namePatient) => set({ namePatient: namePatient }),
      setCpfPatient: (cpfPatient) => set({ cpfPatient: cpfPatient }),
      setNameLaudo: (nameLaudo) => set({ nameLaudo: nameLaudo }),
      setCpfLaudo: (cpfLaudo) => set({ cpfLaudo: cpfLaudo }),
      setMotivo: (motivo) => set({ motivo: motivo }),
      setNameInactive: (nameInactive) => set({ nameInactive: nameInactive }),
      setCrmInactive: (crmInactive) => set({ crmInactive: crmInactive }),
      setRefresh: (refresh) => set({ refresh: refresh }),
      setInactiveType: (inactiveType) => set({ inactiveType: inactiveType }),
      setTicket: (ticket) => set({ ticket: ticket }),
      setSession: (session) => set({ session: session }),
      setCurrentPassword: (currentPassword) =>
        set({ currentPassword: currentPassword }),
      setName: (name) => set({ name: name }),
      setRole: (role) => set({ role: role }),
      setEmail: (email: string) => set({ email: email }),
      setToken: (token) => set({ token: token }),
      setClientId: (idClient) => set({idClient: idClient}),
      setClientProgramId: (idClientProgram) => set({idClientProgram: idClientProgram}),
      onLogin: () => set({ isLogged: true }),
      onLogout: () =>
        set({
          isLogged: false,
          token: "",
          email: "",
          role: "",
          name: "",
          changePassword: false,
          currentPassword: "",
          inactiveType: "",
          session: "",
          ticket: "",
          motivo: "",
          nameLaudo: "",
          cpfLaudo: "",
          namePatient: "",
          cpfPatient: "",
          userNameLab: "",
          nameInactive: "",
          crmInactive: "",
          proceduresId: "",
          isLoading: false,
          idUser: "",
          idClient: "",
          idClientProgram: ""
        }),
      setChangePassword: (changePassword) =>
        set({ changePassword: changePassword }),
    }),
    {
      name: "session-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useSession;

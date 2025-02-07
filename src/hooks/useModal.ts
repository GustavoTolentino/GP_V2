import { create } from "zustand";

interface ModalProps {
  isModalOpen: boolean;
  openModal: (action: boolean) => void;
}

export const useModal = create<ModalProps>((set) => ({
  isModalOpen: false,
  openModal: (action) => set(() => ({ isModalOpen: action })),
}));

export const useAccept = create<ModalProps>((set) => ({
  isModalOpen: false,
  openModal: (action) => set(() => ({ isModalOpen: action })),
}));

export const useModalEmail = create<ModalProps>((set) => ({
  isModalOpen: false,
  openModal: (action) => set(() => ({ isModalOpen: action })),
}));

export const passwordErr = create<ModalProps>((set) => ({
  isModalOpen: false,
  openModal: (action) => set(() => ({ isModalOpen: action })),
}));

export const passwordCorrect = create<ModalProps>((set) => ({
  isModalOpen: false,
  openModal: (action) => set(() => ({ isModalOpen: action })),
}));

export const acceptPreRegisterModal = create<ModalProps>((set) => ({
  isModalOpen: false,
  openModal: (action) => set(() => ({ isModalOpen: action })),
}));

export const modalRegisterUser = create<ModalProps>((set) => ({
  isModalOpen: false,
  openModal: (action) => set(() => ({ isModalOpen: action })),
}));

export const useModalRescue = create<ModalProps>((set) => ({
  isModalOpen: false,
  openModal: (action) => set(() => ({ isModalOpen: action })),
}));

export const useModalInativePartial = create<ModalProps>((set) => ({
  isModalOpen: false,
  openModal: (action) => set(() => ({ isModalOpen: action })),
}));

export const useModalTotalPartial = create<ModalProps>((set) => ({
  isModalOpen: false,
  openModal: (action) => set(() => ({ isModalOpen: action })),
}));

export const useSendLaudo = create<ModalProps>((set) => ({
  isModalOpen: false,
  openModal: (action) => set(() => ({ isModalOpen: action })),
}));

export const useSucessExam = create<ModalProps>((set) => ({
  isModalOpen: false,
  openModal: (action) => set(() => ({ isModalOpen: action })),
}));

export const useSolicitation = create<ModalProps>((set) => ({
  isModalOpen: false,
  openModal: (action) => set(() => ({ isModalOpen: action })),
}));

export const useInsufficientSample = create<ModalProps>((set) => ({
  isModalOpen: false,
  openModal: (action) => set(() => ({ isModalOpen: action })),
}));

export const useUnidentifiedSample = create<ModalProps>((set) => ({
  isModalOpen: false,
  openModal: (action) => set(() => ({ isModalOpen: action })),
}));

export const useChangePassword = create<ModalProps>((set) => ({
  isModalOpen: false,
  openModal: (action) => set(() => ({ isModalOpen: action })),
}));

export const acceptModal = create<ModalProps>((set) => ({
  isModalOpen: false,
  openModal: (action) => set(() => ({ isModalOpen: action })),
}));

export const rescueModal = create<ModalProps>((set) => ({
  isModalOpen: false,
  openModal: (action) => set(() => ({ isModalOpen: action })),
}));

export const userRegister = create<ModalProps>((set) => ({
  isModalOpen: false,
  openModal: (action) => set(() => ({ isModalOpen: action })),
}));

export const useNotification = create<ModalProps>((set) => ({
  isModalOpen: false,
  openModal: (action) => set(() => ({ isModalOpen: action })),
}));

export const userServiceEdit = create<ModalProps>((set) => ({
  isModalOpen: false,
  openModal: (action) => set(() => ({ isModalOpen: action })),
}));

export const userServiceHistory = create<ModalProps>((set) => ({
  isModalOpen: false,
  openModal: (action) => set(() => ({ isModalOpen: action })),
}));

export const userFeedbackRegister = create<ModalProps>((set) => ({
  isModalOpen: false,
  openModal: (action) => set(() => ({ isModalOpen: action })),
}));

export const userFeedbackHistory = create<ModalProps>((set) => ({
  isModalOpen: false,
  openModal: (action) => set(() => ({ isModalOpen: action })),
}));

export const userFeedbackEdit = create<ModalProps>((set) => ({
  isModalOpen: false,
  openModal: (action) => set(() => ({ isModalOpen: action })),
}));

export const userInvoiceRegister = create<ModalProps>((set) => ({
  isModalOpen: false,
  openModal: (action) => set(() => ({ isModalOpen: action })),
}));

export const clientRegister = create<ModalProps>((set) => ({
  isModalOpen: false,
  openModal: (action) => set(() => ({ isModalOpen: action })),
}));

export const examsModal = create<ModalProps>((set) => ({
  isModalOpen: false,
  openModal: (action) => set(() => ({ isModalOpen: action })),
}));

export const medicamentsModal = create<ModalProps>((set) => ({
  isModalOpen: false,
  openModal: (action) => set(() => ({ isModalOpen: action })),
}));

export const clientPerProgramModal = create<ModalProps>((set) => ({
  isModalOpen: false,
  openModal: (action) => set(() => ({ isModalOpen: action })),
}));
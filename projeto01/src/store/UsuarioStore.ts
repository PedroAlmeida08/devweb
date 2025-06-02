import { create } from "zustand";

interface UsuarioStore {
  usuarioLogado: number;
  loginInvalido: boolean;

  setUsuarioLogado: (novoUsuariogado: number) => void;
  setLoginInvalido: (novoLoginInvalido: boolean) => void;
}

const useUsuarioStore = create<UsuarioStore>((set) => ({
  usuarioLogado: 0,
  loginInvalido: false,

  setUsuarioLogado: (novoUsuarioLogado: number) => set(() => ({ usuarioLogado: novoUsuarioLogado })),
  setLoginInvalido: (novoLoginInvalido: boolean) => set(() => ({loginInvalido: novoLoginInvalido}))
}));
export default useUsuarioStore;

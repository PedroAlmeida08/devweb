import { create } from "zustand";

interface ProdutoStore {
  pagina: number;
  tamanho: number;
  nome: string;

  setPagina: (novaPagina: number) => void;
  setTamanho: (novoTamanho: number) => void;
  setNome: (novoNome: string) => void;
}

const useProdutoStore = create<ProdutoStore>((set) => ({
  pagina: 0,
  tamanho: 5,
  nome: "",

  setPagina: (novaPagina: number) => set(() => ({ pagina: novaPagina })),
  setTamanho: (novoTamanho: number) => set(() => ({tamanho: novoTamanho})),
  setNome: (novoNome: string) => set(() => ({ nome: novoNome })),
}));
export default useProdutoStore;

// const produtoStore = useProdutoStore();
// const setPagina = useProdutoStore((s) => s.setPagina);

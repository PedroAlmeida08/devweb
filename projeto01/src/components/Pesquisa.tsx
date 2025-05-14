import { FormEvent, useRef } from "react";

interface Props{
    tratarNome: {nome: string} => void;
}

const Pesquisa = ({tratarNome}: Props) => {
    const nomeRef = useRef<HTMLInputElement>(null);
    return (
    <form onSubmit={(event: FormEvent<HTMLFormElement>)=> {
        event.preventDefault(); //evita que a requisição seja enviada para o servidor
        tratarNome(nomeRef.current!.value);
    }} className="d-flex flex-row mb-3">
        <input 
            type="text"
            className="form-control form-control-sm me-3"
            placeholder="Informe o nome do produto ..."
        />
        <button type="submit" className="btn btn-primary btn-sm ps-4 pe-4"></button>
    </form>
  )
}

export default Pesquisa
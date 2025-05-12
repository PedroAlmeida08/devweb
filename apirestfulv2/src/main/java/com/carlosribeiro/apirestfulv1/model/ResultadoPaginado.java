package com.carlosribeiro.apirestfulv1.model;

import java.util.List;

public record ResultadoPaginado<T>(
        long totalDeItens,
        int totalDePaginas,
        int PaginaCorrente,
        List<T> itens)
        {
}

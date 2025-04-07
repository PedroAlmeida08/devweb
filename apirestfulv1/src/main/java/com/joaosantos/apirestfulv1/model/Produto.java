package com.joaosantos.apirestfulv1.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.math.BigDecimal;
import java.time.LocalDate;

@Getter // Lombok cria os métodos getter
@Setter // lombok cria os métodos setter
@NoArgsConstructor // Lombok cria um método construtor padrão
@ToString // Lombok cria o método ToString
@Entity
public class Produto {
    @Id // indica correspondência a chave primária no BD
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Campo com auto incremento
    private Long id;
    private String imagem;
    private String nome;
    private String descricao;
    private boolean disponivel;
    private int qtdEstoque;

    public BigDecimal getPreco() {
        return preco;
    }

    public void setPreco(BigDecimal preco) {
        this.preco = preco;
    }

    private BigDecimal preco;
    private LocalDate dataCadastro;
    private String categoria;
}

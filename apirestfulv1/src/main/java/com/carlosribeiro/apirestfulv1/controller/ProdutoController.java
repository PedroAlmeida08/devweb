package com.carlosribeiro.apirestfulv1.controller;

import com.carlosribeiro.apirestfulv1.model.Produto;
import com.carlosribeiro.apirestfulv1.service.ProdutoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("http://localhost:5173")
@RestController
@RequestMapping("produtos")  // http://localhost:8080/produtos
public class ProdutoController {

    @Autowired
    private ProdutoService produtoService;

    @GetMapping   // Requisição do tipo GET para http://localhost:8080/produtos
    public List<Produto> recuperarProdutos() {
//        if (true) {
//            throw new RuntimeException("Deu erro no servidor.");
//        }
        return produtoService.recuperarProdutos();
    }

    @PostMapping
    public Produto cadastraProduto(@RequestBody Produto produto) {
        return produtoService.cadastrarProduto(produto);
    }

    @PutMapping
    public Produto alterarProduto(@RequestBody Produto produto) {
        return produtoService.alterarProduto(produto);
    }

    @DeleteMapping  ("{idProduto}")   // hhtp://localhost:8080/produtos/1
    public void removerProduto(@PathVariable("idProduto") long id) {
        produtoService.removerProduto(id);
    }
}

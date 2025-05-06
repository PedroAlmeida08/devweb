package com.joaosantos.apirestfulv1;

import com.joaosantos.apirestfulv1.model.Categoria;
import com.joaosantos.apirestfulv1.model.Produto;
import com.joaosantos.apirestfulv1.repository.CategoriaRepository;
import com.joaosantos.apirestfulv1.repository.ProdutoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.math.BigDecimal;
import java.time.LocalDate;

@SpringBootApplication
public class Apirestfulv1Application implements CommandLineRunner {

	// Quando o método run encontra essa anotação, cria um objeto de uma classe que implementa a
	// interface ProdutoRepository
	@Autowired
	private ProdutoRepository produtoRepository;

	@Autowired
	private CategoriaRepository categoriaRepository;

	// .run() é um método CommandLineRunner e será utilizado para popular banco de dados
	// .run() coloca no ar o servidor Tomcat
	// .run() abre e lê as configurações presentes em resources.application.properties
	public static void main(String[] args) {
		SpringApplication.run(Apirestfulv1Application.class, args);
	}

	@Override
	public void run(String... args) throws Exception {

		Categoria frutas = new Categoria("Frutas");
		categoriaRepository.save(frutas);
		Categoria legumes = new Categoria("Legumes");
		categoriaRepository.save(legumes);
		Categoria verduras = new Categoria("Verduras");
		categoriaRepository.save(verduras);

		Produto produto = new Produto(
				"abacate.png",
				"Abacate",
				"1 unidade aprox. 750g",
				true,
				100,
				BigDecimal.valueOf(2.45),
				LocalDate.of(2024, 4, 26),
				frutas);

		// Se produto for um objeto transiente, .save() chama o método persist da JPA
		// Se produto for um objeto destacado, .save() chama o método merge da JPA
		// Em tempo de compilação, .save() é procurado de ProdutoRepository pra cima
		// Em tempo de execução, .save() é procurado de ProdutoRepositoryImpl e encontra o método .save() de DAOGenericoImpl e o herda
		produtoRepository.save(produto);

		produto = new Produto(
				"abobrinha.png",
				"Abobrinha",
				"1 unidade aprox. 250g",
				false,
				200,
				BigDecimal.valueOf(1.1),
				LocalDate.of(2024, 5, 22),
				legumes);

		produtoRepository.save(produto);

		produto = new Produto(
				"abobora.png",
				"Abóbora",
				"1 unidade aprox. 1,9Kg",
				true,
				400,
				BigDecimal.valueOf(4.7),
				LocalDate.of(2023, 3, 24),
				legumes);

		produtoRepository.save(produto);

		produto = new Produto(
				"acelga.png",
				"Acelga",
				"1 maço de aprox. 400g",
				true,
				120,
				BigDecimal.valueOf(4.99),
				LocalDate.of(2023, 3, 12),
				verduras);

		produtoRepository.save(produto);

		produto = new Produto(
				"agriao.png",
				"Agrião",
				"1 maço de aprox. 200g",
				true,
				340,
				BigDecimal.valueOf(2.5),
				LocalDate.of(2023, 5, 17),
				verduras);

		produtoRepository.save(produto);

		produto = new Produto(
				"alface.png",
				"Alface",
				"1 maço de aprox. 200g",
				true,
				220,
				BigDecimal.valueOf(4.99),
				LocalDate.of(2023, 5, 14),
				verduras);

		produtoRepository.save(produto);

		produto = new Produto(
				"banana.png",
				"Banana",
				"1 unidade aprox. 165g",
				true,
				350,
				BigDecimal.valueOf(1.05),
				LocalDate.of(2023, 2, 22),
				frutas);

		produtoRepository.save(produto);

		produto = new Produto(
				"beringela.png",
				"Beringela",
				"1 unidade aprox. 370g",
				true,
				720,
				BigDecimal.valueOf(1.85),
				LocalDate.of(2023, 2, 23),
				legumes);

		produtoRepository.save(produto);

		produto = new Produto(
				"brocolis.png",
				"Brócolis",
				"1 unidade aprox. 300g",
				true,
				600,
				BigDecimal.valueOf(5.39),
				LocalDate.of(2023, 3, 28),
				verduras);

		produtoRepository.save(produto);

		produto = new Produto(
				"cebola.png",
				"Cebola",
				"1 unidade aprox. 200g",
				true,
				95,
				BigDecimal.valueOf(0.56),
				LocalDate.of(2023, 4, 30),
				legumes);

		produtoRepository.save(produto);

		produto = new Produto(
				"cenoura.png",
				"Cenoura",
				"1 unidade aprox. 180g",
				true,
				350,
				BigDecimal.valueOf(1.01),
				LocalDate.of(2023, 5, 29),
				legumes);

		produtoRepository.save(produto);

		produto = new Produto(
				"cereja.png",
				"Cereja",
				"1 unidade aprox. 250g",
				true,
				240,
				BigDecimal.valueOf(11.23),
				LocalDate.of(2023, 5, 11),
				frutas);

		produtoRepository.save(produto);

		System.out.println("Ok!");
	}
}
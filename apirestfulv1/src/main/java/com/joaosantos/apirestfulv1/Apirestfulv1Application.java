package com.joaosantos.apirestfulv1;

import com.joaosantos.apirestfulv1.model.Produto;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.math.BigDecimal;
import java.time.LocalDate;

@SpringBootApplication
public class Apirestfulv1Application implements CommandLineRunner {

	// .run() coloca no ar o servidor Tomcat
	public static void main(String[] args) {
		SpringApplication.run(Apirestfulv1Application.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		Produto produto = new Produto(
				"abacate.png",
				"Abacate",
				"1 unidade aprox. 750g",
				true,
				100,
				BigDecimal.valueOf(2.45),
				LocalDate.of(2024, 4, 26),
				"frutas");

		produto = new Produto(
				"abobrinha.jpg",
				"Abobrinha",
				"1 unidade aprox. 250g",
				false,
				200,
				BigDecimal.valueOf(1.1),
				LocalDate.of(2024, 5, 22),
				"legumes");

		System.out.println("Ok!");
	}
}

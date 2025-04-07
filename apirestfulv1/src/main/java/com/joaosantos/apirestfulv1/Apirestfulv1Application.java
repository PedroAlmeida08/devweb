package com.joaosantos.apirestfulv1;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class Apirestfulv1Application implements CommandLineRunner {

	// .run() coloca no ar o servidor Tomcat
	public static void main(String[] args) {
		SpringApplication.run(Apirestfulv1Application.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		System.out.println("Olá!");
	}
}

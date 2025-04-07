package com.carlosribeiro.util;

import org.reflections.Reflections;

import java.lang.reflect.InvocationTargetException;
import java.util.Set;

public class FabricaDeDAOs
{	
	public static <T> T getDAO(Class<T> tipo)
	{
		// Tipo aponta para um objeto do tipo ProdutoDAO.class

		// Permite que a gente investigue as classes no package "com.carlosribeiro.dao.impl"
		// Passa o package onde queremos que seja procurado a classe que implementa a interface
		Reflections reflections = new Reflections("com.carlosribeiro.dao.impl");

		// A linha abaixo verifica se no package "com.carlosribeiro.dao.impl"
		// existe uma classe subtipo de ProdutoDAO.class
		// Vai retornar um Set contendo a classe JPAProdutoDAO
		// um subtipo é uma classe que deriva de outra classe, ou seja,
		// que herda seus comportamentos e métodos.
		// A classe base é chamada de superclasse.
		Set<Class<? extends T>> conjunto = reflections.getSubTypesOf(tipo);

		// Não pode haver mais de uma classe nesse package que implemente ProdutoDAO
		// caso contrário a gente não saberia qual utilizar e por isso o Set é utilizado.
		// Um Set não aceita elementos repetidos
		if (conjunto.size() != 1){
			throw new RuntimeException(
					"Deve haver apenas uma classe que implemente a interface " +
					tipo.getName() + ".");
		}

		// O Iterador é um padrão de projeto comportamental que permite a passagem sequencial através
		// de uma estrutura de dados complexa sem expor seus detalhes internos.

		// iterator.hasNext() verifica se há um próximo elemento
		// iterator.next() recuperar o próximo elemento

		// Retorna a classe JPAProdutoDAO na variável classe.
		Class <? extends T> classe = conjunto.iterator().next();

		// Instancia um objeto do tipo JPAProdutoDAO usando o construtor Padrão
		// Procura por um construtor padrão, ou seja, que não recebe nada

		// Mouseover getDeclaredConstructor() -> More actions -> Surround with try/catch
		// Mouseover catch -> collapse catch blocks
		try {
			// == new JPAProdutoDAO(); --> Não utiliza reflexão
			return classe.getDeclaredConstructor().newInstance(); // --> Utiliza reflexão
		} catch (InstantiationException |    // erro quando o subtipo não implementa o tipo
				 IllegalAccessException |
				 InvocationTargetException | // erro na execução do método construtor
				 NoSuchMethodException e) {  // erro se não existir o método construtor padrão
			throw new RuntimeException(e);
		}

		// ProdudoDAO.class aponta para uma variável do tipo JPAProdutoDAO, que é um objeto do tipo class
		// Retorna um objeto do tipo JPAProdutoDAO, equivalente a retornar ProdutoDAO

	}
}

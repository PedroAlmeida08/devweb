package com.carlosribeiro.util;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

// Padrão de projeto Singleton (apenas um objeto em memória é utilizado)
public class FabricaDeEntityManager
{
	// Como fabrica é uma variável estática, pode ser acessada através de FabricaDeEntityManager.class
	private static FabricaDeEntityManager fabrica = null;
	private EntityManagerFactory emf = null;

	// Método Construtor
	private FabricaDeEntityManager() {
		try {
			emf = Persistence.createEntityManagerFactory("exercicio");
		}
		catch(Throwable e) {
			e.printStackTrace();
			System.out.println(">>>>>>>>>> Mensagem de erro: " + e.getMessage());
		}
	}

	public static EntityManager criarEntityManager() {
		if (fabrica == null) {
			// Cria um objeto do tipo FabricaDeEntityManager e fabrica agora aponta para esse objeto
			// new executa o Método Construtor privado de FabricaDeEntityManager.java
			// emf passa a ser uma variável estática de fabrica e aponta para um objeto emf que contém o
			// método createEntityManager() que realmente cria o Entity Manager
			fabrica = new FabricaDeEntityManager();
		}
		return fabrica.emf.createEntityManager();
	}
}
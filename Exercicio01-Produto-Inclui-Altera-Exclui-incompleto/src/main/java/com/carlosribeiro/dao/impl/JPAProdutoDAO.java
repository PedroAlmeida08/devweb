package com.carlosribeiro.dao.impl;

import com.carlosribeiro.dao.ProdutoDAO;
import com.carlosribeiro.excecao.ProdutoNaoEncontradoException;
import com.carlosribeiro.modelo.Produto;
import com.carlosribeiro.util.FabricaDeEntityManager;

import javax.persistence.EntityManager;
import javax.persistence.EntityTransaction;
import java.util.List;

public class JPAProdutoDAO implements ProdutoDAO
{	
	public long inclui(Produto umProduto)
	{
		EntityManager em = null;
		EntityTransaction tx = null;

		try
		{	// transiente - objeto novo: ainda não persistente
			// persistente - após ser persistido
			// destacado - objeto persistente não vinculado a um entity manager

			// 1) Criar um entity manager
			em = FabricaDeEntityManager.criarEntityManager();
			// 2) Criar um objeto que cria uma transação ou recupera uma existente
			tx = em.getTransaction();
			// 3) Iniciar transação (envia um begin transaction para o SGBD)
			tx.begin();
			// 4) Salva o objeto no BD
			em.persist(umProduto);

			// Verifica umProduto no EntityManager e agenda um UPDATE (setNome) no BD
			// No momento do commit executa um INSERT e então um UPDATE
			// umProduto.setNome("abc");
			// umProduto.setNome("abc");

			// 5) Commita a transação
			tx.commit();

			// 6) Retorna o Id do produto
			return umProduto.getId();
		}
		catch(RuntimeException e)
		    // Entrou no catch a exceção morre
		{	if (tx != null)
			{
				// 7) Se a transação foi criada mas houve um erro, efetua rollback
				tx.rollback();
			}
			// Ressucita a exceção e retorna ao Principal.java
			throw e;
		}
		finally
		{
			// 8) Destrói o Entity Manager
			em.close();
		}
	}

	public Produto recuperaUmProduto(long numero) throws ProdutoNaoEncontradoException
	{
		EntityManager em = null;

		try
		{
			em = FabricaDeEntityManager.criarEntityManager();

			// 1) Encontra o produto no BD
			// O Boxing de numero acontece de forma automática
			// Boxing de numero ==> numero = new Integer(numero), dessa forma, find recebe um objeto "numero"
			Produto umProduto = em.find(Produto.class, numero);

			// Características no método find():
			// 1. É genérico: não requer um cast.
			// 2. Retorna null caso a linha não seja encontrada no banco.

			if(umProduto == null)
			{
				// Propaga exceção para Principal
				throw new ProdutoNaoEncontradoException("Produto não encontrado");
			}
			return umProduto;
		}
		finally
		{
			em.close();
		}
	}

	public void altera(Produto umProduto) throws ProdutoNaoEncontradoException
	{
//		EntityManager em = null;
//		EntityTransaction tx = null;
//		Produto produto = null;
//		try
//		{
//			em = FabricaDeEntityManager.criarEntityManager();
//			tx = em.getTransaction();
//			tx.begin();
//
//// ==>
//
//			if (produto == null) {
//// ==>
//			}
//			// O merge entre nada e tudo é tudo. Ao tentar alterar um produto deletado ele será re-inserido
//			// no banco de dados.
//// ==>
//
//// ==>
//		}
//		catch(RuntimeException e)
//		{
//			if (tx != null)
//		    {   tx.rollback();
//		    }
//		    throw e;
//		}
//		finally
//		{   em.close();
//		}
	}

	public void exclui(long numero) throws ProdutoNaoEncontradoException 
	{
//		EntityManager em = null;
//		EntityTransaction tx = null;
//
//		try
//		{
//			em = FabricaDeEntityManager.criarEntityManager();
//			tx = em.getTransaction();
//			tx.begin();
//
//// ==>
//
//			if(produto == null)
//			{	tx.rollback();
//				throw new ProdutoNaoEncontradoException("Produto não encontrado");
//			}
//
//// ==>
//			tx.commit();
//		}
//		catch(RuntimeException e)
//		{
//			if (tx != null)
//		    {   tx.rollback();
//		    }
//		    throw e;
//		}
//		finally
//		{   em.close();
//		}
	}

	public List<Produto> recuperaProdutos()
	{
		return null;
//		EntityManager em = null;
//
//		try
//		{	em = FabricaDeEntityManager.criarEntityManager();
//
//			List produtos = em
//// ==>
//
//			// Retorna um List vazio caso a tabela correspondente esteja vazia.
//
//			return produtos;
//		}
//		finally
//		{   em.close();
//		}
	}
}
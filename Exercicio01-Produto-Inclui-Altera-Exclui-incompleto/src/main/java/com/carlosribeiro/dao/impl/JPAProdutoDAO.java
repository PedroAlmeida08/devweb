package com.carlosribeiro.dao.impl;

import com.carlosribeiro.dao.ProdutoDAO;
import com.carlosribeiro.excecao.ProdutoNaoEncontradoException;
import com.carlosribeiro.modelo.Produto;
import com.carlosribeiro.util.FabricaDeEntityManager;

import javax.persistence.EntityManager;
import javax.persistence.EntityTransaction;
import javax.persistence.LockModeType;
import java.util.List;

public class JPAProdutoDAO implements ProdutoDAO
{
	public long inclui(Produto umProduto) {
		EntityManager em = null;
		EntityTransaction tx = null;

		try {    // transiente - objeto novo: ainda não persistente
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
		} catch(RuntimeException e)
		// Entrou no catch a exceção morre
		{
			if (tx != null) {
				// 7) Se a transação foi criada mas houve um erro, efetua rollback
				tx.rollback();
			}
			// Ressucita a exceção e retorna ao Principal.java
			throw e;
		} finally {
			// 8) Destrói o Entity Manager
			em.close();
		}
	}

	public Produto recuperaUmProduto(long numero) throws ProdutoNaoEncontradoException {
		EntityManager em = null;

		try {
			em = FabricaDeEntityManager.criarEntityManager();

			// 1) Encontra o produto no BD
			// O Boxing de numero acontece de forma automática
			// Boxing de numero ==> numero = new Integer(numero), dessa forma, find recebe um objeto "numero"
			Produto umProduto = em.find(Produto.class, numero);

			// Características no método find():
			// 1. É genérico: não requer um cast.
			// 2. Retorna null caso a linha não seja encontrada no banco.

			if(umProduto == null) {
				// Propaga exceção para Principal
				throw new ProdutoNaoEncontradoException("Produto não encontrado");
			}
			return umProduto;
		} finally {
			em.close();
		}
	}

	public void altera(Produto umProduto) throws ProdutoNaoEncontradoException {
		EntityManager em = null;
		EntityTransaction tx = null;
		Produto produto = null;

		try {
			em = FabricaDeEntityManager.criarEntityManager();
			tx = em.getTransaction();
			tx.begin();

			// LockModeType.PESSIMISTIC_WRITE => SELECT FOR UPDATE, que é um comando sql
			// que bloqueia as linhas retornadas por uma consulta SELECT até que toda a transação
			// da qual a consulta faz parte tenha sido confirmada

			// Recupera o produto, coloca um lock
			// Produto.class é classe Produto na memória
			produto = em.find(Produto.class, umProduto.getId(), LockModeType.PESSIMISTIC_WRITE);

			if (produto == null) {
				tx.rollback();
				throw new ProdutoNaoEncontradoException(
					"Produto número " + umProduto.getId() + "não encontrado.");
			}

			// Existe no Entity Manager um Produto com id desejado?
			// Merge procura no Banco de Dados um Produto com o id, se encontrar, coloca um lock
			// na linha e insere o Produto na lista de objetos monitorados pelo Entity Manager
			// Verifica o atributo desejado do objeto destacado Produto de Principal.java,
			// por exemplo, (umProduto.setNome(novoNome)) e, se esse atributo for diferente
			// do atributo desse mesmo Produto no Banco de Dados, altera esse atributo
			// no objeto transiente e agenda um UPDATE

			// Se não encontra o produto no Banco de Dados, o comando merge insere o Produto
			// no Banco de Dados, pois o merge entre nada e tudo é tudo. Ao tentar alterar
			// um produto deletado ele será re-inserido no banco de dados. Por isso é importante
			// verificar se produto != null e realizar o lock para ninguém alterá-lo ou excluí-lo
			// enquanto sua transação é feita
			em.merge(umProduto);

			tx.commit();

		} catch(RuntimeException e) {
			if (tx != null) {
				tx.rollback();
			}
			throw e;
		} finally {
			em.close();
		}
	}

	public void exclui(long numero) throws ProdutoNaoEncontradoException {

		EntityManager em = null;
		EntityTransaction tx = null;

		try
		{
			em = FabricaDeEntityManager.criarEntityManager();
			tx = em.getTransaction();
			tx.begin();

			// A remoção deve ser sempre de um objeto persistente
			// JPA não permite a exclusão de um objeto destacado,
			// por isso, é necessário buscar esse objeto no Banco de Dados

			// Se quem excluiu o registro for importante, usar SELECT FOR UPDATE, cc, não
			// numero é long, passa pelo boxing para Long
			Produto produto = em.find(Produto.class, numero);

			if(produto == null)
			{	tx.rollback();
				throw new ProdutoNaoEncontradoException("Produto não encontrado");
			}

			//
			em.remove(produto);

			tx.commit();
		}
		catch(RuntimeException e) {
			if (tx != null) {
				tx.rollback();
		    }
		    throw e;
		}
		finally {
			em.close();
		}
	}

	public List<Produto> recuperaProdutos() {
		EntityManager em = null;

		try
		{	em = FabricaDeEntityManager.criarEntityManager();

			// createQuery recebe um comando em JPQL - Java Persistence Query Language
			// Produto == classe Produto != objeto produto
			// p.id == p.getId(), o que obriga Produto a ter um método getId()
			List produtos = em
					.createQuery("select p from Produto p order by p.id")
					.getResultList();

			// Retorna um List vazio caso a tabela correspondente esteja vazia.

			return produtos;
		}

		finally {
			em.close();
		}
	}
}
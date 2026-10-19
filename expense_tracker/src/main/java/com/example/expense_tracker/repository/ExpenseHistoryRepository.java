package com.example.expense_tracker.repository;

import java.util.List;

import org.springframework.data.cassandra.repository.CassandraRepository;
import org.springframework.data.cassandra.repository.Query;

import com.example.expense_tracker.entity.ExpenseHistory;

public interface ExpenseHistoryRepository extends CassandraRepository<ExpenseHistory, Long> {
	@Query("SELECT * FROM expense_history WHERE expense_id = ?0")
	List<ExpenseHistory> findByKeyExpenseid(Long expenseId);
}

package com.example.expense_tracker.service;

import java.time.Instant;
import java.time.LocalDate;
import java.util.List;

import org.springframework.stereotype.Service;

import com.example.expense_tracker.entity.ExpenseHistory;
import com.example.expense_tracker.entity.ExpenseHistoryKey;
import com.example.expense_tracker.repository.ExpenseHistoryRepository;

@Service
public class ExpenseHistoryService {

	private ExpenseHistoryRepository historyRepository;

	public ExpenseHistoryService(ExpenseHistoryRepository historyRepository) {
		this.historyRepository = historyRepository;
	}

	public void saveHistory(Long expense_id, String description, String Category, Double amount, LocalDate date,
			String event_type) {
		ExpenseHistoryKey key = new ExpenseHistoryKey(expense_id, Instant.now());
		ExpenseHistory history = new ExpenseHistory(key, description, Category, amount, date, event_type);
		System.out.println("Expense ID: " + key.getExpense_id());
		System.out.println("Event Time: " + key.getExpense_time());
		historyRepository.save(history);

	}

	public List<ExpenseHistory> getHistory(Long expenseId) {
		return historyRepository.findByKeyExpenseid(expenseId);
	}

}

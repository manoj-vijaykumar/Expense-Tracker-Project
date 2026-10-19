package com.example.expense_tracker.service;

import java.time.LocalDate;
import java.util.List;

import org.springframework.stereotype.Service;

import com.example.expense_tracker.entity.Expense;
import com.example.expense_tracker.repository.ExpenseHistoryRepository;
import com.example.expense_tracker.repository.ExpenseRepository;

@Service
public class ExpenseService {
	private ExpenseRepository expenseRepository;
	private ExpenseHistoryService expenseHistoryService;
	private ExpenseHistoryRepository expenseHistoryRepository;

	public ExpenseService(ExpenseRepository expenseRepository, ExpenseHistoryService expenseHistoryService,
			ExpenseHistoryRepository expenseHistoryRepository) {
		this.expenseRepository = expenseRepository;
		this.expenseHistoryService = expenseHistoryService;
		this.expenseHistoryRepository = expenseHistoryRepository;

	}

	public List<Expense> getAllExpenses() {
		return expenseRepository.findAll();
	}

	public Expense addExpense(String description, String category, Float amount, String date) {
		Expense expense = new Expense();
		expense.setDescription(description);
		expense.setCategory(category);
		expense.setAmount(amount.doubleValue());
		expense.setDate(LocalDate.parse(date));

		Expense savedExpense = expenseRepository.save(expense);

		expenseHistoryService.saveHistory(savedExpense.getId(), savedExpense.getDescription(),
				savedExpense.getCategory(), savedExpense.getAmount(), savedExpense.getDate(), "ADDED");

		return savedExpense;
	}

	public Expense getProductBYId(Long id) {
		return expenseRepository.findById(id).orElse(null);
	}

	public Expense updateExpense(Long id, String description, String category, Float amount, String date) {

//		Expense expense = new Expense();
		Expense existingExpense = expenseRepository.findById(id).orElse(null);

		existingExpense.setDescription(description);
		existingExpense.setCategory(category);
		existingExpense.setAmount(amount.doubleValue());
		existingExpense.setDate(LocalDate.parse(date));
		return expenseRepository.save(existingExpense);

	}

	public void deleteExpense(Long id) {
		Expense expense = expenseRepository.findById(id).orElse(null);
		expenseHistoryService.saveHistory(expense.getId(), expense.getDescription(), expense.getCategory(),
				expense.getAmount(), expense.getDate(), "DELETED");

		expenseRepository.deleteById(id);
	}

}

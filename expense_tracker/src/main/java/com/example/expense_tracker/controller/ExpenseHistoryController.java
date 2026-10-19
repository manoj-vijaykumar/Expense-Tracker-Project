package com.example.expense_tracker.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.expense_tracker.entity.ExpenseHistory;
import com.example.expense_tracker.service.ExpenseHistoryService;

@RestController
@RequestMapping("/api/expenses")
public class ExpenseHistoryController {

	private ExpenseHistoryService expenseHistoryService;

	public ExpenseHistoryController(ExpenseHistoryService expenseHistoryService) {
		super();
		this.expenseHistoryService = expenseHistoryService;
	}

	@GetMapping("/{expenseId}/history")
	public List<ExpenseHistory> getHistory(@PathVariable Long expenseId) {
		return expenseHistoryService.getHistory(expenseId);
	}
}

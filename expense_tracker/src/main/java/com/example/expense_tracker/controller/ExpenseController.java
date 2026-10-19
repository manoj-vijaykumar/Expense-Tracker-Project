package com.example.expense_tracker.controller;

import java.util.List;

import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;

import com.example.expense_tracker.entity.Expense;
import com.example.expense_tracker.service.ExpenseService;

@Controller
public class ExpenseController {

	private ExpenseService expenseService;

	public ExpenseController(ExpenseService expenseService) {
//		super();
		this.expenseService = expenseService;
	}

	@QueryMapping(name = "expenses")
	public List<Expense> getAllExpenses() {
		return expenseService.getAllExpenses();
	}

	@MutationMapping
	public Expense addExpense(@Argument String description, @Argument String category, @Argument Float amount,
			@Argument String date) {
		return expenseService.addExpense(description, category, amount, date);

	}

	@MutationMapping
	public Expense updateExpense(@Argument Long id, @Argument String description, @Argument String category,
			@Argument Float amount, @Argument String date) {
		return expenseService.updateExpense(id, description, category, amount, date);
	}

	@QueryMapping(name = "getProductbyid")
	public Expense getProductBYId(@Argument Long id) {
		return expenseService.getProductBYId(id);
	}

	@MutationMapping
	public String deleteExpense(@Argument Long id) {
		expenseService.deleteExpense(id);
		return "Expense deleted successfully";

	}

}

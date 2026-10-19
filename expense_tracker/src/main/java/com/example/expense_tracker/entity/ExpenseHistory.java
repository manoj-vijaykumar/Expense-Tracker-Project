package com.example.expense_tracker.entity;

import java.time.Instant;
import java.time.LocalDate;

import org.springframework.data.cassandra.core.mapping.PrimaryKey;
import org.springframework.data.cassandra.core.mapping.Table;

@Table("expense_history")
public class ExpenseHistory {

	@PrimaryKey
	private ExpenseHistoryKey key;
	private String description;
	private String category;
	private Double amount;
	private LocalDate date;
	private String event_type;
//	private Instant event_time;

	public Instant getEvent_time() {
		return key.getExpense_time();
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	public Double getAmount() {
		return amount;
	}

	public void setAmount(Double amount) {
		this.amount = amount;
	}

	public LocalDate getDate() {
		return date;
	}

	public void setDate(LocalDate date) {
		this.date = date;
	}

	public String getEvent_type() {
		return event_type;
	}

	public void setEvent_type(String event_type) {
		this.event_type = event_type;
	}

	public ExpenseHistory(ExpenseHistoryKey key, String description, String category, Double amount, LocalDate date,
			String event_type) {
		super();
		this.key = key;
		this.description = description;
		this.category = category;
		this.amount = amount;
		this.date = date;
		this.event_type = event_type;
	}

}

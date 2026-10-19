package com.example.expense_tracker.entity;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "expenses")
public class Expense {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	private Long id;
	private String description;
	private String category;
	private Double amount;
	private LocalDate date;

	public Expense() {
	}

	public Long getId() {
		return id;
	}

	public LocalDate getDate() {
		return date;
	}

	public void setDate(LocalDate date) {
		this.date = date;
	}

	public String getDescription() {
		return description;
	}

	public String getCategory() {
		return category;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	public void setAmount(Double amount) {
		this.amount = amount;
	}

	public Double getAmount() {
		return amount;
	}

}

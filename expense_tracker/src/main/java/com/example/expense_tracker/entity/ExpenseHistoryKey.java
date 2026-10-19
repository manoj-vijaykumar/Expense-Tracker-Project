package com.example.expense_tracker.entity;

import java.io.Serializable;
import java.time.Instant;

import org.springframework.data.cassandra.core.cql.Ordering;
import org.springframework.data.cassandra.core.cql.PrimaryKeyType;
import org.springframework.data.cassandra.core.mapping.PrimaryKeyClass;
import org.springframework.data.cassandra.core.mapping.PrimaryKeyColumn;

@PrimaryKeyClass
public class ExpenseHistoryKey implements Serializable {

	@PrimaryKeyColumn(name = "expense_id", ordinal = 0, type = PrimaryKeyType.PARTITIONED)
	private Long expenseId;

	@PrimaryKeyColumn(name = "event_time", ordinal = 1, type = PrimaryKeyType.CLUSTERED, ordering = Ordering.ASCENDING)
	private Instant expenseTime;

	public Long getExpense_id() {
		return expenseId;
	}

	public void setExpense_id(Long expense_id) {
		this.expenseId = expense_id;
	}

	public Instant getExpense_time() {
		return expenseTime;
	}

	public void setExpense_time(Instant expenseTime) {
		this.expenseTime = expenseTime;
	}

	public ExpenseHistoryKey(Long expenseId, Instant expenseTime) {
		super();
		this.expenseId = expenseId;
		this.expenseTime = expenseTime;
	}

}

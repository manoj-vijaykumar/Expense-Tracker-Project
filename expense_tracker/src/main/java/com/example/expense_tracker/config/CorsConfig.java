package com.example.expense_tracker.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig implements WebMvcConfigurer {

	@Override
	public void addCorsMappings(CorsRegistry registry) {
		registry.addMapping("/**").allowedOrigins(
    "http://localhost:5173",
    "http://expense-tracker-frontend-mk-2026.s3-website.eu-north-1.amazonaws.com"
).allowedMethods("GET", "POST", "OPTIONS")
				.allowedHeaders("*");
	}
}
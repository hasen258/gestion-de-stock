package com.test.first;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class FirstApplicationTests {

	@Autowired
	private ApplicationContext applicationContext;

	@Test
	void contextLoads() {
		assertNotNull(applicationContext, "Application context should not be null");
	}

	@Test
	void mainClassExists() {
		assertTrue(applicationContext.containsBean("firstApplication"), 
			"FirstApplication bean should exist in the context");
	}

	@Test
	void applicationPropertiesLoaded() {
		assertNotNull(applicationContext.getEnvironment().getProperty("spring.application.name"),
			"Spring application properties should be loaded");
	}

}

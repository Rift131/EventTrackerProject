package com.skilldistillery.hshtracker.entities;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import javax.persistence.Table;

import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;


class EducationEventTest {

	private static EntityManagerFactory emf;
	private EntityManager em;
	
	@BeforeAll
	static void setUpBeforeClass() throws Exception {
		emf = Persistence.createEntityManagerFactory("HSHTrackerJPA");
	}

	@AfterAll
	static void tearDownAfterClass() throws Exception {
		emf.close();
	}

	@BeforeEach
	void setUp() throws Exception {
		em = emf.createEntityManager();
	}

	@AfterEach
	void tearDown() throws Exception {
		em.close();
		
	}

	@Test
	void test_EducationEvent_entity_date() {
		EducationEvent ee = em.find(EducationEvent.class, 1);
		assertNotNull(ee);
		assertEquals(2022, ee.getDate().getYear());
	}
	
	@Test
	void test_EducationEvent_entity_duration() {
		EducationEvent ee = em.find(EducationEvent.class, 1);
		assertNotNull(ee);
		assertEquals(30, ee.getDuration());
	}
	@Test
	void test_EducationEvent_entity_subject() {
		EducationEvent ee = em.find(EducationEvent.class, 1);
		assertNotNull(ee);
		assertEquals("Math", ee.getSubject());
	}
	@Test
	void test_EducationEvent_entity_location() {
		EducationEvent ee = em.find(EducationEvent.class, 1);
		assertNotNull(ee);
		assertEquals("Home", ee.getLocation());
	}
	@Test
	void test_EducationEvent_entity_student() {
		EducationEvent ee = em.find(EducationEvent.class, 1);
		assertNotNull(ee);
		assertEquals("Billy", ee.getStudent());
	}
	@Test
	void test_EducationEvent_entity_notes() {
		EducationEvent ee = em.find(EducationEvent.class, 1);
		assertNotNull(ee);
		assertEquals("Covered Algebra, \"Algebra I\" pg 17", ee.getNotes());
	}
}

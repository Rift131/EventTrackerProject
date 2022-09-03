package com.skilldistillery.hshtracker.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.hshtracker.entities.EducationEvent;

public interface EducationEventRepository extends JpaRepository<EducationEvent, Integer> {
	// FIND ALL IS FREE
	// FIND BY ID
	EducationEvent findById(int edId);
	// ADD EDUCATION EVENT
	//EducationEvent addEdEvent(EducationEvent edEvent);
}

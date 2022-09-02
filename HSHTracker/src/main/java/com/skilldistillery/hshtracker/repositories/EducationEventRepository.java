package com.skilldistillery.hshtracker.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.hshtracker.entities.EducationEvent;

public interface EducationEventRepository extends JpaRepository<EducationEvent, Integer> {

}

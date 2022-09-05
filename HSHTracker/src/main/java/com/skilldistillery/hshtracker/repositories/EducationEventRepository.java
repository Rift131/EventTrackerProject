package com.skilldistillery.hshtracker.repositories;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.hshtracker.entities.EducationEvent;

public interface EducationEventRepository extends JpaRepository<EducationEvent, Integer> {

	EducationEvent findById(int edId);
	List<EducationEvent> findBySubject(String subject);
	List<EducationEvent> findByLocation(String location);
//	List<EducationEvent> findByStudent(String studentName);
//	List<EducationEvent> findByNotes(String notes);
//	List<EducationEvent> findBy_Location_IgnoreCaseLikeOr_Notes_IgnoreCaseLikeOr_Subject_IgnoreCaseLike(String keyword1, String keyword2, String keyword3);
//	List<EducationEvent> findByDateBetween(LocalDateTime start, LocalDateTime end);
}

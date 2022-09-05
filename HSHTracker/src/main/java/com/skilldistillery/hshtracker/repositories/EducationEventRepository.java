package com.skilldistillery.hshtracker.repositories;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.hshtracker.entities.EducationEvent;

public interface EducationEventRepository extends JpaRepository<EducationEvent, Integer> {

	EducationEvent findById(int edId);
	List<EducationEvent> findBySubject(String subject);
	List<EducationEvent> findByLocation(String location);
	List<EducationEvent> findByStudent(String studentName);
	List<EducationEvent> findByNotes_IgnoreCaseLike(String notes);
	List<EducationEvent> findByLocation_IgnoreCaseLikeOrNotes_IgnoreCaseLikeOrSubject_IgnoreCaseLikeOrStudent_IgnoreCaseLike(String keyword1, String keyword2, String keyword3, String keyword4);
//	List<EducationEvent> findByDateBetween(LocalDateTime start, LocalDateTime end);
}

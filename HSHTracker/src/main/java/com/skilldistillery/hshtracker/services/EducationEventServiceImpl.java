package com.skilldistillery.hshtracker.services;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.hshtracker.entities.EducationEvent;
import com.skilldistillery.hshtracker.repositories.EducationEventRepository;

@Service 
public class EducationEventServiceImpl implements EducationEventService{
	@Autowired
	private EducationEventRepository repo;
	// GET METHODS 
	@Override
	public List<EducationEvent> index() {
		return repo.findAll();
	}
	// Find by id or return null (404) if not found
	@Override
	public EducationEvent edEventById(int edId) {
		if(!repo.existsById(edId)) {
			return null;
		}
		return repo.findById(edId);
	}
	
	@Override
	public List<EducationEvent> findBySubject(String subject) {
		return repo.findBySubject(subject);
	}
	@Override
	public List<EducationEvent> findByLocation(String location) {
		return repo.findByLocation(location);
	}
	@Override
	public List<EducationEvent> findByStudent(String student) {
		return repo.findByStudent(student);
	}
	@Override
	public List<EducationEvent> findByNotes(String notes) {
		String keyword = "%" + notes + "%";
		return repo.findByNotes_IgnoreCaseLike(keyword);
	}
	@Override
	public List<EducationEvent> findByLocation_Notes_Or_Subject_Or_Student(String input) {
		String keyword = "%" + input + "%";
		return repo.findByLocation_IgnoreCaseLikeOrNotes_IgnoreCaseLikeOrSubject_IgnoreCaseLikeOrStudent_IgnoreCaseLike(keyword, keyword, keyword, keyword);
	}
	@Override
	public List<EducationEvent> findByEdEventBetweenDates(LocalDateTime start, LocalDateTime end) {
		return repo.findByDateBetween(start, end);
	}
	
	
	
	
	// POST METHODS
	@Override
	public EducationEvent addEdEvent(EducationEvent edEvent) {
		if (edEvent.getSubject() == null) {
			edEvent.setSubject("Not Declared");
		}
		if (edEvent.getDate() == null) {
			// Backup to @CreationTimestamp (redundant)
			edEvent.setDate(LocalDateTime.now());
		}	
		return repo.saveAndFlush(edEvent);
	}
	@Override
	public EducationEvent updateEdEvent(EducationEvent edEvent, int edId) {
		Optional<EducationEvent> exists = Optional.of(repo.findById(edId));
		if(exists.isPresent()) {
			EducationEvent updatedEvent = exists.get();
		if(updatedEvent.getDate() != null) {
			updatedEvent.setDate(edEvent.getDate());
		}
		if (updatedEvent.getDuration() != 0) {
			System.out.println("Duration update");
			updatedEvent.setDuration(edEvent.getDuration());
		}
		if (updatedEvent.getSubject() != null) {
			updatedEvent.setSubject(edEvent.getSubject());
		}
		if (updatedEvent.getLocation() != null) {
			updatedEvent.setLocation(edEvent.getLocation());
		}
		if (updatedEvent.getStudent() != null) {
			updatedEvent.setStudent(edEvent.getStudent());
		}
		if (updatedEvent.getNotes() != null) {
			updatedEvent.setNotes(edEvent.getNotes());
		}
		repo.save(updatedEvent);
		return updatedEvent;
		}
		return null;
	}
	
	@Override
	public Boolean deleteEdEvent(int id) {
		repo.deleteById(id);
		return !repo.existsById(id);
	}
	
}

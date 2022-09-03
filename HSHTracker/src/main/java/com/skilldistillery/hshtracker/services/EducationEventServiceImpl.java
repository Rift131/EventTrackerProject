package com.skilldistillery.hshtracker.services;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.hshtracker.entities.EducationEvent;
import com.skilldistillery.hshtracker.repositories.EducationEventRepository;

@Service 
public class EducationEventServiceImpl implements EducationEventService{
	@Autowired
	private EducationEventRepository repo;
	// Find all education events (No representative query in the repository since this is free)
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
	public EducationEvent addEdEvent(EducationEvent edEvent) {
		if (edEvent.getSubject() == null) {
			edEvent.setSubject("Not Declared");
		}
		if (edEvent.getDate() == null) {
		//	LocalDateTime defaultTime = LocalDateTime.of(null, null)1985-10-26T09:00:01.211;
			// default to Back To The Future date 1985-07-03 when not entered
			
			// Backup to @CreationTimestamp (redundant)
			edEvent.setDate(LocalDateTime.now());
		}	
		return repo.saveAndFlush(edEvent);
	}
	@Override
	public EducationEvent updateEdEvent(EducationEvent edEvent, int edId) {
		EducationEvent exists = edEventById(edId);
		if(exists == null) {
			return null;
		} else if (exists.getDate() != null) {
			exists.setDate(edEvent.getDate());
		}
		if (exists.getDuration() != 0) {
			System.out.println("Duration update");
			exists.setDuration(edEvent.getDuration());
		}
		if (exists.getSubject() != null) {
			exists.setSubject(edEvent.getSubject());
		}
		if (exists.getLocation() != null) {
			exists.setLocation(edEvent.getLocation());
		}
		if (exists.getStudent() != null) {
			exists.setStudent(edEvent.getStudent());
		}
		if (exists.getNotes() != null) {
			exists.setNotes(edEvent.getNotes());
		}
		return repo.saveAndFlush(exists);
	}
	
	@Override
	public Boolean deleteEdEvent(int id) {
		repo.deleteById(id);
		return !repo.existsById(id);
	}
}
